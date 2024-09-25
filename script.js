let currentScreen = 'loginScreen';

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    currentScreen = screenId;
}

function login() {
    // Hier kun je de inlogfunctionaliteit implementeren
    showScreen('homescreen');
}

function chooseRole(role) {
    if (role === 'imam') {
        showScreen('imamScreen');
    } else {
        showScreen('vrijwilligerScreen');
    }
}

function selectRoom(room, status) {
    // Toon welke knop is ingedrukt
    alert(`Je hebt ${status} geselecteerd voor ${room}`);
}

function goBack(previousScreen) {
    showScreen(previousScreen);
}

function logout() {
    // Hier kun je de uitlogfunctionaliteit implementeren
    showScreen('loginScreen');
}

// Initieel tonen van het inlogscherm
showScreen(currentScreen);
