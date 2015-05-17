// The message listener.
chrome.runtime.onMessage.addListener(function (proportion, sender, callBack) {
    // Zoom in.
    chrome.tabs.setZoom(sender.tab.id, proportion, function () {
        // Call the callback witch "sendMessage" sent here.
        callBack();
    });
    // Tell "sendMessage" that this is synchronous.
    // Otherwise the content script's life cycle will be gone before "setZoom" is done.
    return true;
});
