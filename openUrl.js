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
openLanguage = () => {
	return "/lightning/settings/personal/LanguageAndTimeZone/home";
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
// Some common Tools
openProfile = () => {
	return "/lightning/setup/Profiles/home";
};
openEnhancedProfile = () => {
	return "/lightning/setup/EnhancedProfiles/home";
};
openTabs = () => {
	return "/lightning/setup/CustomTabs/home";
};
openAppManager = () => {
	return "/lightning/setup/NavigationMenus/home";
};
openFlexiPageList = () => {
	return "/lightning/setup/FlexiPageList/home";
};
openComponents = () => {
	return "/lightning/setup/LightningComponentBundles/home";
};
openCustomLabels = () => {
	return "/lightning/setup/ExternalStrings/home";
};
openImportWizard = () => {
	return "/lightning/setup/DataManagementDataImporter/home";
};
openSchemaBuilder = () => {
	return "/lightning/setup/SchemaBuilder/home";
};
openThemesBranding = () => {
	return "/lightning/setup/ThemingAndBranding/home";
};
openApexClasses = () => {
	return "/lightning/setup/ApexClasses/home";
};
openApexTriggers = () => {
	return "/lightning/setup/ApexTriggers/home";
};
openApexJobs = () => {
	return "/lightning/setup/AsyncApexJobs/home";
};
openUsers = () => {
	return "/lightning/setup/ManageUsers/home";
};
openEmailTemplate = () => {
	return "/lightning/setup/CommunicationTemplatesEmail/home";
};
openPermissionSets = () => {
	return "/lightning/setup/PermSets/home";
};
openInstalledPackages = () => {
	return "/lightning/setup/ImportedPackage/home";
};
openCustomSettings = () => {
	return "/lightning/setup/CustomSettings/home";
};
openCustomMetadata = () => {
	return "/lightning/setup/CustomMetadata/home";
};
openStaticResources = () => {
	return "/lightning/setup/StaticResources/home";
};
openCompanyInformation = () => {
	return "/lightning/setup/CompanyProfileInfo/home";
};
openForecastFiscalYear = () => {
	return "/lightning/setup/ForecastFiscalYear/home";
};
