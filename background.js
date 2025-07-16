// Background service worker for Salesforce Easy Navigator
// Handles keyboard shortcuts, notifications, and background tasks

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case '_execute_action':
            // This opens the popup automatically
            break;
        case 'navigate_to_setup':
            handleNavigateToSetup();
            break;
        case 'navigate_to_home':
            handleNavigateToHome();
            break;
    }
});

// Navigate to Salesforce Setup
async function handleNavigateToSetup() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) return;

        const url = tab.url;
        if (!url.includes('salesforce.com') && 
            !url.includes('force.com') && 
            !url.includes('.salesforce-setup.co') && 
            !url.includes('/lightning/')) {
            console.log('Not on a Salesforce page');
            return;
        }

        // Extract base URL and navigate to setup
        const baseUrl = url.substring(0, url.indexOf('/', 10));
        const setupUrl = `${baseUrl}/lightning/setup/SetupOneHome/home`;
        
        await chrome.tabs.update(tab.id, { url: setupUrl });
    } catch (error) {
        console.error('Error navigating to setup:', error);
    }
}

// Navigate to Salesforce Home
async function handleNavigateToHome() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) return;

        const url = tab.url;
        if (!url.includes('salesforce.com') && 
            !url.includes('force.com') && 
            !url.includes('.salesforce-setup.co') && 
            !url.includes('/lightning/')) {
            console.log('Not on a Salesforce page');
            return;
        }

        // Extract base URL and navigate to home
        const baseUrl = url.substring(0, url.indexOf('/', 10));
        const homeUrl = `${baseUrl}/lightning/page/home`;
        
        await chrome.tabs.update(tab.id, { url: homeUrl });
    } catch (error) {
        console.error('Error navigating to home:', error);
    }
}

// Show notification to user (console logging only)
function showNotification(message, type = 'info') {
    console.log(`[Salesforce Easy Navigator] ${type.toUpperCase()}: ${message}`);
}

// Handle extension installation and updates
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set up default settings for new installation
        chrome.storage.sync.set({
            settings: {
                darkMode: false,
                autoClose: true,
                confirmDelete: true
            }
        });
        
        console.log('Salesforce Easy Navigator installed! Press Ctrl+Shift+S to open.');
    } else if (details.reason === 'update') {
        // Handle updates
        const previousVersion = details.previousVersion;
        const currentVersion = chrome.runtime.getManifest().version;
        
        if (previousVersion !== currentVersion) {
            console.log(`Updated to version ${currentVersion}`);
        }
    }
});

// Handle tab updates to improve performance
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only process when page is completely loaded
    if (changeInfo.status === 'complete') {
        const url = tab.url;
        if (url && (url.includes('salesforce.com') || 
                   url.includes('force.com') || 
                   url.includes('.salesforce-setup.co') || 
                   url.includes('/lightning/'))) {
            // Cache the current tab for better performance
            chrome.storage.local.set({
                lastSalesforceTab: {
                    id: tabId,
                    url: url,
                    title: tab.title,
                    timestamp: Date.now()
                }
            });
        }
    }
});

// Cleanup old cache entries
chrome.storage.local.get(['lastSalesforceTab'], (result) => {
    const cached = result.lastSalesforceTab;
    if (cached && Date.now() - cached.timestamp > 3600000) { // 1 hour
        chrome.storage.local.remove(['lastSalesforceTab']);
    }
});

// Handle storage changes for settings synchronization
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.settings) {
        const newSettings = changes.settings.newValue;
        const oldSettings = changes.settings.oldValue;
        
        // Handle setting changes if needed
        if (newSettings && oldSettings) {
            // Log setting changes for debugging
            console.log('Settings updated:', {
                old: oldSettings,
                new: newSettings
            });
        }
    }
});

// Error handling for the service worker
self.addEventListener('error', (event) => {
    console.error('Service worker error:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
}); 