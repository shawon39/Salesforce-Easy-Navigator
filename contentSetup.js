// contentSetup.js

// Wait for the .tabBar element to be available
function waitForTabBar(callback) {
    const intervalId = setInterval(() => {
        const tabBar = document.querySelector(".tabBar");
        if (tabBar) {
            clearInterval(intervalId);
            callback(tabBar);
        }
    }, 500);
}

waitForTabBar((tabBar) => {
    // Create or get the UL container
    let ul = tabBar.querySelector("#sfNGTabsURL");
    if (!ul) {
        ul = document.createElement("ul");
        ul.id = "sfNGTabsURL";
        // Any styling for the UL is now in customStyles.css.
        tabBar.appendChild(ul);
    }

    // Global variable to hold the dragged item's index
    let draggedIndex = null;

    // Function to load and render stored tabs on the main UI.
    // Each tab is an object: { name: "Friendly Name", link: "/endpoint" }
    function loadStoredTabs() {
        chrome.storage.sync.get({ sfTabs: [] }, (result) => {
            let tabs = result.sfTabs;

            // Add the default tab only if no tabs exist.
            if (tabs.length === 0) {
                tabs.push({ name: "App Home", link: "/lightning/page/home" });
                chrome.storage.sync.set({ sfTabs: tabs });
            }

            // Remove all LI elements except the plus and edit buttons.
            Array.from(ul.children).forEach((child) => {
                if (child.id !== "plusLi" && child.id !== "editLi") {
                    child.remove();
                }
            });

            // Render each stored tab as an LI element with an anchor element inside.
            tabs.forEach((tab, index) => {
                const li = document.createElement("li");
                li.setAttribute("draggable", "true");
                // Store the index as a data attribute for use during drag/drop
                li.dataset.index = index;

                // Create an anchor element to support right-click behavior.
                const a = document.createElement("a");
                const baseUrl = window.location.origin;
                a.href = baseUrl + tab.link;
                a.textContent = tab.name;
                a.title = tab.name;

                // Add click event on the anchor. Intercept left-clicks only.
                a.addEventListener("click", (event) => {
                    // Only intercept left-click if no modifier keys (command/ctrl) are pressed.
                    if (
                        event.button === 0 &&
                        !event.metaKey &&
                        !event.ctrlKey
                    ) {
                        event.preventDefault(); // Prevent full page reload
                        window.location.href = a.href;
                    }
                    // If a modifier key is pressed, let the browser handle the click.
                });

                li.appendChild(a);

                // Drag event listeners remain attached to the LI.
                li.addEventListener("dragstart", (e) => {
                    draggedIndex = Number(li.dataset.index);
                    li.style.opacity = "0.5";
                    e.dataTransfer.effectAllowed = "move";
                });

                li.addEventListener("dragend", () => {
                    li.style.opacity = "1";
                });

                li.addEventListener("dragover", (e) => {
                    e.preventDefault(); // Allow drop
                    e.dataTransfer.dropEffect = "move";
                });

                li.addEventListener("drop", (e) => {
                    e.preventDefault();
                    const targetIndex = Number(li.dataset.index);
                    if (draggedIndex === null || draggedIndex === targetIndex)
                        return;
                    // Reorder the tabs array
                    const newTabs = [...tabs];
                    const draggedItem = newTabs.splice(draggedIndex, 1)[0];
                    newTabs.splice(targetIndex, 0, draggedItem);
                    // Save the new order and reload the UI
                    chrome.storage.sync.set({ sfTabs: newTabs }, () => {
                        loadStoredTabs();
                    });
                    draggedIndex = null;
                });

                // Insert before the plus button (if it exists)
                const plusLi = document.getElementById("plusLi");
                if (plusLi) {
                    ul.insertBefore(li, plusLi);
                } else {
                    ul.appendChild(li);
                }
            });
        });
    }

    // Function to show a custom modal for editing a specific tab's details.
    function showEditTabModal(index, tab) {
        const overlay = document.createElement("div");
        overlay.className = "custom-overlay";

        const modal = document.createElement("div");
        modal.className = "custom-modal";

        // Tab Name
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Edit Tab Name:";
        modal.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "e.g. Flows";
        // Prepopulate with the existing tab name; remove " | Salesforce" if present.
        nameInput.value = tab.name.replace(" | Salesforce", "").trim();
        modal.appendChild(nameInput);

        // Tab Link
        const linkLabel = document.createElement("label");
        linkLabel.textContent = "Edit Tab Link:";
        modal.appendChild(linkLabel);

        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "e.g. /lightning/setup/Flows/home";
        linkInput.value = tab.link;
        modal.appendChild(linkInput);

        // Div to show inline validation messages
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-msg";
        modal.appendChild(validationMsg);

        const btnContainer = document.createElement("div");
        btnContainer.className = "custom-btn-container";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.style.marginRight = "5px";
        saveBtn.addEventListener("click", () => {
            let newTabName = nameInput.value.trim();
            let newTabLink = linkInput.value.trim();
            if (!newTabName || !newTabLink) {
                validationMsg.textContent = "Both fields are required.";
                validationMsg.style.color = "red";
                return;
            }
            // Validate that the newTabLink contains "/lightning"
            if (!newTabLink.startsWith("/lightning/")) {
                validationMsg.textContent =
                    'Tab link must start with "/lightning/"';
                validationMsg.style.color = "red";
                return;
            }
            chrome.storage.sync.get({ sfTabs: [] }, (result) => {
                const tabs = result.sfTabs;
                tabs[index].name = newTabName;
                tabs[index].link = newTabLink;
                chrome.storage.sync.set({ sfTabs: tabs }, () => {
                    loadStoredTabs();
                    // If the edit modal list is open, update it instantly.
                    const editListContainer =
                        document.getElementById("editModalListNG");
                    if (editListContainer) {
                        renderEditList(editListContainer);
                    }
                    document.body.removeChild(overlay);
                });
            });
        });
        btnContainer.appendChild(saveBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.marginLeft = "5px";
        cancelBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        btnContainer.appendChild(cancelBtn);

        modal.appendChild(btnContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // Helper: Render the list inside the Edit modal.
    function renderEditList(container) {
        container.innerHTML = ""; // Clear current content
        chrome.storage.sync.get({ sfTabs: [] }, (result) => {
            const tabs = result.sfTabs;
            if (tabs.length === 0) {
                container.innerHTML = "<p>No tabs available.</p>";
            } else {
                tabs.forEach((tab, index) => {
                    const itemDiv = document.createElement("div");
                    itemDiv.style.display = "flex";
                    itemDiv.style.alignItems = "center";
                    itemDiv.style.marginBottom = "10px";

                    const span = document.createElement("span");
                    span.textContent = tab.name;
                    span.style.flexGrow = "1";
                    itemDiv.appendChild(span);

                    // Add Edit button beside Delete button
                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";
                    editBtn.style.marginRight = "5px";
                    editBtn.addEventListener("click", () => {
                        showEditTabModal(index, tab);
                    });
                    itemDiv.appendChild(editBtn);

                    if (tab.link !== "/lightning/page/home") {
                        const deleteBtn = document.createElement("button");
                        deleteBtn.textContent = "Delete";
                        deleteBtn.addEventListener("click", () => {
                            tabs.splice(index, 1);
                            chrome.storage.sync.set({ sfTabs: tabs }, () => {
                                renderEditList(container);
                                loadStoredTabs();
                            });
                        });
                        itemDiv.appendChild(deleteBtn);
                    }

                    container.appendChild(itemDiv);
                });
            }
        });
    }

    // Function to show a custom modal for adding a new tab.
    function showAddTabModal() {
        const overlay = document.createElement("div");
        overlay.className = "custom-overlay";

        const modal = document.createElement("div");
        modal.className = "custom-modal";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Tab Name:";
        modal.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Enter Tab Name";
        // Pre-populate the input with the current tab's title; remove " | Salesforce" if present.
        nameInput.value = document.title.replace(" | Salesforce", "");
        modal.appendChild(nameInput);

        // Div to show inline validation messages
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-msg";
        modal.appendChild(validationMsg);

        const btnContainer = document.createElement("div");
        btnContainer.className = "custom-btn-container";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.style.marginRight = "5px";
        saveBtn.addEventListener("click", () => {
            let tabName = nameInput.value.trim();
            if (!tabName) {
                validationMsg.textContent = "Tab name is required.";
                validationMsg.style.color = "red";
                return;
            }

            // Automatically extract the tab link from the current URL.
            const currentUrl = window.location.href;
            const lightningIndex = currentUrl.indexOf("/lightning");
            if (lightningIndex === -1) {
                validationMsg.textContent =
                    "Current URL is not a Lightning page.";
                validationMsg.style.color = "red";
                return;
            }
            const tabLink = currentUrl.substring(lightningIndex);

            chrome.storage.sync.get({ sfTabs: [] }, (result) => {
                const tabs = result.sfTabs;
                tabs.push({ name: tabName, link: tabLink });
                chrome.storage.sync.set({ sfTabs: tabs }, () => {
                    loadStoredTabs();
                    document.body.removeChild(overlay);
                });
            });
        });
        btnContainer.appendChild(saveBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.marginLeft = "5px";
        cancelBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        btnContainer.appendChild(cancelBtn);

        modal.appendChild(btnContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // Function to show a modal for editing/deleting stored tabs.
    function showEditModal() {
        const overlay = document.createElement("div");
        overlay.className = "custom-overlay";

        const modal = document.createElement("div");
        modal.className = "custom-modal";

        const list = document.createElement("div");
        list.id = "editModalListNG";
        modal.appendChild(list);

        renderEditList(list);

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.style.marginTop = "10px";
        closeBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        modal.appendChild(closeBtn);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // Create the plus button LI (for adding new tabs) if it doesn't exist.
    let plusLi = document.getElementById("plusLi");
    if (!plusLi) {
        plusLi = document.createElement("li");
        plusLi.id = "plusLi";

        const plusButton = document.createElement("button");
        plusButton.textContent = "➕";
        plusButton.addEventListener("click", showAddTabModal);
        plusLi.appendChild(plusButton);
        ul.appendChild(plusLi);
    }

    // Create the edit button LI (for editing/deleting tabs) if it doesn't exist.
    let editLi = document.getElementById("editLi");
    if (!editLi) {
        editLi = document.createElement("li");
        editLi.id = "editLi";
        editLi.style.marginLeft = "auto";

        const editButton = document.createElement("button");
        editButton.textContent = "🗑️";
        editButton.addEventListener("click", showEditModal);
        editLi.appendChild(editButton);
        ul.appendChild(editLi);
    }

    // Finally, load the stored tabs on startup.
    loadStoredTabs();
});

// Function to wait until the .slds-global-actions element is available
function waitForGlobalActions(callback) {
    const intervalId = setInterval(() => {
        const globalActions = document.querySelector(".slds-global-actions");
        if (globalActions) {
            clearInterval(intervalId);
            callback(globalActions);
        }
    }, 500);
}

waitForGlobalActions((globalActions) => {
    // Check if the settings button already exists to avoid duplication
    if (!document.getElementById("customSettingsBtn")) {
        // Create the settings li element
        let settingsLi = document.createElement("li");
        settingsLi.className = "slds-global-actions__item";

        // Create the settings anchor with the appropriate styling and URL
        let settingsButton = document.createElement("a");
        settingsButton.id = "customSettingsBtn";
        settingsButton.className = "slds-button slds-button_icon";
        settingsButton.innerHTML = "🛠";
        settingsButton.title = "Setup Page";
        settingsButton.href =
            window.location.origin + "/lightning/setup/SetupOneHome/home";

        // Add click event to navigate to Setup page, intercepting only plain left-clicks.
        settingsButton.addEventListener("click", (event) => {
            // If left-click without modifier keys, handle SPA navigation.
            if (event.button === 0 && !event.metaKey && !event.ctrlKey) {
                event.preventDefault();
                window.location.href = settingsButton.href;
            }
        });

        // Append the anchor to the li element
        settingsLi.appendChild(settingsButton);

        // Insert as the first child of .slds-global-actions
        globalActions.insertBefore(settingsLi, globalActions.firstChild);
    }
});
