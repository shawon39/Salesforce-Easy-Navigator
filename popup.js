/* Popup.js */

document.addEventListener('DOMContentLoaded', function() {

    let setup = document.getElementById("setup");

    if(setup) {
        setup.addEventListener("click", () => {
            getCurrentTab();
        });
    }

}, false);

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let baseUrl = 'https://platformdeveloper3-dev-ed.lightning.force.com';
    openSetup(baseUrl);
}

function openSetup(baseUrl) {
    chrome.tabs.create({active: true, url: baseUrl + '/lightning/setup/SetupOneHome/home'});
}