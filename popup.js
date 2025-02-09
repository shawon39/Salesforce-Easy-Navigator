document.addEventListener("DOMContentLoaded", () => {  
    // Initialize dynamic bookmarks
    loadBookmarks();
  
    // Set up the Add Bookmark button
    const addBookmarkBtn = document.getElementById("addBookmark");
    if (addBookmarkBtn) addBookmarkBtn.addEventListener("click", addBookmark);
  
    // Get and Set Object Name
    getSetVariableName();
  });
  