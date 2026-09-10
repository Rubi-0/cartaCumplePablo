const loadingScreen = document.querySelector("#loading-screen");
const saveScreen = document.querySelector("#save-screen");
const victoryScreen = document.querySelector("#victory-screen");

const progressTrack = document.querySelector(".progress-track");
const progressBar = document.querySelector("#loading-progress");
const progressPercentage = document.querySelector(
    "#loading-percentage"
);

const continueButton = document.querySelector("#continue-button");

let progress = 0;

const loadingInterval = setInterval(() => {
    progress = Math.min(progress + 2, 100);

    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;

    progressTrack.setAttribute("aria-valuenow", progress);

    if (progress === 100) {
        clearInterval(loadingInterval);

        setTimeout(() => {
            loadingScreen.hidden = true;
            saveScreen.hidden = false;
        }, 500);
    }
}, 100);

continueButton.addEventListener("click", () => {
    saveScreen.hidden = true;
    victoryScreen.hidden = false;
});