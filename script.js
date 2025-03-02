// Constantes
const INITIAL_SPEED = 1.0;
const ACCELERATION_EXPONENT = 0.6;
const PANEL_SPEED_FACTOR = 30.0;

// Variables de jeu
let speed = INITIAL_SPEED;
let gameState = "ready";
let animationFrame;
let startTime = null;
let lastFrameTime = null;
let panelX, panelY;

// Sélections DOM
const speedDisplay = document.getElementById("distanceDisplay");
const gameButton = document.getElementById("gameButton");
const resultPopup = document.getElementById("resultPopup");
const resultContent = document.getElementById("resultContent");
const resultText = document.getElementById("resultText");
const resultOk = document.getElementById("resultOk");
const foliePanel = document.getElementById("folie-douce");
const slope = document.getElementById("slope");

// Met à jour l'affichage de la vitesse
function updateSpeedDisplay() {
    speedDisplay.textContent = `Vitesse: ${speed.toFixed(4)} km/h`;
}

// Affiche le résultat dans le pop-up selon la vitesse finale
function showResult() {
    let msg = "";
    let bgColor = "";
    if (speed < 70) {
        msg = "Le skieur est trop lent et a loupé l'event 💀";
        bgColor = "#e3342f"; // rouge
    } else if (speed < 95) {
        msg = "Le skieur arrive juste à la fin de l'event, il aurait dû foncer plus pour mieux profiter 😕";
        bgColor = "#f6993f"; // orange
    } else if (speed <= 100) {
        msg = "T'es vraiment le GOAT que tu penses être, le skieur a surkiffé l'événement et a profité à fond 🐐";
        bgColor = "#38c172"; // vert
    } else {
        msg = "Le skieur est mort, SKIUT a maintenant un procès sur le dos... ☠️";
        bgColor = "#000000"; // noir
    }
    resultText.textContent = msg;
    resultContent.style.backgroundColor = bgColor;
    resultPopup.classList.remove("hidden");
}

// Bouton OK du pop-up
resultOk.addEventListener("click", () => {
    resultPopup.classList.add("hidden");
});

// Calcule dynamiquement les facteurs de direction en fonction des dimensions de la pente
function getSlopeDirectionFactors() {
    let sw = slope.offsetWidth;
    let sh = slope.offsetHeight;
    // P1 = (0, 0.40 * sh) et P2 = (sw, 0.11 * sh)
    let dx = sw;
    let dy = (0.11 * sh) - (0.40 * sh); // = -0.29 * sh
    let len = Math.sqrt(dx * dx + dy * dy);
    return {dxFactor: dx / len, dyFactor: dy / len};
}

// Initialise la position du panneau sur la pente
function initPanelPosition() {
    panelX = slope.offsetWidth * 0.1;
    panelY = slope.offsetHeight * 0.35;
    foliePanel.style.display = "block";
    foliePanel.style.left = panelX + "px";
    foliePanel.style.top = panelY + "px";
}

// Met à jour la position du panneau en suivant la pente
function updatePanelPosition(dt) {
    const {dxFactor, dyFactor} = getSlopeDirectionFactors();
    const dx = PANEL_SPEED_FACTOR * speed * dt * dxFactor;
    const dy = PANEL_SPEED_FACTOR * speed * dt * dyFactor;
    panelX += dx;
    panelY += dy;
    foliePanel.style.left = panelX + "px";
    foliePanel.style.top = panelY + "px";
    if (panelX > slope.offsetWidth || panelY + foliePanel.offsetHeight < 0) {
        foliePanel.style.display = "none";
    }
}

// Boucle d'animation : met à jour la vitesse et la position du panneau
function updateSpeed(timestamp) {
    if (!startTime) startTime = timestamp;
    if (!lastFrameTime) lastFrameTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    const dt = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    speed = INITIAL_SPEED * Math.exp(ACCELERATION_EXPONENT * elapsed);
    updateSpeedDisplay();
    updatePanelPosition(dt);

    if (speed > 100) {
        stopGame();
        showResult();
        return;
    }

    if (gameState === "running") {
        animationFrame = requestAnimationFrame(updateSpeed);
    }
}

// Démarre la partie
function startGame() {
    gameState = "running";
    updateButton();
    resultPopup.classList.add("hidden");
    startTime = null;
    lastFrameTime = null;
    initPanelPosition();
    animationFrame = requestAnimationFrame(updateSpeed);
}

// Arrête la partie et affiche le résultat
function stopGame() {
    gameState = "stopped";
    cancelAnimationFrame(animationFrame);
    updateButton();
    showResult();
}

// Réinitialise la partie
function resetGame() {
    speed = INITIAL_SPEED;
    updateSpeedDisplay();
    gameState = "ready";
    updateButton();
    startTime = null;
    lastFrameTime = null;
    resultPopup.classList.add("hidden");
    initPanelPosition();
}

// Met à jour l'apparence du bouton selon l'état du jeu
function updateButton() {
    if (gameState === "running") {
        gameButton.textContent = "Stop";
        gameButton.classList.remove("bg-green-500", "hover:bg-green-600", "bg-blue-500", "hover:bg-blue-600");
        gameButton.classList.add("bg-red-500", "hover:bg-red-600");
    } else if (gameState === "ready") {
        gameButton.textContent = "Start";
        gameButton.classList.remove("bg-red-500", "hover:bg-red-600", "bg-blue-500", "hover:bg-blue-600");
        gameButton.classList.add("bg-green-500", "hover:bg-green-600");
    } else if (gameState === "stopped") {
        gameButton.textContent = "Reset";
        gameButton.classList.remove("bg-red-500", "hover:bg-red-600", "bg-green-500", "hover:bg-green-600");
        gameButton.classList.add("bg-blue-500", "hover:bg-blue-600");
    }
}

// Gestion du clic sur le bouton principal
gameButton.addEventListener("click", () => {
    if (gameState === "ready") {
        startGame();
    } else if (gameState === "running") {
        stopGame();
    } else if (gameState === "stopped") {
        resetGame();
    }
});
