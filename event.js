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
	if (baseUrl.includes(".force.com")) {
		openUrl(baseUrl, page);
	} else if (baseUrl.includes("my.salesforce.com")) {
		openUrl(baseUrl, page);
	} else {
		alert("You are not on a Salesforce page!");
	}
}

navigateUrl = (baseUrl, targetUrlFun) => {
	let switchButton = document.getElementById('switchButton').checked;
	if (switchButton) {
		window.open(baseUrl + targetUrlFun(), "_blank");
	} else {
		chrome.tabs.query({active:true,currentWindow:true},function(tabs){
			chrome.tabs.remove(tabs[0].id);
	   	});
	   	window.open(baseUrl + targetUrlFun());
	}
}

openUrl = (baseUrl, page) => {
	let switchButton = document.getElementById('switchButton').checked;
	// Main Tools
	if (page === "setup") {
		navigateUrl(baseUrl, openSetup);
	} else if (page === "devConsole") {
		navigateUrl(baseUrl, openDevConsole);
	} else if (page === "objManager") {
		navigateUrl(baseUrl, openObjManager);
	} else if (page === "home") {
		navigateUrl(baseUrl, openHome);
	} else if (page === "processAutomation") {
		navigateUrl(baseUrl, openProcessAutomation);
	} else if (page === "flows") {
		navigateUrl(baseUrl, openFlows);
	} else if (page === "workflowRules") {
		navigateUrl(baseUrl, openWorkflowRules);
	} else if (page === "approvalProcesses") {
		navigateUrl(baseUrl, openApprovalProcesses);
	}
	// sObject
	else if (page === "accountNew") {
		navigateUrl(baseUrl, openAccountNew);
	} else if (page === "accountList") {
		navigateUrl(baseUrl, openAccountList);
	} else if (page === "accountDetails") {
		navigateUrl(baseUrl, openAccountDetail);
	} else if (page === "contactNew") {
		navigateUrl(baseUrl, openContactNew);
	} else if (page === "contactList") {
		navigateUrl(baseUrl, openContactList);
	} else if (page === "contactDetails") {
		navigateUrl(baseUrl, openContactDetail);
	} else if (page === "opportunityNew") {
		navigateUrl(baseUrl, openOpportunityNew);
	} else if (page === "opportunityList") {
		navigateUrl(baseUrl, openOpportunityList);
	} else if (page === "opportunityDetails") {
		navigateUrl(baseUrl, openOpportunityDetail);
	} else if (page === "leadNew") {
		navigateUrl(baseUrl, openLeadNew);
	} else if (page === "leadList") {
		navigateUrl(baseUrl, openLeadList);
	} else if (page === "leadDetails") {
		navigateUrl(baseUrl, openLeadDetail);
	} else if (page === "caseNew") {
		navigateUrl(baseUrl, openCaseNew);
	} else if (page === "caseList") {
		navigateUrl(baseUrl, openCaseList);
	} else if (page === "caseDetails") {
		navigateUrl(baseUrl, openCaseDetail);
	} else if (page === "taskNew") {
		navigateUrl(baseUrl, openTaskNew);
	} else if (page === "taskList") {
		navigateUrl(baseUrl, openTaskList);
	} else if (page === "taskDetails") {
		navigateUrl(baseUrl, openTaskDetail);
	} else if (page === "contractNew") {
		navigateUrl(baseUrl, openContractNew);
	} else if (page === "contractList") {
		navigateUrl(baseUrl, openContractList);
	} else if (page === "contractDetails") {
		navigateUrl(baseUrl, openContractDetail);
	} else if (page === "campaignNew") {
		navigateUrl(baseUrl, openCampaignNew);
	} else if (page === "campaignList") {
		navigateUrl(baseUrl, openCampaignList);
	} else if (page === "campaignDetails") {
		navigateUrl(baseUrl, openCampaignDetail);
	} else if (page === "product2New") {
		navigateUrl(baseUrl, openProduct2New);
	} else if (page === "product2List") {
		navigateUrl(baseUrl, openProduct2List);
	} else if (page === "product2Details") {
		navigateUrl(baseUrl, openProduct2Detail);
	}
	// Bookmarks
	else if (page === "navigate1") {
		navigateUrl(baseUrl, openNavigate1);
	} else if (page === "navigate2") {
		navigateUrl(baseUrl, openNavigate2);
	} else if (page === "navigate3") {
		navigateUrl(baseUrl, openNavigate3);
	} else if (page === "navigate4") {
		navigateUrl(baseUrl, openNavigate4);
	} else if (page === "navigate5") {
		navigateUrl(baseUrl, openNavigate5);
	} else if (page === "navigate6") {
		navigateUrl(baseUrl, openNavigate6);
	} else if (page === "navigate7") {
		navigateUrl(baseUrl, openNavigate7);
	} else if (page === "navigate8") {
		navigateUrl(baseUrl, openNavigate8);
	} else if (page === "navigate9") {
		navigateUrl(baseUrl, openNavigate9);
	} else if (page === "navigate10") {
		navigateUrl(baseUrl, openNavigate10);
	}
};

// switchClickFuc
switchClickFuc = (btnClick) => {
	if (btnClick) {
		btnClick.addEventListener("click", (event) => {
			if(document.getElementById(event.target.id).checked) {
				chrome.storage.sync.set({['switchButton']: true });
				document.getElementById('switchButton').checked = true;
			} else {
				chrome.storage.sync.set({['switchButton']: false });
				document.getElementById('switchButton').checked = false;
			}
		});
	}
};
