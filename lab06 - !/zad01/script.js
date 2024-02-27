let totalScore = 0;
let propagationActive = true;
let propagationDirection = true;

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

button1.addEventListener('click', (e) => handleClick(1, 'blue', e));
button2.addEventListener('click', (e) => handleClick(2, 'red', e));
button3.addEventListener('click', (e) => handleClick(3, 'yellow', e));

function handleClick(value, color, event) {
    if (!propagationActive)
        event.stopImmediatePropagation();

    totalScore += value;
    logMessage(`${color} -> ${value}`);
    updateScore();

    if (totalScore >= 30)
        disableButton('button3');
    else
        enableButton('button3');

    if (totalScore >= 50)
        disableButton('button2');
    else
        enableButton('button2');
}

function updateScore() {
    const score = document.getElementById('score');
    score.textContent = `Score: ${totalScore}`;
}

function propagationOnOff() {
    propagationActive = !propagationActive;

    const propagation = document.getElementById('propagationOnOff');
    propagation.textContent = propagationActive ? 'Propagation: ON' : 'Propagation: OFF';
}

function reset() {
    totalScore = 0;
    updateScore();

    if (!propagationActive)
        propagationOnOff();
    if (!propagationDirection)
        propagationDirectionChange();

    Array.from(document.getElementById('log-wrapper').children).forEach(child => child.remove());

    var log = document.createElement('p');
    log.innerText = '------logi------';
    document.getElementById('log-wrapper').appendChild(log);

    enableButton('button1');
    enableButton('button2');
    enableButton('button3');
}

function propagationDirectionChange() {
    propagationDirection = !propagationDirection;
    const button = document.getElementById('propagationDirection');

    button.textContent = propagationDirection ? 'Propagation Top-down' : 'Propagation Bottom-up';
}

function disableButton(buttonId) {
    const button = document.getElementById(buttonId);

    button.style.pointerEvents = 'none';        // Wyłącza interakcję z divem
    button.style.opacity = '0.5';               // Ustawienie przezroczystości na 50%
    button.style.filter = 'grayscale(100%)';    // Zastosowanie efektu odbarwienia
}

function enableButton(buttonId) {
    const button = document.getElementById(buttonId);

    button.style.pointerEvents = 'auto';        // Włącza interakcję z divem
    button.style.opacity = '1';                 // Ustawienie przezroczystości na 100%
    button.style.filter = 'grayscale(0%)';      // Zastosowanie efektu odbarwienia
}


function logMessage(message) {
    console.log(message);
    const log = document.createElement('p');
    log.innerText = message;
    
    const logWrapper = document.getElementById('log-wrapper');
    logWrapper.appendChild(log);
}
