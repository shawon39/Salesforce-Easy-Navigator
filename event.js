// Utility function to get input value by ID
const getValue = (id) => document.getElementById(id)?.value.trim() || "";

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

// Function to generate URLs for sObjects
const openNew = (id) => () => `/lightning/o/${getValue(id)}/new?useRecordTypeCheck=1`;
const openList = (id) => () => `/lightning/o/${getValue(id)}/home`;
const openDetail = (id) => () => `/lightning/setup/ObjectManager/lookupRedirect?lookup=entityByApiName&apiName=${getValue(id)}`;

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

// Function to initialize the navigation
const initializeNavigation = async () => {
    const queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let fullUrl = tab?.url || "";
    let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));

    // Ensure it's a Salesforce page
    if (baseUrl.includes("my.salesforce-setup.com")) {
        baseUrl = baseUrl.replace("my.salesforce-setup.com", "lightning.force.com");
    }
    if (!(baseUrl.includes(".force.com") || baseUrl.includes("salesforce.com"))) {
        alert("You are not on a Salesforce page!");
        window.close();
        return;
    }

    // Update links dynamically
    Object.keys(pageMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.href = baseUrl + pageMap[id]();
            el.addEventListener("click", (event) => {
                if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    event.preventDefault();
                    chrome.tabs.update(tab.id, { url: el.href });
                    window.close();
                }
            });
        }
    });
};

// Attach event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeNavigation);
