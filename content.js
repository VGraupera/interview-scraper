function getSelectedText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getTextFromLinkedIn() {
    const element = document.querySelector(".jobs-description__content.jobs-description-content");
    return element ? element.textContent : '';
}

function getTextFromIndeed() {
    const element = document.querySelector("#jobDescriptionText");
    return element ? element.textContent : '';
}

chrome.runtime.sendMessage({
    action: "getSource",
    source:  getSelectedText() || getTextFromLinkedIn() || getTextFromIndeed()
});