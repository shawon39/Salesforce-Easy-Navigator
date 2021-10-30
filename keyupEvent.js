//getSetObjectName
let getSetObjectName = () => {
	// Account
	let account = document.getElementById("account");
	if (account) {
		account.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ account: event.target.value });
			document.getElementById("account").value = event.target.value;
		});
		chrome.storage.sync.get("account", function (result) {
			document.getElementById("account").value = result.account;
			if (result.account === undefined) {
				document.getElementById("account").value = "Account";
			}
		});
	}
	// Contact
	let contact = document.getElementById("contact");
	if (contact) {
		contact.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ contact: event.target.value });
			document.getElementById("contact").value = event.target.value;
		});
		chrome.storage.sync.get("contact", function (result) {
			document.getElementById("contact").value = result.contact;
			if (result.contact === undefined) {
				document.getElementById("contact").value = "Contact";
			}
		});
	}
	// Opportunity
	let opportunity = document.getElementById("opportunity");
	if (opportunity) {
		opportunity.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ opportunity: event.target.value });
			document.getElementById("opportunity").value = event.target.value;
		});
		chrome.storage.sync.get("opportunity", function (result) {
			document.getElementById("opportunity").value = result.opportunity;
			if (result.opportunity === undefined) {
				document.getElementById("opportunity").value = "Opportunity";
			}
		});
	}
	// Lead
	let lead = document.getElementById("lead");
	if (lead) {
		lead.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ lead: event.target.value });
			document.getElementById("lead").value = event.target.value;
		});
		chrome.storage.sync.get("lead", function (result) {
			document.getElementById("lead").value = result.lead;
			if (result.lead === undefined) {
				document.getElementById("lead").value = "Lead";
			}
		});
	}
	// Case
	let cases = document.getElementById("cases");
	if (cases) {
		cases.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ cases: event.target.value });
			document.getElementById("cases").value = event.target.value;
		});
		chrome.storage.sync.get("cases", function (result) {
			document.getElementById("cases").value = result.cases;
			if (result.cases === undefined) {
				document.getElementById("cases").value = "Case";
			}
		});
	}
	// Task
	let task = document.getElementById("task");
	if (task) {
		task.addEventListener("keyup", (event) => {
			chrome.storage.sync.set({ task: event.target.value });
			document.getElementById("task").value = event.target.value;
		});
		chrome.storage.sync.get("task", function (result) {
			document.getElementById("task").value = result.task;
			if (result.task === undefined) {
				document.getElementById("task").value = "Task";
			}
		});
	}
};
