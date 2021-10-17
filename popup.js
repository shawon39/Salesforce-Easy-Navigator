// import { openSetup, openDevConsole } from "./openUrl";

document.addEventListener("DOMContentLoaded", () => {
	// Getting Setup
	let setup = document.getElementById("setup");
	if (setup) {
		setup.addEventListener("click", () => {
			getCurrentTab("setup");
		});
	}
	// Getting devConsole
	let devConsole = document.getElementById("devConsole");
	if (devConsole) {
		devConsole.addEventListener("click", () => {
			getCurrentTab("devConsole");
		});
	}
    // Getting ObjManager
    let objManager = document.getElementById("objManager");
	if (objManager) {
		objManager.addEventListener("click", () => {
			getCurrentTab("objManager");
		});
	}
    // Getting Language & Time Zone
    let language = document.getElementById("language");
	if (objManager) {
		language.addEventListener("click", () => {
			getCurrentTab("language");
		});
	}

});

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
	}

	//chrome.tabs.update({url: baseUrl + '/lightning/setup/SetupOneHome/home'});
};
