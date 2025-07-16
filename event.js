// Utility function to get input value by ID
const getValue = (id) => document.getElementById(id)?.value.trim() || "";

// Utility function to validate if input has a value
const hasValue = (id) => getValue(id).length > 0;

// Utility function to show validation feedback
const showValidationFeedback = (id, message) => {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        // Add visual feedback
        inputElement.style.borderColor = '#ef4444';
        inputElement.style.backgroundColor = '#fef2f2';
        inputElement.title = message;
        
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: absolute;
            background: #ef4444;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            z-index: 1000;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
        `;
        
        inputElement.parentElement.style.position = 'relative';
        inputElement.parentElement.appendChild(notification);
        
        // Remove feedback after 2 seconds
        setTimeout(() => {
            inputElement.style.borderColor = '';
            inputElement.style.backgroundColor = '';
            inputElement.title = '';
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 2000);
        
        // Focus on the input
        inputElement.focus();
    }
};

// Mapping for main pages and automation tools
const pages = {
    setup: "/lightning/setup/SetupOneHome/home",
    devConsole: "/_ui/common/apex/debug/ApexCSIPage",
    objManager: "/lightning/setup/ObjectManager/home",
    home: "/lightning/page/home",
    flows: "/lightning/setup/Flows/home",
    inChangeSets: "/lightning/setup/InboundChangeSet/home",
    outChangeSets: "/lightning/setup/OutboundChangeSet/home",
    users: "/lightning/setup/ManageUsers/home",
};

// Function to generate URLs for main pages
const openPage = (page) => () => pages[page];

// Function to generate URLs for sObjects with validation
const openNew = (id) => () => {
    if (!hasValue(id)) {
        showValidationFeedback(id, `Please enter the ${id} object API name first`);
        return null;
    }
    return `/lightning/o/${getValue(id)}/new?useRecordTypeCheck=1`;
};

const openList = (id) => () => {
    if (!hasValue(id)) {
        showValidationFeedback(id, `Please enter the ${id} object API name first`);
        return null;
    }
    return `/lightning/o/${getValue(id)}/home`;
};

const openDetail = (id) => () => {
    if (!hasValue(id)) {
        showValidationFeedback(id, `Please enter the ${id} object API name first`);
        return null;
    }
    return `/lightning/setup/ObjectManager/lookupRedirect?lookup=entityByApiName&apiName=${getValue(id)}`;
};

// Define navigation functions
const pageMap = {
    // Main Tools
    setup: openPage("setup"),
    devConsole: openPage("devConsole"),
    objManager: openPage("objManager"),
    home: openPage("home"),
    flows: openPage("flows"),
    inChangeSets: openPage("inChangeSets"),
    outChangeSets: openPage("outChangeSets"),
    users: openPage("users"),
    // sObject Pages
    accountNew: openNew("account"),
    accountList: openList("account"),
    accountDetails: openDetail("account"),
    contactNew: openNew("contact"),
    contactList: openList("contact"),
    contactDetails: openDetail("contact"),
    opportunityNew: openNew("opportunity"),
    opportunityList: openList("opportunity"),
    opportunityDetails: openDetail("opportunity"),
    leadNew: openNew("lead"),
    leadList: openList("lead"),
    leadDetails: openDetail("lead"),
    caseNew: openNew("cases"),
    caseList: openList("cases"),
    caseDetails: openDetail("cases"),
    taskNew: openNew("task"),
    taskList: openList("task"),
    taskDetails: openDetail("task"),
    contractNew: openNew("contract"),
    contractList: openList("contract"),
    contractDetails: openDetail("contract"),
    campaignNew: openNew("campaign"),
    campaignList: openList("campaign"),
    campaignDetails: openDetail("campaign"),
    product2New: openNew("product2"),
    product2List: openList("product2"),
    product2Details: openDetail("product2"),
    assetNew: openNew("asset"),
    assetList: openList("asset"),
    assetDetails: openDetail("asset"),
    orderNew: openNew("order"),
    orderList: openList("order"),
    orderDetails: openDetail("order"),
    testNew: openNew("test"),
    testList: openList("test"),
    testDetails: openDetail("test"),
};

// Debounce function to prevent rapid successive calls
let debounceTimer = null;
const debounceDelay = 300; // 300ms delay

// Function to initialize the navigation with improved validation
const initializeNavigation = async () => {
    // Clear any existing debounce timer
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    
    // Debounce the navigation initialization
    debounceTimer = setTimeout(async () => {
        const queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        let fullUrl = tab?.url || "";
        let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));

        // Ensure it's a Salesforce page with enhanced detection
        if (baseUrl.includes("my.salesforce-setup.com")) {
            baseUrl = baseUrl.replace("my.salesforce-setup.com", "lightning.force.com");
        }
        if (baseUrl.includes(".salesforce-setup.co")) {
            // Handle salesforce-setup.co domains - keep them as they are for proper navigation
        }
        if (!(baseUrl.includes(".force.com") || 
              baseUrl.includes("salesforce.com") || 
              baseUrl.includes(".salesforce-setup.co") ||
              fullUrl.includes("/lightning/"))) {
            // Salesforce check is now handled in popup.js
            return;
        }

        // Update links dynamically with validation
        Object.keys(pageMap).forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener("click", (event) => {
                    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                        event.preventDefault();
                        
                        // Get the URL from the page function
                        const url = pageMap[id]();
                        
                        // Check if URL is valid (not null/empty)
                        if (!url) {
                            // Validation already handled by the page function
                            return;
                        }
                        
                        // Construct full URL and navigate
                        const fullNavigationUrl = baseUrl + url;
                        el.href = fullNavigationUrl;
                        
                        chrome.tabs.update(tab.id, { url: fullNavigationUrl });
                        
                        // Check autoClose setting before closing window
                        chrome.storage.sync.get(['settings'], (result) => {
                            const settings = result.settings || { autoClose: true };
                            if (settings.autoClose !== false) {
                                window.close();
                            }
                        });
                    }
                });
                
                // Update href for right-click functionality (if value exists)
                const url = pageMap[id]();
                if (url) {
                    el.href = baseUrl + url;
                }
            }
        });
        
        // Update button states based on input values
        updateButtonStates();
    }, debounceDelay);
};

// Function to update button states based on input values
const updateButtonStates = () => {
    const objectIds = ['account', 'contact', 'opportunity', 'lead', 'cases', 'task', 'contract', 'campaign', 'product2', 'asset', 'order', 'test'];
    
    objectIds.forEach(id => {
        const inputElement = document.getElementById(id);
        const hasValueForId = hasValue(id);
        
        // Update button states for this object
        const buttonIds = [`${id}New`, `${id}List`, `${id}Details`];
        buttonIds.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                if (hasValueForId) {
                    button.style.opacity = '1';
                    button.style.pointerEvents = 'auto';
                    button.style.cursor = 'pointer';
                    button.title = '';
                } else {
                    button.style.opacity = '0.5';
                    button.style.pointerEvents = 'none';
                    button.style.cursor = 'not-allowed';
                    button.title = `Enter ${id} object API name first`;
                }
            }
        });
        
        // Reset input styling when it has value
        if (inputElement && hasValueForId) {
            inputElement.style.borderColor = '';
            inputElement.style.backgroundColor = '';
            inputElement.title = '';
        }
    });
};

// Attach event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeNavigation);
