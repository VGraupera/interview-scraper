function onWindowLoad() {
  const scrapeBtn = document.getElementById("scrapeBtn");

  scrapeBtn.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    });
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getSource") {
      const encodedText = encodeURIComponent(request.source);
      const url = `https://interviewigniter.com/job-description?text=${encodedText}`;
      chrome.tabs.create({ url });
    }
  });  

window.onload = onWindowLoad;
