// Globale variabele om de huidige gebruiker op te slaan
let currentUserRole;

// Functie om in te loggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simuleer inlogvalidatie
    if (username && password) {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('homescreen').classList.remove('hidden');
    } else {
        alert('Vul alstublieft gebruikersnaam en wachtwoord in.');
    }
}

// Functie om de rol te kiezen
function chooseRole(role) {
    currentUserRole = role;
    if (role === 'imam') {
        document.getElementById('homescreen').classList.add('hidden');
        document.getElementById('imamScreen').classList.remove('hidden');
    } else if (role === 'vrijwilliger') {
        document.getElementById('homescreen').classList.add('hidden');
        document.getElementById('vrijwilligerScreen').classList.remove('hidden');
    }
}

// Functie om een ruimte te kiezen
function chooseSpace(space) {
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('spaceTitle').innerText = space.charAt(0).toUpperCase() + space.slice(1);
    document.getElementById('spaceScreen').classList.remove('hidden');
}

// Functie om een status te verzenden
function sendStatus(status) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerText = `Je hebt ${status === 'ok' ? 'OK' : 'NOK'} geselecteerd.`;
    statusMessage.className = 'status-message ' + status + ' visible'; // Voegt de juiste klasse toe
}

// Functie om terug te gaan naar een vorige scherm
function goBack(previousScreen) {
    if (previousScreen === 'loginScreen') {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('homescreen').classList.add('hidden');
    } else {
        document.getElementById(previousScreen).classList.remove('hidden');
        document.getElementById('spaceScreen').classList.add('hidden');
    }
}

// Functie om uit te loggen
function logout() {
    // Hier kun je eventuele uitloglogica toevoegen, bijvoorbeeld token verwijderen
    alert("Je bent uitgelogd.");
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('homescreen').classList.add('hidden');
    document.getElementById('imamScreen').classList.add('hidden');
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('spaceScreen').classList.add('hidden');
}
