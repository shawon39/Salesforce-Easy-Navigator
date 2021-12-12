// btnClickFuc
btnClickFuc = (btnClick) => {
	if (btnClick) {
		btnClick.addEventListener("click", (event) => {
			getCurrentTab(event.target.id);
		});
	}
};

async function getCurrentTab(page) {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	let fullUrl = tab.url;
	let baseUrl = fullUrl.substring(0, fullUrl.indexOf("/", 10));
	if (baseUrl.includes("lightning.force.com")) {
		openUrl(baseUrl, page);
	} else if (baseUrl.includes("my.salesforce.com")) {
		openUrl(baseUrl, page);
	} else {
		alert("You are not on a Salesforce page!");
	}
}

openUrl = (baseUrl, page) => {
	// Main Tools
	if (page === "setup") {
		chrome.tabs.create({ active: true, url: baseUrl + openSetup() });
	} else if (page === "devConsole") {
		chrome.tabs.create({ active: true, url: baseUrl + openDevConsole() });
	} else if (page === "objManager") {
		chrome.tabs.create({ active: true, url: baseUrl + openObjManager() });
	} else if (page === "home") {
		chrome.tabs.create({ active: true, url: baseUrl + openHome() });
	} else if (page === "processAutomation") {
		chrome.tabs.create({ active: true, url: baseUrl + openProcessAutomation() });
	} else if (page === "flows") {
		chrome.tabs.create({ active: true, url: baseUrl + openFlows() });
	} else if (page === "workflowRules") {
		chrome.tabs.create({ active: true, url: baseUrl + openWorkflowRules() });
	} else if (page === "approvalProcesses") {
		chrome.tabs.create({ active: true, url: baseUrl + openApprovalProcesses() });
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
	// Bookmarks
	else if (page === "navigate1") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate1() });
	} else if (page === "navigate2") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate2() });
	} else if (page === "navigate3") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate3() });
	} else if (page === "navigate4") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate4() });
	} else if (page === "navigate5") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate5() });
	} else if (page === "navigate6") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate6() });
	} else if (page === "navigate7") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate7() });
	} else if (page === "navigate8") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate8() });
	} else if (page === "navigate9") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate9() });
	} else if (page === "navigate10") {
		chrome.tabs.create({ active: true, url: baseUrl + openNavigate10() });
	}
};
