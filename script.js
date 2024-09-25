// Functie om cookies te lezen
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Bij het laden van de pagina controleren we of de gebruiker al is ingelogd
window.onload = function() {
    const username = getCookie('username');
    const role = getCookie('role');

    if (username && role) {
        // Als de gebruiker ingelogd is, laad de juiste pagina
        if (role === 'imam') {
            showImamPage();
        } else if (role === 'vrijwilliger') {
            showVrijwilligerPage();
        }
    } else {
        // Als er geen cookies zijn, toon de loginpagina
        document.getElementById('loginScreen').classList.remove('hidden');
    }
};

// Functie voor inloggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Controleer of beide velden zijn ingevuld
    if (!username || !password) {
        alert('Vul zowel gebruikersnaam als wachtwoord in.');
        return;
    }

    // API-aanroep voor inloggen
    fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            // Als er een fout is, toon de foutmelding
            return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Inloggen succesvol') {
            // Zet de juiste pagina afhankelijk van de rol
            if (data.role === 'imam') {
                showImamPage();
            } else if (data.role === 'vrijwilliger') {
                showVrijwilligerPage();
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Inloggen mislukt: ' + error.message);
    });
}

// Functie om de Imam-pagina weer te geven
function showImamPage() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('imamScreen').classList.remove('hidden');
}

// Functie om de Vrijwilliger-pagina weer te geven
function showVrijwilligerPage() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('vrijwilligerScreen').classList.remove('hidden');
}

// Functie om de juiste ruimte te kiezen
function chooseSpace(space) {
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('spaceScreen').classList.remove('hidden');
    document.getElementById('spaceTitle').innerText = space.charAt(0).toUpperCase() + space.slice(1);
}

// Functie voor het versturen van de status naar de server
function sendStatus(status) {
    const space = document.getElementById('spaceTitle').innerText.toLowerCase();
    
    fetch('http://localhost:5001/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ space, status }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        goBack('vrijwilligerScreen'); // Terug naar het vrijwilliger-scherm
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Er is een probleem opgetreden. Probeer het opnieuw.');
    });
}

// Functie om terug te gaan naar een specifiek scherm
function goBack(screenId) {
    const screens = ['loginScreen', 'homescreen', 'imamScreen', 'vrijwilligerScreen', 'spaceScreen'];
    screens.forEach(screen => document.getElementById(screen).classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}
