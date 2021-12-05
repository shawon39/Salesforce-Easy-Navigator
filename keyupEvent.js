// getSetVariableEvent
let getSetVariableEvent = (myEvent, mayVariable, defaultVal) => {
	if (myEvent) {
		myEvent.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({[mayVariable]: event.target.value });
			document.getElementById(mayVariable).value = event.target.value;
		});
		chrome.storage.sync.get(mayVariable, function (result) {
			document.getElementById(mayVariable).value = result[mayVariable];
			console.log(result.mayVariable);
			if (result[mayVariable] === undefined) {
				document.getElementById(mayVariable).value = defaultVal;
			}
		});
	}
}

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
	/*------- Bookmarks --------*/
	// bkTitle1
	let bkTitle1 = document.getElementById("bkTitle1");
	getSetVariableEvent(bkTitle1, "bkTitle1", "Installed Packages");
	// bklink1
	let bklink1 = document.getElementById("bklink1");
	getSetVariableEvent(bklink1, "bklink1", "/lightning/setup/ImportedPackage/home");
	// bkTitle2
	let bkTitle2 = document.getElementById("bkTitle2");
	getSetVariableEvent(bkTitle2, "bkTitle2", "App Manager");
	// bklink2
	let bklink2 = document.getElementById("bklink2");
	getSetVariableEvent(bklink2, "bklink2", "/lightning/setup/NavigationMenus/home");
	// bkTitle3
	let bkTitle3 = document.getElementById("bkTitle3");
	getSetVariableEvent(bkTitle3, "bkTitle3", "Import Wizard");
	// bklink3
	let bklink3 = document.getElementById("bklink3");
	getSetVariableEvent(bklink3, "bklink3", "/lightning/setup/DataManagementDataImporter/home");
	// bkTitle4
	let bkTitle4 = document.getElementById("bkTitle4");
	getSetVariableEvent(bkTitle4, "bkTitle4", "Schema Builder");
	// bklink4
	let bklink4 = document.getElementById("bklink4");
	getSetVariableEvent(bklink4, "bklink4", "/lightning/setup/SchemaBuilder/home");
	// bkTitle5
	let bkTitle5 = document.getElementById("bkTitle5");
	getSetVariableEvent(bkTitle5, "bkTitle5", "Users");
	// bklink5
	let bklink5 = document.getElementById("bklink5");
	getSetVariableEvent(bklink5, "bklink5", "/lightning/setup/ManageUsers/home");
	// bkTitle6
	let bkTitle6 = document.getElementById("bkTitle6");
	getSetVariableEvent(bkTitle6, "bkTitle6", "Permission Sets");
	// bklink6
	let bklink6 = document.getElementById("bklink6");
	getSetVariableEvent(bklink6, "bklink6", "/lightning/setup/PermSets/home");
	// bkTitle7
	let bkTitle7 = document.getElementById("bkTitle7");
	getSetVariableEvent(bkTitle7, "bkTitle7", "Custom Settings");
	// bklink7
	let bklink7 = document.getElementById("bklink7");
	getSetVariableEvent(bklink7, "bklink7", "/lightning/setup/CustomSettings/home");
	// bkTitle8
	let bkTitle8 = document.getElementById("bkTitle8");
	getSetVariableEvent(bkTitle8, "bkTitle8", "Static Resources");
	// bklink8
	let bklink8 = document.getElementById("bklink8");
	getSetVariableEvent(bklink8, "bklink8", "/lightning/setup/StaticResources/home");
};