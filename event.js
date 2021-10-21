// btnClickFuc
btnClickFuc = (btnClick) => {
	if (btnClick) {
		btnClick.addEventListener("click", (event) => {
			getCurrentTab(event.target.id);
		});
	}
};

orgDetermine = (baseUrl) => {
	if(baseUrl.includes("dev-ed.lightning.force.com")) {
		return 1;
	} else if(baseUrl.includes("dev-ed.my.salesforce.com")) {
		return 2;
	} else if(baseUrl.includes("dev.lightning.force.com")) {
		return 3;
	} else if(baseUrl.includes("dev.my.salesforce.com")) {
		return 4;
	}
};

async function getCurrentTab(page) {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	let fullUrl = tab.url;
	let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));
	let orgType = orgDetermine(baseUrl);
	if (baseUrl.includes("force.com")) {
		openUrl(baseUrl, page, orgType);
	}
}

openUrl = (baseUrl, page, orgType) => {
	// Main Tools
	if (page === "setup") {
		chrome.tabs.create({ active: true, url: baseUrl + openSetup() });
	} else if (page === "devConsole") {
		chrome.tabs.create({ active: true, url: baseUrl + openDevConsole() });
	} else if (page === "objManager") {
		chrome.tabs.create({ active: true, url: baseUrl + openObjManager() });
	} else if (page === "language") {
		chrome.tabs.create({ active: true, url: baseUrl + openLanguage() });
	}
	// sObject
	else if (page === "accountNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openAccountNew() });
	} else if (page === "accountList") {
		chrome.tabs.create({ active: true, url: baseUrl + openAccountList() });
	} else if (page === "accountDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openAccountDetail() });
	} else if (page === "contactNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openContactNew() });
	} else if (page === "contactList") {
		chrome.tabs.create({ active: true, url: baseUrl + openContactList() });
	} else if (page === "contactDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openContactDetail() });
	} else if (page === "opportunityNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openOpportunityNew() });
	} else if (page === "opportunityList") {
		chrome.tabs.create({ active: true, url: baseUrl + openOpportunityList() });
	} else if (page === "opportunityDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openOpportunityDetail() });
	} else if (page === "leadNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openLeadNew() });
	} else if (page === "leadList") {
		chrome.tabs.create({ active: true, url: baseUrl + openLeadList() });
	} else if (page === "leadDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openLeadDetail() });
	} else if (page === "caseNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openCaseNew() });
	} else if (page === "caseList") {
		chrome.tabs.create({ active: true, url: baseUrl + openCaseList() });
	} else if (page === "caseDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openCaseDetail() });
	} else if (page === "taskNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openTaskNew() });
	} else if (page === "taskList") {
		chrome.tabs.create({ active: true, url: baseUrl + openTaskList() });
	} else if (page === "taskDetails") {
		chrome.tabs.create({ active: true, url: baseUrl + openTaskDetail() });
	}
	// Automation Tools
	else if (page === "processAutomation") {
		chrome.tabs.create({ active: true, url: baseUrl + openProcessAutomation() });
	} else if (page === "flows") {
		chrome.tabs.create({ active: true, url: baseUrl + openFlows() });
	} else if (page === "workflowRules") {
		chrome.tabs.create({ active: true, url: baseUrl + openWorkflowRules() });
	} else if (page === "approvalProcesses") {
		chrome.tabs.create({ active: true, url: baseUrl + openApprovalProcesses() });
	}
	// Some Common Tools
	else if (page === "profile") {
		chrome.tabs.create({ active: true, url: baseUrl + openProfile(orgType) });
	} else if (page === "tabs") {
		chrome.tabs.create({ active: true, url: baseUrl + openTabs() });
	} else if (page === "appManager") {
		chrome.tabs.create({ active: true, url: baseUrl + openAppManager() });
	} else if (page === "flexiPageList") {
		chrome.tabs.create({ active: true, url: baseUrl + openFlexiPageList() });
	} else if (page === "components") {
		chrome.tabs.create({ active: true, url: baseUrl + openComponents() });
	} else if (page === "customLabels") {
		chrome.tabs.create({ active: true, url: baseUrl + openCustomLabels() });
	} else if (page === "importWizard") {
		chrome.tabs.create({ active: true, url: baseUrl + openImportWizard() });
	} else if (page === "schemaBuilder") {
		chrome.tabs.create({ active: true, url: baseUrl + openSchemaBuilder() });
	} else if (page === "themesBranding") {
		chrome.tabs.create({ active: true, url: baseUrl + openThemesBranding() });
	} else if (page === "apexClasses") {
		chrome.tabs.create({ active: true, url: baseUrl + openApexClasses() });
	} else if (page === "apexTriggers") {
		chrome.tabs.create({ active: true, url: baseUrl + openApexTriggers() });
	} else if (page === "apexJobs") {
		chrome.tabs.create({ active: true, url: baseUrl + openApexJobs() });
	} else if (page === "users") {
		chrome.tabs.create({ active: true, url: baseUrl + openUsers() });
	} else if (page === "emailTemplate") {
		chrome.tabs.create({ active: true, url: baseUrl + openEmailTemplate() });
	} else if (page === "permissionSets") {
		chrome.tabs.create({ active: true, url: baseUrl + openPermissionSets() });
	} else if (page === "installedPackages") {
		chrome.tabs.create({ active: true, url: baseUrl + openInstalledPackages() });
	} else if (page === "customSettings") {
		chrome.tabs.create({ active: true, url: baseUrl + openCustomSettings() });
	} else if (page === "customMetadata") {
		chrome.tabs.create({ active: true, url: baseUrl + openCustomMetadata() });
	} else if (page === "staticResources") {
		chrome.tabs.create({ active: true, url: baseUrl + openStaticResources() });
	} else if (page === "companyInformation") {
		chrome.tabs.create({ active: true, url: baseUrl + openCompanyInformation() });
	} else if (page === "forecastFiscalYear") {
		chrome.tabs.create({ active: true, url: baseUrl + openForecastFiscalYear() });
	}
	//chrome.tabs.update({url: baseUrl + '/lightning/setup/SetupOneHome/home'});
};
