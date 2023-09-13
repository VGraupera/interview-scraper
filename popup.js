function onWindowLoad() {
  const scrapeBtn = document.getElementById("scrapeBtn");

  scrapeBtn.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.url.startsWith("chrome://")) {
        alert("Cannot scrape content from a chrome:// URL.");
        return;
      }
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        })
        .catch((err) => {
          console.error("Error executing script:", err);
        });
    });
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "getSource") {
    const encodedText = encodeURIComponent(request.source);

    if (!encodedText || encodedText === "null" || encodedText === "undefined") {
      alert("Error: Job description could not be found. Please make sure you are on a job description page.");
      return;
    }

    const url = `https://interviewigniter.com/job-description?text=${encodedText}`;

    // const url = `http://localhost:3000/job-description?text=${encodedText}`;
    chrome.tabs.create({ url });
  }
});

window.onload = onWindowLoad;
