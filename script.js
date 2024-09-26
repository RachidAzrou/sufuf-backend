// Functie om in te loggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'MEFEN' && password === 'Sufuf2020') {
        showScreen('homescreen');
    } else {
        alert('Ongeldige inloggegevens');
    }
}

// Functie om een scherm te tonen
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Functie om de rol van de gebruiker te kiezen
function chooseRole(role) {
    if (role === 'imam') {
        showScreen('imamScreen');
    } else if (role === 'vrijwilliger') {
        showScreen('vrijwilligerScreen');
    }
}

// Functie om een ruimte te kiezen
function chooseSpace(space) {
    showScreen('spaceScreen');
    document.getElementById('spaceTitle').innerText = space.charAt(0).toUpperCase() + space.slice(1);
}

// Functie om terug te gaan naar de vorige pagina
function goBack(previousScreen) {
    showScreen(previousScreen);
}

// Functie om uit te loggen
function logout() {
    showScreen('loginScreen');
}

// Functie om de status van een ruimte te updaten
function updateStatus(space, status) {
    alert(`${space} status: ${status}`);
}
