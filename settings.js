// Advanced Settings Manager
class SettingsManager {
    constructor() {
        this.defaultSettings = {
            darkMode: false,
            autoClose: true,
            confirmDelete: true,
            notifications: true
        };
        this.initializeEventListeners();
        this.loadSettings();
    }

    // Initialize event listeners for settings modal
    initializeEventListeners() {
        // Settings button and modal controls
        document.getElementById('settingsBtn').addEventListener('click', () => this.openModal());
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        
        // Import/Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => this.exportConfiguration());
        document.getElementById('importBtn').addEventListener('click', () => this.triggerImport());
        document.getElementById('importFile').addEventListener('change', (e) => this.importConfiguration(e));
        
        // Settings controls
        document.getElementById('darkMode').addEventListener('change', (e) => this.updateSetting('darkMode', e.target.checked));
        document.getElementById('autoClose').addEventListener('change', (e) => this.updateSetting('autoClose', e.target.checked));
        document.getElementById('confirmDelete').addEventListener('change', (e) => this.updateSetting('confirmDelete', e.target.checked));
        document.getElementById('notifications').addEventListener('change', (e) => this.updateSetting('notifications', e.target.checked));
        
        // Data management
        document.getElementById('resetBtn').addEventListener('click', () => this.resetToDefault());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAllData());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('settingsModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    // Open settings modal with animation
    openModal() {
        const modal = document.getElementById('settingsModal');
        modal.style.display = 'block';
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
    }

    // Close settings modal
    closeModal() {
        const modal = document.getElementById('settingsModal');
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Load settings from chrome storage
    loadSettings() {
        chrome.storage.sync.get(['settings'], (result) => {
            const settings = result.settings || this.defaultSettings;
            this.applySettings(settings);
        });
    }

    // Apply settings to UI elements
    applySettings(settings) {
        document.getElementById('darkMode').checked = settings.darkMode || false;
        document.getElementById('autoClose').checked = settings.autoClose !== false;
        document.getElementById('confirmDelete').checked = settings.confirmDelete !== false;
        document.getElementById('notifications').checked = settings.notifications !== false;
        
        // Apply visual changes instantly
        this.applyVisualSettings(settings);
    }

    // Apply visual settings to the UI
    applyVisualSettings(settings) {
        // Dark mode
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Update individual setting
    updateSetting(key, value) {
        chrome.storage.sync.get(['settings'], (result) => {
            const settings = result.settings || this.defaultSettings;
            settings[key] = value;
            
            // Apply visual changes instantly for UI settings
            if (key === 'darkMode') {
                this.applyVisualSettings(settings);
            }
            
            chrome.storage.sync.set({ settings }, () => {
                // Format the notification message nicely
                const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                this.showNotification(`${formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)} ${value ? 'enabled' : 'disabled'}`, 'success');
            });
        });
    }

    // Export configuration as JSON
    exportConfiguration() {
        chrome.storage.sync.get(null, (data) => {
            const exportData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                bookmarks: data.bookmarks || [],
                settings: data.settings || this.defaultSettings,
                objectLabels: this.getObjectLabels()
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `salesforce-navigator-config-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Configuration exported successfully!', 'success');
        });
    }

    // Trigger file import dialog
    triggerImport() {
        document.getElementById('importFile').click();
    }

    // Import configuration from JSON file
    importConfiguration(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                
                // Validate import data
                if (!importData.version || !importData.bookmarks) {
                    throw new Error('Invalid configuration file format');
                }

                // Confirm import
                if (confirm('This will replace your current configuration. Are you sure?')) {
                    // Import bookmarks
                    if (importData.bookmarks) {
                        chrome.storage.sync.set({ bookmarks: importData.bookmarks });
                    }
                    
                    // Import settings
                    if (importData.settings) {
                        chrome.storage.sync.set({ settings: importData.settings }, () => {
                            this.applySettings(importData.settings);
                        });
                    }
                    
                    // Import object labels
                    if (importData.objectLabels) {
                        this.setObjectLabels(importData.objectLabels);
                    }
                    
                    this.showNotification('Configuration imported successfully!', 'success');
                    
                    // Refresh the display
                    setTimeout(() => {
                        if (typeof loadBookmarks === 'function') {
                            loadBookmarks();
                        }
                    }, 500);
                }
            } catch (error) {
                this.showNotification('Error importing configuration: ' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    // Get current object labels
    getObjectLabels() {
        const labels = {};
        const inputs = document.querySelectorAll('.objLabel');
        inputs.forEach(input => {
            if (input.value.trim()) {
                labels[input.id] = input.value.trim();
            }
        });
        return labels;
    }

    // Set object labels
    setObjectLabels(labels) {
        Object.keys(labels).forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.value = labels[id];
            }
        });
    }

    // Reset to default settings
    resetToDefault() {
        if (confirm('This will reset all settings to default values. Continue?')) {
            chrome.storage.sync.set({ 
                settings: this.defaultSettings,
                bookmarks: [
                    { title: "App Manager", url: "/lightning/setup/NavigationMenus/home" },
                    { title: "Static Resources", url: "/lightning/setup/StaticResources/home" },
                    { title: "Permission Sets", url: "/lightning/setup/PermSets/home" },
                    { title: "Installed Packages", url: "/lightning/setup/ImportedPackage/home" }
                ]
            }, () => {
                this.applySettings(this.defaultSettings);
                // Clear object labels
                document.querySelectorAll('.objLabel').forEach(input => {
                    input.value = '';
                });
                
                if (typeof loadBookmarks === 'function') {
                    loadBookmarks();
                }
                
                this.showNotification('Settings reset to default successfully!', 'success');
            });
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('This will permanently delete all your data including bookmarks and settings. This action cannot be undone. Continue?')) {
            chrome.storage.sync.clear(() => {
                // Reset UI to default state
                this.applySettings(this.defaultSettings);
                document.querySelectorAll('.objLabel').forEach(input => {
                    input.value = '';
                });
                
                if (typeof loadBookmarks === 'function') {
                    loadBookmarks();
                }
                
                this.showNotification('All data cleared successfully!', 'warning');
            });
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 16px;
                    border-radius: 8px;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
                    min-width: 250px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .notification.success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
                .notification.error { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
                .notification.warning { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
                .notification.info { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize settings manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsManager;
} 