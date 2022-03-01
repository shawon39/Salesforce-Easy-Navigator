// Reuse getElementById
let getValue = (id) => {
	return document.getElementById(id).value;
};

let objectDetails = "/lightning/setup/ObjectManager/lookupRedirect?lookup=entityByApiName&apiName=";
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
	return "/lightning/o/" + getValue("account") + "/new?useRecordTypeCheck=1";
};
openAccountList = () => {
	return "/lightning/o/" + getValue("account") + "/home";
};
openAccountDetail = () => {
	return objectDetails + getValue("account");
};
openContactNew = () => {
	return "/lightning/o/" + getValue("contact") + "/new?useRecordTypeCheck=1";
};
openContactList = () => {
	return "/lightning/o/" + getValue("contact") + "/home";
};
openContactDetail = () => {
	return objectDetails + getValue("contact");
};
openOpportunityNew = () => {
	return "/lightning/o/" + getValue("opportunity") + "/new?useRecordTypeCheck=1";
};
openOpportunityList = () => {
	return "/lightning/o/" + getValue("opportunity") + "/home";
};
openOpportunityDetail = () => {
	return objectDetails + getValue("opportunity");
};
openLeadNew = () => {
	return "/lightning/o/" + getValue("lead") + "/new?useRecordTypeCheck=1";
};
openLeadList = () => {
	return "/lightning/o/" + getValue("lead") + "/home";
};
openLeadDetail = () => {
	return objectDetails + getValue("lead");
};
openCaseNew = () => {
	return "/lightning/o/" + getValue("cases") + "/new?useRecordTypeCheck=1";
};
openCaseList = () => {
	return "/lightning/o/" + getValue("cases") + "/home";
};
openCaseDetail = () => {
	return objectDetails + getValue("cases");
};
openTaskNew = () => {
	return "/lightning/o/" + getValue("task") + "/new?useRecordTypeCheck=1";
};
openTaskList = () => {
	return "/lightning/o/" + getValue("task") + "/home";
};
openTaskDetail = () => {
	return objectDetails + getValue("task");
};
openContractNew = () => {
	return "/lightning/o/" + getValue("contract") + "/new?useRecordTypeCheck=1";
};
openContractList = () => {
	return "/lightning/o/" + getValue("contract") + "/home";
};
openContractDetail = () => {
	return objectDetails + getValue("contract");
};
openCampaignNew = () => {
	return "/lightning/o/" + getValue("campaign") + "/new?useRecordTypeCheck=1";
};
openCampaignList = () => {
	return "/lightning/o/" + getValue("campaign") + "/home";
};
openCampaignDetail = () => {
	return objectDetails + getValue("campaign");
};
openProduct2New = () => {
	return "/lightning/o/" + getValue("product2") + "/new?useRecordTypeCheck=1";
};
openProduct2List = () => {
	return "/lightning/o/" + getValue("product2") + "/home";
};
openProduct2Detail = () => {
	return objectDetails + getValue("product2");
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