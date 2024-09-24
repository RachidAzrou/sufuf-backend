// Pusher configureren met jouw app key en cluster
const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu' // Jouw Pusher Cluster
});

// Abonneer op het Pusher-kanaal
const channel = pusher.subscribe('sufuf-channel');

// Pusher event listener voor het ontvangen van real-time updates van de vrijwilliger
channel.bind('status-update', function(data) {
    updateStatus(data.status);
});

// Functie om het statusveld voor de IMAM te updaten
function updateStatus(status) {
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(element => {
        if (status === 'ok') {
            element.style.backgroundColor = 'green';
        } else if (status === 'nok') {
            element.style.backgroundColor = 'red';
        }
    });
}

// Functie om in te loggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simpele login check
    if (username === 'MEFEN' && password === 'Sufuf2020') {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('homescreen').classList.remove('hidden');
    } else {
        alert('Ongeldige gebruikersnaam of wachtwoord');
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
    document.getElementById('ruimteTitel').innerText = space;
    document.getElementById('ruimteScreen').classList.remove('hidden');
}

// Functie voor de vrijwilliger om de status naar de server te sturen
function sendStatus(status) {
    fetch('https://sufuf-backend-2.onrender.com/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}

// Functie om terug te gaan naar de vorige pagina
function goBack() {
    if (!document.getElementById('loginScreen').classList.contains('hidden')) return;
    if (!document.getElementById('homescreen').classList.contains('hidden')) {
        document.getElementById('homescreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    } else if (!document.getElementById('vrijwilligerScreen').classList.contains('hidden')) {
        document.getElementById('vrijwilligerScreen').classList.add('hidden');
        document.getElementById('homescreen').classList.remove('hidden');
    } else if (!document.getElementById('ruimteScreen').classList.contains('hidden')) {
        document.getElementById('ruimteScreen').classList.add('hidden');
        document.getElementById('vrijwilligerScreen').classList.remove('hidden');
    }
}
