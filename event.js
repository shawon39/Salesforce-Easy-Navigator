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
	openUrl(baseUrl, page);
}

openUrl = (baseUrl, page) => {
	if (page === "setup") {
		chrome.tabs.create({ active: true, url: baseUrl + openSetup() });
	} else if (page === "devConsole") {
		chrome.tabs.create({ active: true, url: baseUrl + openDevConsole() });
	} else if (page === "objManager") {
		chrome.tabs.create({ active: true, url: baseUrl + openObjManager() });
	} else if (page === "language") {
		chrome.tabs.create({ active: true, url: baseUrl + openLanguage() });
	} else if (page === "accountNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openAccountNew() });
	} else if (page === "accountList") {
		chrome.tabs.create({ active: true, url: baseUrl + openAccountList() });
	} else if (page === "contactNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openContactNew() });
	} else if (page === "contactList") {
		chrome.tabs.create({ active: true, url: baseUrl + openContactList() });
	} else if (page === "opportunityNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openOpportunityNew() });
	} else if (page === "opportunityList") {
		chrome.tabs.create({ active: true, url: baseUrl + openOpportunityList() });
	} else if (page === "leadNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openLeadNew() });
	} else if (page === "leadList") {
		chrome.tabs.create({ active: true, url: baseUrl + openLeadList() });
	} else if (page === "taskNew") {
		chrome.tabs.create({ active: true, url: baseUrl + openTaskNew() });
	} else if (page === "taskList") {
		chrome.tabs.create({ active: true, url: baseUrl + openTaskList() });
	}

	//chrome.tabs.update({url: baseUrl + '/lightning/setup/SetupOneHome/home'});
};