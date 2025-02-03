// getSetVariableEvent
let getSetVariableEvent = (myEvent, mayVariable, defaultVal) => {
    if (myEvent) {
        myEvent.addEventListener("keyup", (event) => {
            chrome.storage.sync.set({
                [mayVariable]: event.target.value.trim(),
            });
            document.getElementById(mayVariable).value =
                event.target.value.trim();
        });
        chrome.storage.sync.get(mayVariable, function (result) {
            document.getElementById(mayVariable).value = result[mayVariable];
            if (result[mayVariable] === undefined) {
                document.getElementById(mayVariable).value = defaultVal;
            }
        });
    }
};

// getSetSwitchButtonValue
let getSetSwitchButtonValue = () => {
    chrome.storage.sync.get("switchButtonNG", function (result) {
        document.getElementById("switchButtonNG").checked =
            result["switchButtonNG"];
        if (result["switchButtonNG"] === undefined) {
            document.getElementById("switchButtonNG").checked = false;
        }
    });
};

// getSetVariableName
let getSetVariableName = () => {
    /*------- Objects --------*/
    // Account
    let account = document.getElementById("account");
    getSetVariableEvent(account, "account", "Account");
    // Contact
    let contact = document.getElementById("contact");
    getSetVariableEvent(contact, "contact", "Contact");
    // Opportunity
    let opportunity = document.getElementById("opportunity");
    getSetVariableEvent(opportunity, "opportunity", "Opportunity");
    // Lead
    let lead = document.getElementById("lead");
    getSetVariableEvent(lead, "lead", "Lead");
    // Case
    let cases = document.getElementById("cases");
    getSetVariableEvent(cases, "cases", "Case");
    // Task
    let task = document.getElementById("task");
    getSetVariableEvent(task, "task", "Task");
    // Contract
    let contract = document.getElementById("contract");
    getSetVariableEvent(contract, "contract", "Contract");
    // Campaign
    let campaign = document.getElementById("campaign");
    getSetVariableEvent(campaign, "campaign", "Campaign");
    // Product2
    let product2 = document.getElementById("product2");
    getSetVariableEvent(product2, "product2", "Product2");
};
