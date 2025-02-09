// getSetVariableEvent
let getSetVariableEvent = (element, variableName, defaultVal) => {
    if (element) {
        element.addEventListener("keyup", (event) => {
            const value = event.target.value.trim();
            chrome.storage.sync.set({ [variableName]: value });
            document.getElementById(variableName).value = value;
            initializeNavigation();
        });
        chrome.storage.sync.get(variableName, (result) => {
            const storedVal = result[variableName];
            document.getElementById(variableName).value =
                storedVal !== undefined ? storedVal : defaultVal;
        });
    }
};

// getSetVariableName rewritten using an array of field definitions
let getSetVariableName = () => {
    const fields = [
        { id: "account", default: "Account" },
        { id: "contact", default: "Contact" },
        { id: "opportunity", default: "Opportunity" },
        { id: "lead", default: "Lead" },
        { id: "cases", default: "Case" },
        { id: "task", default: "Task" },
        { id: "contract", default: "Contract" },
        { id: "campaign", default: "Campaign" },
        { id: "product2", default: "Product2" },
        { id: "asset", default: "Asset" },
        { id: "order", default: "Order" },
        { id: "test", default: "Test__c" },
    ];

    fields.forEach((field) => {
        const element = document.getElementById(field.id);
        getSetVariableEvent(element, field.id, field.default);
    });
};
