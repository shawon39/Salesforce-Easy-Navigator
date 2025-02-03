// Event
document.addEventListener("DOMContentLoaded", () => {
    // Main Tools
    let setup = document.getElementById("setup");
    btnClickFuc(setup);
    let devConsole = document.getElementById("devConsole");
    btnClickFuc(devConsole);
    let objManager = document.getElementById("objManager");
    btnClickFuc(objManager);
    let home = document.getElementById("home");
    btnClickFuc(home);

    // New event bindings for lower 4 items
    let flows = document.getElementById("flows");
    btnClickFuc(flows);
    let inChangeSets = document.getElementById("inChangeSets");
    btnClickFuc(inChangeSets);
    let outChangeSets = document.getElementById("outChangeSets");
    btnClickFuc(outChangeSets);
    let users = document.getElementById("users");
    btnClickFuc(users);

    // Initialize dynamic bookmarks
    loadBookmarks();

    // Set up the Add Bookmark button
    const addBookmarkBtn = document.getElementById("addBookmark");
    addBookmarkBtn.addEventListener("click", addBookmark);

    // sObject
    let accountNew = document.getElementById("accountNew");
    btnClickFuc(accountNew);
    let accountList = document.getElementById("accountList");
    btnClickFuc(accountList);
    let accountDetails = document.getElementById("accountDetails");
    btnClickFuc(accountDetails);
    let contactNew = document.getElementById("contactNew");
    btnClickFuc(contactNew);
    let contactList = document.getElementById("contactList");
    btnClickFuc(contactList);
    let contactDetails = document.getElementById("contactDetails");
    btnClickFuc(contactDetails);
    let opportunityNew = document.getElementById("opportunityNew");
    btnClickFuc(opportunityNew);
    let opportunityList = document.getElementById("opportunityList");
    btnClickFuc(opportunityList);
    let opportunityDetails = document.getElementById("opportunityDetails");
    btnClickFuc(opportunityDetails);
    let leadNew = document.getElementById("leadNew");
    btnClickFuc(leadNew);
    let leadList = document.getElementById("leadList");
    btnClickFuc(leadList);
    let leadDetails = document.getElementById("leadDetails");
    btnClickFuc(leadDetails);
    let caseNew = document.getElementById("caseNew");
    btnClickFuc(caseNew);
    let caseList = document.getElementById("caseList");
    btnClickFuc(caseList);
    let caseDetails = document.getElementById("caseDetails");
    btnClickFuc(caseDetails);
    let taskNew = document.getElementById("taskNew");
    btnClickFuc(taskNew);
    let taskList = document.getElementById("taskList");
    btnClickFuc(taskList);
    let taskDetails = document.getElementById("taskDetails");
    btnClickFuc(taskDetails);
    let contractNew = document.getElementById("contractNew");
    btnClickFuc(contractNew);
    let contractList = document.getElementById("contractList");
    btnClickFuc(contractList);
    let contractDetails = document.getElementById("contractDetails");
    btnClickFuc(contractDetails);
    let campaignNew = document.getElementById("campaignNew");
    btnClickFuc(campaignNew);
    let campaignList = document.getElementById("campaignList");
    btnClickFuc(campaignList);
    let campaignDetails = document.getElementById("campaignDetails");
    btnClickFuc(campaignDetails);
    let product2New = document.getElementById("product2New");
    btnClickFuc(product2New);
    let product2List = document.getElementById("product2List");
    btnClickFuc(product2List);
    let product2Details = document.getElementById("product2Details");
    btnClickFuc(product2Details);

    // Switch button
    let switchButtonNG = document.getElementById("switchButtonNG");
    switchClickFuc(switchButtonNG);

    // Get and Set Object Name
    getSetVariableName();

    // Get and Set Switch Button Value
    getSetSwitchButtonValue();
});
