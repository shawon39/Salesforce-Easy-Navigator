// getSetVariableEvent
let getSetVariableEvent = (myEvent, mayVariable, defaultVal) => {
	if (myEvent) {
		myEvent.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({[mayVariable]: event.target.value });
			document.getElementById(mayVariable).value = event.target.value;
		});
		chrome.storage.sync.get(mayVariable, function (result) {
			document.getElementById(mayVariable).value = result[mayVariable];
			if (result[mayVariable] === undefined) {
				document.getElementById(mayVariable).value = defaultVal;
			}
		});
	}
}

// getSetSwitchButtonValue
let getSetSwitchButtonValue = () => {
	chrome.storage.sync.get('switchButton', function (result) {
		document.getElementById('switchButton').checked = result['switchButton'];
		if (result['switchButton'] === undefined) {
			document.getElementById('switchButton').checked = false;
		}
	});
}

// Set input Value
let setInputValue = (id, data) => {
	document.getElementById(id).value = data;
};

// resetBookmarks value
let resetBookmarksData = () => {
	// bookmarks 1
	setInputValue('bkTitle1', 'App Manager');
	setInputValue('bklink1', '/lightning/setup/NavigationMenus/home');
	// bookmarks 2
	setInputValue('bkTitle2', 'Custom Metadata');
	setInputValue('bklink2', '/lightning/setup/CustomMetadata/home');
	// bookmarks 3
	setInputValue('bkTitle3', 'Custom Settings');
	setInputValue('bklink3', '/lightning/setup/CustomSettings/home');
	// bookmarks 4
	setInputValue('bkTitle4', 'Import Wizard');
	setInputValue('bklink4', '/lightning/setup/DataManagementDataImporter/home');
	// bookmarks 5
	setInputValue('bkTitle5', 'Installed Packages');
	setInputValue('bklink5', '/lightning/setup/ImportedPackage/home');
	// bookmarks 6
	setInputValue('bkTitle6', 'Language Settings');
	setInputValue('bklink6', '/lightning/settings/personal/LanguageAndTimeZone/home');
	// bookmarks 7
	setInputValue('bkTitle7', 'Permission Sets');
	setInputValue('bklink7', '/lightning/setup/PermSets/home');
	// bookmarks 8
	setInputValue('bkTitle8', 'Schema Builder');
	setInputValue('bklink8', '/lightning/setup/SchemaBuilder/home');
	// bookmarks 9
	setInputValue('bkTitle9', 'Static Resources');
	setInputValue('bklink9', '/lightning/setup/StaticResources/home');
	// bookmarks 10
	setInputValue('bkTitle10', 'Users');
	setInputValue('bklink10', '/lightning/setup/ManageUsers/home');
};

// resetObject
let resetObjectData = () => {
	setInputValue('account', 'Account');
	setInputValue('contact', 'Contact');
	setInputValue('opportunity', 'Opportunity');
	setInputValue('lead', 'Lead');
	setInputValue('task', 'Task');
	setInputValue('cases', 'Case');
	setInputValue('contract', 'Contract');
	setInputValue('campaign', 'Campaign');
	setInputValue('product2', 'Product2');
};

// Reset data
resetData = () => {
	// Reset Bookmarks
	let resetBookmarks = document.getElementById("resetBookmarks");
	resetBookmarks.addEventListener("click", () => {
		chrome.storage.sync.remove([
			'bkTitle1', 'bklink1', 'bkTitle2', 'bklink2', 'bkTitle3', 'bklink3',
			'bkTitle4', 'bklink4', 'bkTitle5', 'bklink5', 'bkTitle6', 'bklink6',
			'bkTitle7', 'bklink7', 'bkTitle8', 'bklink8', 'bkTitle9', 'bklink9',
			'bkTitle10', 'bklink10',
		]);
		// resetBookmarks
		resetBookmarksData();
	});
	// Reset Object
	let resetObject = document.getElementById("resetObject");
	resetObject.addEventListener("click", () => {
		chrome.storage.sync.remove([
			'account', 'contact', 'opportunity', 'lead', 'task', 'cases', 'contract', 'campaign', 'product2',
		]);
		// Reset Objects
		resetObjectData();
	});
	// Reset All
	let reset = document.getElementById("reset");
	reset.addEventListener("click", () => {
		chrome.storage.sync.remove([
			'account', 'contact', 'opportunity', 'lead', 'task', 'cases', 'contract', 'campaign', 'product2',
			'bkTitle1', 'bklink1', 'bkTitle2', 'bklink2', 'bkTitle3', 'bklink3',
			'bkTitle4', 'bklink4', 'bkTitle5', 'bklink5', 'bkTitle6', 'bklink6',
			'bkTitle7', 'bklink7', 'bkTitle8', 'bklink8', 'bkTitle9', 'bklink9',
			'bkTitle10', 'bklink10',
		]);
		// Reset All
		resetBookmarksData();
		resetObjectData();
	});
}

// getSetVariableName
let getSetVariableName = () => {
	/* Resetting the extension */
	resetData()
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

	/*------- Bookmarks --------*/
	// bkTitle1
	let bkTitle1 = document.getElementById("bkTitle1");
	getSetVariableEvent(bkTitle1, "bkTitle1", "App Manager");
	// bklink1
	let bklink1 = document.getElementById("bklink1");
	getSetVariableEvent(bklink1, "bklink1", "/lightning/setup/NavigationMenus/home");
	// bkTitle2
	let bkTitle2 = document.getElementById("bkTitle2");
	getSetVariableEvent(bkTitle2, "bkTitle2", "Custom Metadata");
	// bklink2
	let bklink2 = document.getElementById("bklink2");
	getSetVariableEvent(bklink2, "bklink2", "/lightning/setup/CustomMetadata/home");
	// bkTitle3
	let bkTitle3 = document.getElementById("bkTitle3");
	getSetVariableEvent(bkTitle3, "bkTitle3", "Custom Settings");
	// bklink3
	let bklink3 = document.getElementById("bklink3");
	getSetVariableEvent(bklink3, "bklink3", "/lightning/setup/CustomSettings/home");
	// bkTitle4
	let bkTitle4 = document.getElementById("bkTitle4");
	getSetVariableEvent(bkTitle4, "bkTitle4", "Import Wizard");
	// bklink4
	let bklink4 = document.getElementById("bklink4");
	getSetVariableEvent(bklink4, "bklink4", "/lightning/setup/DataManagementDataImporter/home");
	// bkTitle5
	let bkTitle5 = document.getElementById("bkTitle5");
	getSetVariableEvent(bkTitle5, "bkTitle5", "Installed Packages");
	// bklink5
	let bklink5 = document.getElementById("bklink5");
	getSetVariableEvent(bklink5, "bklink5", "/lightning/setup/ImportedPackage/home");
	// bkTitle6
	let bkTitle6 = document.getElementById("bkTitle6");
	getSetVariableEvent(bkTitle6, "bkTitle6", "Language Settings");
	// bklink6
	let bklink6 = document.getElementById("bklink6");
	getSetVariableEvent(bklink6, "bklink6", "/lightning/settings/personal/LanguageAndTimeZone/home");
	// bkTitle7
	let bkTitle7 = document.getElementById("bkTitle7");
	getSetVariableEvent(bkTitle7, "bkTitle7", "Permission Sets");
	// bklink7
	let bklink7 = document.getElementById("bklink7");
	getSetVariableEvent(bklink7, "bklink7", "/lightning/setup/PermSets/home");
	// bkTitle8
	let bkTitle8 = document.getElementById("bkTitle8");
	getSetVariableEvent(bkTitle8, "bkTitle8", "Schema Builder");
	// bklink8
	let bklink8 = document.getElementById("bklink8");
	getSetVariableEvent(bklink8, "bklink8", "/lightning/setup/SchemaBuilder/home");
	// bkTitle9
	let bkTitle9 = document.getElementById("bkTitle9");
	getSetVariableEvent(bkTitle9, "bkTitle9", "Static Resources");
	// bklink9
	let bklink9 = document.getElementById("bklink9");
	getSetVariableEvent(bklink9, "bklink9", "/lightning/setup/StaticResources/home");
	// bkTitle10
	let bkTitle10 = document.getElementById("bkTitle10");
	getSetVariableEvent(bkTitle10, "bkTitle10", "Users");
	// bklink10
	let bklink10 = document.getElementById("bklink10");
	getSetVariableEvent(bklink10, "bklink10", "/lightning/setup/ManageUsers/home");
};

