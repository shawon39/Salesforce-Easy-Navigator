// Event
document.addEventListener("DOMContentLoaded", () => {
	// Main Tools
	let setup = document.getElementById("setup");
	btnClickFuc(setup);
	let devConsole = document.getElementById("devConsole");
	btnClickFuc(devConsole);
	let objManager = document.getElementById("objManager");
	btnClickFuc(objManager);
	let language = document.getElementById("language");
	btnClickFuc(language);

	// Automation Tools
	let processAutomation = document.getElementById("processAutomation");
	btnClickFuc(processAutomation);
	let flows = document.getElementById("flows");
	btnClickFuc(flows);
	let workflowRules = document.getElementById("workflowRules");
	btnClickFuc(workflowRules);
	let approvalProcesses = document.getElementById("approvalProcesses");
	btnClickFuc(approvalProcesses);

	// Common Tools
	let profile = document.getElementById("profile");
	btnClickFuc(profile);
	let enhancedProfile = document.getElementById("enhancedProfile");
	btnClickFuc(enhancedProfile);
	let tabs = document.getElementById("tabs");
	btnClickFuc(tabs);
	let appManager = document.getElementById("appManager");
	btnClickFuc(appManager);
	let flexiPageList = document.getElementById("flexiPageList");
	btnClickFuc(flexiPageList);
	let components = document.getElementById("components");
	btnClickFuc(components);
	let customLabels = document.getElementById("customLabels");
	btnClickFuc(customLabels);
	let importWizard = document.getElementById("importWizard");
	btnClickFuc(importWizard);
	let schemaBuilder = document.getElementById("schemaBuilder");
	btnClickFuc(schemaBuilder);
	let themesBranding = document.getElementById("themesBranding");
	btnClickFuc(themesBranding);
	let apexClasses = document.getElementById("apexClasses");
	btnClickFuc(apexClasses);
	let apexTriggers = document.getElementById("apexTriggers");
	btnClickFuc(apexTriggers);
	let apexJobs = document.getElementById("apexJobs");
	btnClickFuc(apexJobs);
	let users = document.getElementById("users");
	btnClickFuc(users);
	let emailTemplate = document.getElementById("emailTemplate");
	btnClickFuc(emailTemplate);
	let permissionSets = document.getElementById("permissionSets");
	btnClickFuc(permissionSets);
	let installedPackages = document.getElementById("installedPackages");
	btnClickFuc(installedPackages);
	let customSettings = document.getElementById("customSettings");
	btnClickFuc(customSettings);
	let customMetadata = document.getElementById("customMetadata");
	btnClickFuc(customMetadata);
	let staticResources = document.getElementById("staticResources");
	btnClickFuc(staticResources);
	let companyInformation = document.getElementById("companyInformation");
	btnClickFuc(companyInformation);
	let forecastFiscalYear = document.getElementById("forecastFiscalYear");
	btnClickFuc(forecastFiscalYear);

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

	// Get and Set Object Name
	getSetObjectName();
});
