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
            const tabs = result.sfTabs;
            // Remove all LI elements except the plus and edit buttons.
            Array.from(ul.children).forEach((child) => {
                if (child.id !== "plusLi" && child.id !== "editLi") {
                    child.remove();
                }
            });
            // Render each stored tab as an LI element.
            tabs.forEach((tab, index) => {
                const li = document.createElement("li");
                li.textContent = tab.name;
                li.setAttribute("draggable", "true");
                // Store the index as a data attribute for use during drag/drop
                li.dataset.index = index;

                // Click event for navigation
                li.addEventListener("click", () => {
                    const baseUrl = window.location.origin;
                    window.location.href = baseUrl + tab.link;
                });

                // Drag event listeners
                li.addEventListener("dragstart", (e) => {
                    draggedIndex = Number(li.dataset.index);
                    // Optionally, add a dragging style
                    li.style.opacity = "0.5";
                    e.dataTransfer.effectAllowed = "move";
                });

                li.addEventListener("dragend", (e) => {
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

                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";
                    editBtn.style.marginRight = "5px";
                    editBtn.addEventListener("click", () => {
                        showEditTabModal(index, tab);
                    });
                    itemDiv.appendChild(editBtn);

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.addEventListener("click", () => {
                        if (
                            confirm("Are you sure you want to delete this tab?")
                        ) {
                            tabs.splice(index, 1);
                            chrome.storage.sync.set({ sfTabs: tabs }, () => {
                                renderEditList(container);
                                loadStoredTabs();
                            });
                        }
                    });
                    itemDiv.appendChild(deleteBtn);

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
        nameInput.placeholder = "e.g. Flows";
        modal.appendChild(nameInput);

        const linkLabel = document.createElement("label");
        linkLabel.textContent = "Tab Link:";
        modal.appendChild(linkLabel);

        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "e.g. /lightning/setup/Flows/home";
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
            let tabName = nameInput.value.trim();
            let tabLink = linkInput.value.trim();
            if (!tabName || !tabLink) {
                validationMsg.textContent = "Both fields are required.";
                validationMsg.style.color = "red";
                return;
            }
            // Validation: the tabLink must contain "/lightning/"
            if (!tabLink.includes("/lightning/")) {
                validationMsg.textContent =
                    'Please enter a valid tab link that starts with "/lightning/...". For example: /lightning/setup/Flows/home';
                validationMsg.style.color = "red";
                return;
            }
            // If the user entered a full URL that starts with the base URL, remove the base URL portion.
            const baseUrl = window.location.origin;
            if (tabLink.startsWith(baseUrl)) {
                const index = tabLink.indexOf("/lightning/");
                if (index !== -1) {
                    tabLink = tabLink.substring(index);
                }
            }
            validationMsg.textContent = "";
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

    // Function to show a custom modal for editing a specific tab.
    function showEditTabModal(index, tab) {
        const overlay = document.createElement("div");
        overlay.className = "custom-overlay";

        const modal = document.createElement("div");
        modal.className = "custom-modal";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Tab Name:";
        modal.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = tab.name;
        modal.appendChild(nameInput);

        const linkLabel = document.createElement("label");
        linkLabel.textContent = "Tab Link:";
        modal.appendChild(linkLabel);

        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.value = tab.link;
        modal.appendChild(linkInput);

        // Div for inline validation messages.
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-msg";
        modal.appendChild(validationMsg);

        const btnContainer = document.createElement("div");
        btnContainer.className = "custom-btn-container";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.style.marginRight = "5px";
        saveBtn.addEventListener("click", () => {
            let newName = nameInput.value.trim();
            let newLink = linkInput.value.trim();
            if (!newName || !newLink) {
                validationMsg.textContent = "Both fields are required.";
                validationMsg.style.color = "red";
                return;
            }
            // Validation: the newLink must contain "/lightning/"
            if (!newLink.includes("/lightning/")) {
                validationMsg.textContent =
                    'Please enter a valid tab link that starts with "/lightning/...". For example: /lightning/setup/Flows/home';
                validationMsg.style.color = "red";
                return;
            }
            // If the user entered a full URL that starts with the base URL, remove the base URL portion.
            const baseUrl = window.location.origin;
            if (newLink.startsWith(baseUrl)) {
                const index = newLink.indexOf("/lightning/");
                if (index !== -1) {
                    newLink = newLink.substring(index);
                }
            }
            validationMsg.textContent = "";
            chrome.storage.sync.get({ sfTabs: [] }, (result) => {
                const tabs = result.sfTabs;
                tabs[index] = { name: newName, link: newLink };
                chrome.storage.sync.set({ sfTabs: tabs }, () => {
                    loadStoredTabs();
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

    // Function to show a modal for editing/deleting all stored tabs.
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
        editButton.textContent = "✎";
        editButton.addEventListener("click", showEditModal);
        editLi.appendChild(editButton);
        ul.appendChild(editLi);
    }

    // Finally, load the stored tabs on startup.
    loadStoredTabs();
});
