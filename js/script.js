const screens = document.querySelectorAll(".screen");

const loadingScreen = document.querySelector("#loading-screen");
const saveScreen = document.querySelector("#save-screen");
const victoryScreen = document.querySelector("#victory-screen");
const statsScreen = document.querySelector("#stats-screen");

const achievementsScreen = document.querySelector(
    "#achievements-screen"
);

const savingScreen = document.querySelector("#saving-screen");

const level22Screen = document.querySelector(
    "#level-22-screen"
);

const missionScreen = document.querySelector(
    "#mission-screen"
);

const memoriesScreen = document.querySelector(
    "#memories-screen"
);

/* Elementos de la pantalla de carga */

const progressTrack = document.querySelector(
    ".progress-track"
);

const progressBar = document.querySelector(
    "#loading-progress"
);

const progressPercentage = document.querySelector(
    "#loading-percentage"
);

/* Botones de navegación */

const continueButton = document.querySelector(
    "#continue-button"
);

const statsButton = document.querySelector(
    "#stats-button"
);

const achievementsButton = document.querySelector(
    "#achievements-button"
);

const secretButton = document.querySelector(
    "#secret-button"
);

const saveProgressButton = document.querySelector(
    "#save-progress-button"
);

const startLevelButton = document.querySelector(
    "#start-level-button"
);

const acceptMissionButton = document.querySelector(
    "#accept-mission-button"
);

const replayButton = document.querySelector(
    "#replay-button"
);

/* Elementos de estadísticas */

const statOptions = document.querySelectorAll(
    ".stat-option"
);

const statDescription = document.querySelector(
    "#stat-description"
);

const cooperativeDaysElements = document.querySelectorAll(
    ".cooperative-days"
);

/* Elementos de logros */

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

/* Elementos de guardado */

const savingTrack = document.querySelector(
    "#saving-track"
);

const savingProgress = document.querySelector(
    "#saving-progress"
);

const savingPercentage = document.querySelector(
    "#saving-percentage"
);

const savingStatus = document.querySelector(
    "#saving-status"
);

const savingTitle = document.querySelector(
    "#saving-title"
);

/*
 * Oculta todas las pantallas y muestra únicamente
 * la pantalla recibida.
 */

function showScreen(nextScreen) {
    screens.forEach((screen) => {
        screen.hidden = true;
    });

    nextScreen.hidden = false;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });
}

/*
 * Calcula los días desde el 21 de marzo de 2025.
 */

function updateCooperativeDays() {
    const relationshipStart = Date.UTC(2025, 2, 21);
    const today = new Date();

    const currentDate = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysTogether = Math.max(
        0,
        Math.floor(
            (currentDate - relationshipStart) /
                millisecondsPerDay
        )
    );

    cooperativeDaysElements.forEach((element) => {
        element.textContent = daysTogether;
    });
}

updateCooperativeDays();

/*
 * Asegura que al cargar la página solamente
 * aparezca la primera pantalla.
 */

showScreen(loadingScreen);

/*
 * Pantalla 1: barra de carga.
 */

let progress = 0;

const loadingInterval = setInterval(() => {
    progress = Math.min(progress + 2, 100);

    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;

    progressTrack.setAttribute(
        "aria-valuenow",
        progress
    );

    if (progress === 100) {
        clearInterval(loadingInterval);

        setTimeout(() => {
            showScreen(saveScreen);
        }, 500);
    }
}, 100);

/*
 * Pantallas 2, 3, 4 y 5.
 */

continueButton.addEventListener("click", () => {
    showScreen(victoryScreen);
});

statsButton.addEventListener("click", () => {
    showScreen(statsScreen);
});

achievementsButton.addEventListener("click", () => {
    showScreen(achievementsScreen);
});

/*
 * Selección de estadísticas.
 */

statOptions.forEach((option) => {
    option.addEventListener("click", () => {
        statOptions.forEach((item) => {
            item.setAttribute(
                "aria-pressed",
                "false"
            );
        });

        option.setAttribute(
            "aria-pressed",
            "true"
        );

        statDescription.textContent =
            option.dataset.description;
    });
});

/*
 * Selección de logros.
 */

achievementTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        achievementTiles.forEach((item) => {
            item.setAttribute(
                "aria-pressed",
                "false"
            );
        });

        tile.setAttribute(
            "aria-pressed",
            "true"
        );

        achievementDetailTitle.textContent =
            tile.dataset.title;

        achievementDetailDescription.textContent =
            tile.dataset.description;
    });
});

/*
 * Desbloquear logros secretos.
 */

secretButton.addEventListener("click", () => {
    secretTiles.forEach((tile) => {
        tile.disabled = false;
        tile.classList.add("is-unlocked");

        const name = tile.querySelector(
            ".achievement-name"
        );

        const state = tile.querySelector(
            ".achievement-state"
        );

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

/*
 * Pantalla 6: guardar progreso.
 */

saveProgressButton.addEventListener("click", () => {
    saveProgressButton.disabled = true;

    showScreen(savingScreen);

    let savingValue = 0;

    savingTitle.textContent =
        "GUARDANDO PROGRESO...";

    savingStatus.textContent =
        "PREPARANDO DATOS...";

    savingProgress.style.width = "0%";
    savingPercentage.textContent = "0%";

    savingTrack.setAttribute(
        "aria-valuenow",
        "0"
    );

    const savingInterval = setInterval(() => {
        savingValue = Math.min(
            savingValue + 4,
            100
        );

        savingProgress.style.width =
            `${savingValue}%`;

        savingPercentage.textContent =
            `${savingValue}%`;

        savingTrack.setAttribute(
            "aria-valuenow",
            savingValue
        );

        if (savingValue < 35) {
            savingStatus.textContent =
                "GUARDANDO ESTADÍSTICAS...";
        } else if (savingValue < 70) {
            savingStatus.textContent =
                "REGISTRANDO LOGROS...";
        } else if (savingValue < 100) {
            savingStatus.textContent =
                "ACTUALIZANDO PARTIDA...";
        } else {
            clearInterval(savingInterval);

            savingTitle.textContent =
                "PROGRESO GUARDADO";

            savingStatus.textContent =
                "LISTO PARA DESBLOQUEAR EL NIVEL 22";

            /*
             * Este temporizador se ejecuta una sola vez,
             * cuando el guardado llega al 100 %.
             */

            setTimeout(() => {
                showScreen(level22Screen);
            }, 1400);
        }
    }, 140);
});

/*
 * Pantalla 7: nivel 22 desbloqueado.
 */

startLevelButton.addEventListener("click", () => {
    showScreen(missionScreen);
});

/*
 * Pantalla 8: nueva misión.
 */

acceptMissionButton.addEventListener("click", () => {
    showScreen(memoriesScreen);
});

/*
 * Pantalla 9: volver a comenzar.
 */

replayButton.addEventListener("click", () => {
    window.location.reload();
});