"use strict";

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'displayCount') {
        await browser.action.setBadgeText({ text: message.data.blockedCount.toString() });
        setTimeout(async () => {
            await browser.action.setBadgeText({ text: '' });
        }, 2000);
        sendResponse({ result: 'success' });
        return true;
    }
});