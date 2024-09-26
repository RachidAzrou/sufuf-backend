// Pusher configureren met jouw app key en cluster
const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu' // Jouw Pusher Cluster
});

// Abonneer op het Pusher-kanaal
const channel = pusher.subscribe('sufuf-channel');

// Pusher event listener voor het ontvangen van real-time updates van de vrijwilliger
channel.bind('status-update', function(data) {
    updateStatus(data.space, data.status);
});

// Functie om het statusveld voor de IMAM te updaten
function updateStatus(space, status) {
    const statusId = `${space}Status`;
    const nokId = `${space}Nok`;
    
    const statusDiv = document.getElementById(statusId);
    const nokDiv = document.getElementById(nokId);
    
    // Reset alle status kleuren
    statusDiv.style.backgroundColor = 'gray';
    nokDiv.style.backgroundColor = 'gray';

    if (status === 'ok') {
        statusDiv.style.backgroundColor = 'green';
    } else if (status === 'nok') {
        nokDiv.style.backgroundColor = 'red';
    }
}

// Functie om in te loggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'MEFEN' && password === 'Sufuf2020') {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('homescreen').classList.remove('hidden');
    } else {
        alert('Ongeldige inloggegevens');
    }
}

// Functie om de rol van de gebruiker te kiezen
function chooseRole(role) {
    document.getElementById('homescreen').classList.add('hidden');
    if (role === 'imam') {
        document.getElementById('imamScreen').classList.remove('hidden');
    } else if (role === 'vrijwilliger') {
        document.getElementById('vrijwilligerScreen').classList.remove('hidden');
    }
}

// Functie om een ruimte te kiezen
function chooseSpace(space) {
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('spaceScreen').classList.remove('hidden');
    document.getElementById('spaceTitle').innerText = space.charAt(0).toUpperCase() + space.slice(1);
}

// Functie voor de vrijwilliger om de status naar de server te sturen
function sendStatus(status) {
    const space = document.getElementById('spaceTitle').innerText.toLowerCase();
    
    fetch('https://sufuf-backend-2.onrender.com/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ space: space, status: status }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}

// Functie om terug te gaan naar de vorige pagina
function goBack(page) {
    const pages = ['loginScreen', 'homescreen', 'imamScreen', 'vrijwilligerScreen', 'spaceScreen'];
    pages.forEach(p => document.getElementById(p).classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
}
