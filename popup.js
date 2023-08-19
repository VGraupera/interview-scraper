function onWindowLoad() {
    const scrapeBtn = document.getElementById("scrapeBtn");
    const scrapedText = document.getElementById("scrapedText");

    scrapeBtn.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['content.js']
            });
        });        
    };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getSource") {
        document.getElementById("scrapedText").innerText = request.source;
    }
});

window.onload = onWindowLoad;
