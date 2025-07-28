"use strict";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'displayCount') {
        browser.browserAction.setBadgeText({ text: message.data.blockedCount.toString() });
        setTimeout(() => browser.browserAction.setBadgeText({ text: '' }), 2000);
        sendResponse({ result: 'success' });
    }
});
