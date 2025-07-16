document.addEventListener("DOMContentLoaded", async () => {  
    // Check if we're on a Salesforce page first
    const isSalesforce = await checkSalesforcePage();
    
    if (!isSalesforce) {
        showNotSalesforceMessage();
        return;
    }
    
    // Initialize dynamic bookmarks
    loadBookmarks();
  
    // Set up the Add Bookmark button
    const addBookmarkBtn = document.getElementById("addBookmark");
    if (addBookmarkBtn) addBookmarkBtn.addEventListener("click", addBookmark);
  
    // Get and Set Object Name
    getSetVariableName();
});

// Function to check if current tab is on Salesforce
async function checkSalesforcePage() {
    try {
        const queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        let fullUrl = tab?.url || "";
        let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));
        
        // Check if it's a Salesforce page with enhanced detection
        return baseUrl.includes(".force.com") || 
               baseUrl.includes("salesforce.com") || 
               baseUrl.includes(".salesforce-setup.co") ||
               fullUrl.includes("/lightning/");
    } catch (error) {
        console.error("Error checking Salesforce page:", error);
        return false;
    }
}

// Function to show "not on Salesforce" message
function showNotSalesforceMessage() {
    document.body.innerHTML = `
        <div style="
            padding: 20px;
            text-align: center;
            font-family: 'Nunito', sans-serif;
            background: white;
            color: #333;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                border: 1px solid #e5e7eb;
            ">
                <img src="images/navigator48.png" alt="Salesforce Easy Navigator" style="margin-bottom: 15px;">
                <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #333;">Not on Salesforce</h2>
                <p style="margin: 0; font-size: 14px; color: #666;">
                    Please navigate to a Salesforce page to use this extension.
                </p>
            </div>
        </div>
    `;
}
  