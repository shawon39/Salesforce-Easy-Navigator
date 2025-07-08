// Background service worker for Salesforce Easy Navigator
// Handles keyboard shortcuts, notifications, and background tasks

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case '_execute_action':
            // This opens the popup automatically
            break;
    }
});

// Show notification to user
function showNotification(message, type = 'info') {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/navigator48.png',
        title: 'Salesforce Easy Navigator',
        message: message,
        priority: type === 'error' ? 2 : 1
    });
}

// Handle extension installation and updates
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set up default settings for new installation
        chrome.storage.sync.set({
            settings: {
                darkMode: false,
                autoClose: true,
                confirmDelete: true,
                notifications: true
            }
        });
        
        showNotification('Salesforce Easy Navigator installed! Press Ctrl+Shift+S to open.', 'success');
    } else if (details.reason === 'update') {
        // Handle updates
        const previousVersion = details.previousVersion;
        const currentVersion = chrome.runtime.getManifest().version;
        
        if (previousVersion !== currentVersion) {
            showNotification(`Updated to version ${currentVersion}`, 'success');
        }
    }
});

// Handle tab updates to improve performance
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only process when page is completely loaded
    if (changeInfo.status === 'complete') {
        const url = tab.url;
        if (url && (url.includes('salesforce.com') || url.includes('force.com'))) {
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
        
        // Handle notifications setting
        if (newSettings && !newSettings.notifications) {
            // Clear any existing notifications
            chrome.notifications.clear('salesforce-navigator');
        }
        
        // Handle other setting changes if needed
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