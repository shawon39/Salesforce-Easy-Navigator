function loadBookmarks() {
    chrome.storage.sync.get("bookmarks", function (result) {
        let bookmarks = result.bookmarks;
        if (!bookmarks) {
            bookmarks = [
                {
                    title: "App Manager",
                    url: "/lightning/setup/NavigationMenus/home",
                },
                {
                    title: "Static Resources",
                    url: "/lightning/setup/StaticResources/home",
                },
                {
                    title: "Permission Sets",
                    url: "/lightning/setup/PermSets/home",
                },
                {
                    title: "Installed Packages",
                    url: "/lightning/setup/ImportedPackage/home",
                },
            ];
            chrome.storage.sync.set({ bookmarks: bookmarks });
        }
        renderBookmarks(bookmarks);
    });
}

function renderBookmarks(bookmarks) {
    // Query the active tab to obtain its URL for the proper base URL.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0];
        let baseUrl = new URL(activeTab.url).origin;

        const container = document.getElementById("bookmarksContainer");
        container.innerHTML = "";
        bookmarks.forEach((bookmark, index) => {
            let bookmarkDiv = document.createElement("div");
            bookmarkDiv.className = "bookmarkItem";
            bookmarkDiv.draggable = true;
            bookmarkDiv.dataset.index = index;

            // Bookmark Name (Title) input – takes 50% width
            let titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = bookmark.title;
            titleInput.className = "bookmarkTitle";

            // Navigation Anchor – takes 25% width
            let navAnchor = document.createElement("a");
            navAnchor.className = "bookmarkNavigate";
            navAnchor.innerHTML = '<i class="fas fa-arrow-circle-right"></i>';
            // Set the href using the active tab’s base URL
            navAnchor.href = baseUrl + bookmark.url;
            navAnchor.addEventListener("click", function (e) {
                // If left-click without modifier keys, intercept and use our custom navigation
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    navigateBookmark(bookmark.url);
                }
                // Otherwise, let the browser handle the click (e.g. command/ctrl/right click)
            });

            // Delete button for removal
            let removeButton = document.createElement("button");
            removeButton.className = "bookmarkDelete";
            removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            removeButton.addEventListener("click", function (e) {
                e.stopPropagation();
                removeBookmark(index);
            });

            // Create an action container for delete and drag handle – takes 25% width
            let actionContainer = document.createElement("div");
            actionContainer.className = "bookmarkActions";

            // Drag handle icon
            let dragIcon = document.createElement("span");
            dragIcon.className = "dragHandle";
            dragIcon.innerHTML = '<i class="fas fa-grip-lines"></i>';

            // Append the delete button and drag handle into the actions container
            actionContainer.appendChild(removeButton);
            actionContainer.appendChild(dragIcon);

            // Append elements in the desired order: Title, Navigation Anchor, then Actions.
            bookmarkDiv.appendChild(titleInput);
            bookmarkDiv.appendChild(navAnchor);
            bookmarkDiv.appendChild(actionContainer);

            // Setup drag and drop events for the entire row
            bookmarkDiv.addEventListener("dragstart", handleDragStart);
            bookmarkDiv.addEventListener("dragover", handleDragOver);
            bookmarkDiv.addEventListener("drop", handleDrop);

            // Update bookmark title on keyup (URL remains unchanged)
            titleInput.addEventListener("keyup", () =>
                updateBookmark(index, titleInput.value, bookmark.url)
            );

            container.appendChild(bookmarkDiv);
        });

        // Update the Add Bookmark button: show it only if there are fewer than 10 bookmarks.
        const addBookmarkBtn = document.getElementById("addBookmark");
        addBookmarkBtn.style.display = bookmarks.length < 10 ? "block" : "none";
    });
}

function navigateBookmark(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let fullUrl = tab.url;

        // Enhanced Salesforce detection logic
        if (!fullUrl.includes("/lightning/") && 
            !fullUrl.includes("salesforce.com") && 
            !fullUrl.includes("force.com") && 
            !fullUrl.includes(".salesforce-setup.co")) {
            alert("You are not on a Salesforce page!");
            return;
        }

        let baseUrl = new URL(fullUrl).origin;
        // Update the active tab's URL so it navigates to the new page.
        chrome.tabs.update(tab.id, { url: baseUrl + url });
        
        // Check autoClose setting before closing window
        chrome.storage.sync.get(['settings'], (result) => {
            const settings = result.settings || { autoClose: true };
            if (settings.autoClose !== false) {
                window.close();
            }
        });
    });
}

/// Add a new bookmark with a default URL (starting with "/lightning/").
function addBookmark() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let currentUrl = tab.url;
        // Ensure the URL contains a "/lightning/" segment.
        let lightningIndex = currentUrl.indexOf("/lightning/");
        if (lightningIndex === -1) {
            alert("You can't add this page to bookmarks!");
            return;
        }
        // Extract bookmark URL starting from "/lightning/" to the end.
        let bookmarkUrl = currentUrl.substring(lightningIndex);
        // Use the current tab's title automatically as the bookmark title.
        let bookmarkTitle =
            tab.title.replace(" | Salesforce", "").trim() || "Bookmark";

        chrome.storage.sync.get("bookmarks", function (result) {
            let bookmarks = result.bookmarks || [];
            if (bookmarks.length < 10) {
                bookmarks.push({ title: bookmarkTitle, url: bookmarkUrl });
                chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
                    renderBookmarks(bookmarks);
                });
            } else {
                alert("Maximum number of bookmarks reached.");
            }
        });
    });
}

// Remove a bookmark by its index.
function removeBookmark(index) {
    chrome.storage.sync.get(['bookmarks', 'settings'], function (result) {
        const settings = result.settings || { confirmDelete: true };
        
        // Check if confirmation is required
        if (settings.confirmDelete !== false) {
            const bookmarks = result.bookmarks || [];
            const bookmarkTitle = bookmarks[index]?.title || 'this bookmark';
            if (!confirm(`Are you sure you want to delete "${bookmarkTitle}"?`)) {
                return;
            }
        }
        
        let bookmarks = result.bookmarks || [];
        bookmarks.splice(index, 1);
        chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
            renderBookmarks(bookmarks);
        });
    });
}

// Update a bookmark's title or URL in storage.
function updateBookmark(index, title, url) {
    chrome.storage.sync.get("bookmarks", function (result) {
        let bookmarks = result.bookmarks || [];
        if (bookmarks[index]) {
            bookmarks[index].title = title;
            bookmarks[index].url = url;
            chrome.storage.sync.set({ bookmarks: bookmarks });
        }
    });
}

// Drag and drop functions.
let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.dataset.index);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Allow drop.
    }
    e.dataTransfer.dropEffect = "move";
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    const srcIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const targetIndex = parseInt(this.dataset.index);
    if (srcIndex !== targetIndex) {
        chrome.storage.sync.get("bookmarks", function (result) {
            let bookmarks = result.bookmarks || [];
            // Remove the dragged item and insert it at the drop position.
            const [removed] = bookmarks.splice(srcIndex, 1);
            bookmarks.splice(targetIndex, 0, removed);
            chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
                renderBookmarks(bookmarks);
            });
        });
    }
    return false;
}
