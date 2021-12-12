// Reuse getElementById
let getValue = (id) => {
	return document.getElementById(id).value;
};
// Main pages
openSetup = () => {
	return "/lightning/setup/SetupOneHome/home";
};
openDevConsole = () => {
	return "/_ui/common/apex/debug/ApexCSIPage";
};
openObjManager = () => {
	return "/lightning/setup/ObjectManager/home";
};
openHome = () => {
	return "/lightning/page/home";
};
// Automation Tools
openProcessAutomation = () => {
	return "/lightning/setup/ProcessAutomation/home";
};
openFlows = () => {
	return "/lightning/setup/Flows/home";
};
openWorkflowRules = () => {
	return "/lightning/setup/WorkflowRules/home";
};
openApprovalProcesses = () => {
	return "/lightning/setup/ApprovalProcesses/home";
};
// sObject
openAccountNew = () => {
	return "/lightning/o/" + getValue("account") + "/new";
};
openAccountList = () => {
	return "/lightning/o/" + getValue("account") + "/home";
};
openAccountDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("account") + "/view";
};
openContactNew = () => {
	return "/lightning/o/" + getValue("contact") + "/new";
};
openContactList = () => {
	return "/lightning/o/" + getValue("contact") + "/home";
};
openContactDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("contact") + "/view";
};
openOpportunityNew = () => {
	return "/lightning/o/" + getValue("opportunity") + "/new";
};
openOpportunityList = () => {
	return "/lightning/o/" + getValue("opportunity") + "/home";
};
openOpportunityDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("opportunity") + "/view";
};
openLeadNew = () => {
	return "/lightning/o/" + getValue("lead") + "/new";
};
openLeadList = () => {
	return "/lightning/o/" + getValue("lead") + "/home";
};
openLeadDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("lead") + "/view";
};
openCaseNew = () => {
	return "/lightning/o/" + getValue("cases") + "/new";
};
openCaseList = () => {
	return "/lightning/o/" + getValue("cases") + "/home";
};
openCaseDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("cases") + "/view";
};
openTaskNew = () => {
	return "/lightning/o/" + getValue("task") + "/new";
};
openTaskList = () => {
	return "/lightning/o/" + getValue("task") + "/home";
};
openTaskDetail = () => {
	return "/lightning/setup/ObjectManager/" + getValue("task") + "/view";
};
// Bookmarks
openNavigate1 = () => {
	return getValue("bklink1");
}
openNavigate2 = () => {	
	return getValue("bklink2");
}
openNavigate3 = () => {
	return getValue("bklink3");
}
openNavigate4 = () => {
	return getValue("bklink4");
}
openNavigate5 = () => {
	return getValue("bklink5");
}
openNavigate6 = () => {
	return getValue("bklink6");
}
openNavigate7 = () => {
	return getValue("bklink7");
}
openNavigate8 = () => {
	return getValue("bklink8");
}
openNavigate9 = () => {
	return getValue("bklink9");
}
openNavigate10 = () => {
	return getValue("bklink10");
}