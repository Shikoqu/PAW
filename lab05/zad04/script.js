var clickCount = 0;
var buttonActive = false;

function incrementCounter() {
    if (buttonActive) {
        clickCount++;
        updateClickCount();
    }
}

function activateButton() {
    buttonActive = true;
    updateButtonStatus();
}

function deactivateButton() {
    buttonActive = false;
    clickCount = 0;
    updateClickCount();
    updateButtonStatus();
}

function updateClickCount() {
    document.getElementById("clickCount").textContent = clickCount;
}

function updateButtonStatus() {
    var buttonStatusElement = document.getElementById("buttonStatus");
    var actionButton = document.getElementById("actionButton");
    var activateButton = document.getElementById("activateButton");
    var deactivateButton = document.getElementById("deactivateButton");

    if (buttonActive) {
        buttonStatusElement.textContent = "Aktywny";
        actionButton.removeAttribute("disabled");
        activateButton.setAttribute("disabled", "true");
        deactivateButton.removeAttribute("disabled");
    } else {
        buttonStatusElement.textContent = "Nieaktywny";
        actionButton.setAttribute("disabled", "true");
        activateButton.removeAttribute("disabled");
        deactivateButton.setAttribute("disabled", "true");
    }
}
