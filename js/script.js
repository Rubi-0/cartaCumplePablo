const loadingScreen = document.querySelector("#loading-screen");
const saveScreen = document.querySelector("#save-screen");
const victoryScreen = document.querySelector("#victory-screen");

const progressTrack = document.querySelector(".progress-track");
const progressBar = document.querySelector("#loading-progress");
const progressPercentage = document.querySelector(
    "#loading-percentage"
);

const continueButton = document.querySelector("#continue-button");
const statsScreen = document.querySelector("#stats-screen");
const achievementsScreen = document.querySelector(
    "#achievements-screen"
);

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
const statsButton = document.querySelector("#stats-button");

const statOptions = document.querySelectorAll(".stat-option");
const statDescription = document.querySelector(
    "#stat-description"
);
const achievementsButton = document.querySelector(
    "#achievements-button"
);

const secretButton = document.querySelector("#secret-button");

const secretAchievements = document.querySelector(
    "#secret-achievements"
);
statsButton.addEventListener("click", () => {
    victoryScreen.hidden = true;
    statsScreen.hidden = false;
});

statOptions.forEach((option) => {
    option.addEventListener("click", () => {
        statOptions.forEach((item) => {
            item.setAttribute("aria-pressed", "false");
        });

        option.setAttribute("aria-pressed", "true");

        statDescription.textContent =
            option.dataset.description;
    });
});
achievementsButton.addEventListener("click", () => {
    statsScreen.hidden = true;
    achievementsScreen.hidden = false;
});

secretButton.addEventListener("click", () => {
    secretAchievements.hidden = false;
    secretAchievements.classList.add("is-revealed");
    secretButton.hidden = true;
});
