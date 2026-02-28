// Background Service Worker
// This runs as the extension's main background process (MV3 service worker)

import { initMessageListener, onMessage } from '../lib/messaging';

// Initialize message handling
initMessageListener();

// Register message handlers
onMessage('GET_TAB_INFO', async (_payload, sender) => {
    const tab = sender.tab;
    return {
        tabId: tab?.id,
        url: tab?.url,
        title: tab?.title,
    };
});

onMessage('PING', async () => {
    return { status: 'alive', timestamp: Date.now() };
});

// Extension lifecycle events
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Open welcome page on first install
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html'),
        });
    }
});

console.log('[Extension] Background service worker initialized');
