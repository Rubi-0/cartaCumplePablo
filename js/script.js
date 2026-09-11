const loadingScreen = document.querySelector("#loading-screen");
const saveScreen = document.querySelector("#save-screen");
const victoryScreen = document.querySelector("#victory-screen");
const statsScreen = document.querySelector("#stats-screen");

const achievementsScreen = document.querySelector(
    "#achievements-screen"
);

const progressTrack = document.querySelector(".progress-track");
const progressBar = document.querySelector("#loading-progress");

const progressPercentage = document.querySelector(
    "#loading-percentage"
);

const continueButton = document.querySelector("#continue-button");
const statsButton = document.querySelector("#stats-button");

const achievementsButton = document.querySelector(
    "#achievements-button"
);

const statOptions = document.querySelectorAll(".stat-option");

const statDescription = document.querySelector(
    "#stat-description"
);

const achievementTiles = document.querySelectorAll(
    ".achievement-tile"
);

const secretTiles = document.querySelectorAll(
    ".achievement-tile--secret"
);

const achievementCarousel = document.querySelector(
    "#achievement-carousel"
);

const achievementDetailTitle = document.querySelector(
    "#achievement-detail-title"
);

const achievementDetailDescription = document.querySelector(
    "#achievement-detail-description"
);

const secretButton = document.querySelector("#secret-button");

const saveProgressButton = document.querySelector(
    "#save-progress-button"
);

function showScreen(currentScreen, nextScreen) {
    currentScreen.hidden = true;
    nextScreen.hidden = false;
}

let progress = 0;

const loadingInterval = setInterval(() => {
    progress = Math.min(progress + 2, 100);

    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;

    progressTrack.setAttribute("aria-valuenow", progress);

    if (progress === 100) {
        clearInterval(loadingInterval);

        setTimeout(() => {
            showScreen(loadingScreen, saveScreen);
        }, 500);
    }
}, 100);

continueButton.addEventListener("click", () => {
    showScreen(saveScreen, victoryScreen);
});

statsButton.addEventListener("click", () => {
    showScreen(victoryScreen, statsScreen);
});

achievementsButton.addEventListener("click", () => {
    showScreen(statsScreen, achievementsScreen);
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

achievementTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        achievementTiles.forEach((item) => {
            item.setAttribute("aria-pressed", "false");
        });

        tile.setAttribute("aria-pressed", "true");

        achievementDetailTitle.textContent =
            tile.dataset.title;

        achievementDetailDescription.textContent =
            tile.dataset.description;
    });
});

secretButton.addEventListener("click", () => {
    secretTiles.forEach((tile) => {
        tile.disabled = false;
        tile.classList.add("is-unlocked");

        const icon = tile.querySelector(
            ".achievement-icon"
        );

        const name = tile.querySelector(
            ".achievement-name"
        );

        const state = tile.querySelector(
            ".achievement-state"
        );

        icon.textContent = tile.dataset.icon;
        name.textContent = tile.dataset.title;
        state.textContent = "DESBLOQUEADO";
    });

    secretButton.hidden = true;
    saveProgressButton.hidden = false;

    achievementDetailTitle.textContent =
        "LOGROS SECRETOS DESBLOQUEADOS";

    achievementDetailDescription.textContent =
        "Se encontraron dos logros ocultos del nivel 21.";

    achievementCarousel.scrollTo({
        left: achievementCarousel.scrollWidth,
        behavior: "smooth"
    });
});