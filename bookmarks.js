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
            ];
            chrome.storage.sync.set({ bookmarks: bookmarks });
        }
        renderBookmarks(bookmarks);
    });
}

function renderBookmarks(bookmarks) {
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

        // Navigate button – takes 25% width
        let navButton = document.createElement("button");
        navButton.className = "bookmarkNavigate";
        navButton.innerHTML = '<i class="fas fa-arrow-circle-right"></i>';
        navButton.addEventListener("click", function (e) {
            e.stopPropagation();
            navigateBookmark(bookmark.url);
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

        // Append elements in the desired order: Title, Navigate, then Actions.
        bookmarkDiv.appendChild(titleInput);
        bookmarkDiv.appendChild(navButton);
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
}

// Open the bookmark URL relative to the current Salesforce base URL.
function navigateBookmark(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let fullUrl = tab.url;

        // Check if the URL includes "/lightning/"
        if (!fullUrl.includes("/lightning/")) {
            alert("You are not on a Salesforce page!");
            return;
        }

        // Extract base URL from the full URL.
        let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));
        let switchButtonNG = document.getElementById("switchButtonNG").checked;

        if (switchButtonNG) {
            window.open(baseUrl + url, "_blank");
        } else {
            chrome.tabs.remove(tab.id);
            window.open(baseUrl + url);
        }
    });
}

// Add a new bookmark with a default URL (starting with "/lightning/").
function addBookmark() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        let currentUrl = tab.url;
        // Only proceed if it's a Salesforce URL
        if (
            !currentUrl.includes("my.salesforce-setup.com") &&
            !currentUrl.includes("force.com")
        ) {
            alert("Not a Salesforce page!");
            return;
        }
        // Ensure the URL contains a /lightning/ segment
        let lightningIndex = currentUrl.indexOf("/lightning/");
        if (lightningIndex === -1) {
            alert("Current page is not a Lightning page!");
            return;
        }
        // Extract bookmark URL starting from /lightning/ to the end
        let bookmarkUrl = currentUrl.substring(lightningIndex);
        // Use the current tab's title automatically as the bookmark title
        let bookmarkTitle = tab.title || "Bookmark";

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
    chrome.storage.sync.get("bookmarks", function (result) {
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
