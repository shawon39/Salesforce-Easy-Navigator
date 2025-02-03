// Reuse getElementById
let getValue = (id) => {
    return document.getElementById(id).value.trim();
};

let objectDetails =
    "/lightning/setup/ObjectManager/lookupRedirect?lookup=entityByApiName&apiName=";
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
openFlows = () => {
    return "/lightning/setup/Flows/home";
};
openInChangeSets = () => {
    return "/lightning/setup/InboundChangeSet/home";
};
openOutChangeSets = () => {
    return "/lightning/setup/OutboundChangeSet/home";
};
openUsers = () => {
    return "/lightning/setup/ManageUsers/home";
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
    return (
        "/lightning/o/" + getValue("opportunity") + "/new?useRecordTypeCheck=1"
    );
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
