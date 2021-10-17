// import { openSetup, openDevConsole } from "./openUrl";

document.addEventListener("DOMContentLoaded", () => {
	// Getting Setup
	let setup = document.getElementById("setup");
    btnClickFuc(setup);
	// Getting devConsole
	let devConsole = document.getElementById("devConsole");
    btnClickFuc(devConsole);
    // Getting ObjManager
    let objManager = document.getElementById("objManager");
    btnClickFuc(objManager);
    // Getting Language & Time Zone
    let language = document.getElementById("language");
    btnClickFuc(language);

    // Create a new Account
    let accountNew = document.getElementById("accountNew");
    btnClickFuc(accountNew);
    // Getting Account List
    let accountList = document.getElementById("accountList");
    btnClickFuc(accountList);
    // Create a new Contact
    let contactNew = document.getElementById("contactNew");
    btnClickFuc(contactNew);
    // Getting Contact List
    let contactList = document.getElementById("contactList");
    btnClickFuc(contactList);
    // Create a new Opportunity
    let opportunityNew = document.getElementById("opportunityNew");
    btnClickFuc(opportunityNew);
    // Getting Opportunity list
    let opportunityList = document.getElementById("opportunityList");
    btnClickFuc(opportunityList);
    // Create a new Lead
    let leadNew = document.getElementById("leadNew");
    btnClickFuc(leadNew);
    // Getting Lead list
    let leadList = document.getElementById("leadList");
    btnClickFuc(leadList);
    // Create a new Task
    let taskNew = document.getElementById("taskNew");
    btnClickFuc(taskNew);
    // Getting Task list
    let taskList = document.getElementById("taskList");
    btnClickFuc(taskList);

    // Process Builder
    let processAutomation = document.getElementById("processAutomation");
    btnClickFuc(processAutomation);
    // Flows
    let flows = document.getElementById("flows");
    btnClickFuc(flows);
    // WorkflowRules
    let workflowRules = document.getElementById("workflowRules");
    btnClickFuc(workflowRules);
    // ApprovalProcesses
    let approvalProcesses = document.getElementById("approvalProcesses");
    btnClickFuc(approvalProcesses);
});

