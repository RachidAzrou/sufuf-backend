const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu' // Jouw Pusher Cluster
});

const channel = pusher.subscribe('sufuf-channel');

// Pusher event listener voor het ontvangen van real-time updates van de vrijwilliger
channel.bind('status-update', function(data) {
    updateStatus(data.status, data.room);
});

// Functie om het statusveld voor de IMAM te updaten
function updateStatus(status, room) {
    const roomStatusMap = {
        'Bovenverdieping': ['status1', 'status2'],
        'Garage': ['status3', 'status4'],
        'Vrouwen': ['status5', 'status6']
    };
    const [okId, nokId] = roomStatusMap[room];

    if (status === 'ok') {
        document.getElementById(okId).style.backgroundColor = 'green';
        document.getElementById(nokId).style.backgroundColor = 'gray';
    } else if (status === 'nok') {
        document.getElementById(okId).style.backgroundColor = 'gray';
        document.getElementById(nokId).style.backgroundColor = 'red';
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

// Functie voor de vrijwilliger om een ruimte te kiezen
function chooseRoom(room) {
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('roomStatusScreen').classList.remove('hidden');
    document.getElementById('roomTitle').textContent = room; // Zet de titel van de ruimte
}

// Functie voor de vrijwilliger om de status naar de server te sturen
function sendStatus(status) {
    const room = document.getElementById('roomTitle').textContent; // Verkrijg de huidige ruimte
    fetch('https://sufuf-backend-2.onrender.com/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status, room: room }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}

// Functie om terug te gaan naar de vorige pagina
function goBack() {
    if (!document.getElementById('homescreen').classList.contains('hidden')) return; // Als op homescreen, kan niet terug
    document.getElementById('imamScreen').classList.add('hidden');
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('roomStatusScreen').classList.add('hidden');
    document.getElementById('homescreen').classList.remove('hidden');
}

// Functie voor inloggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Eenvoudige validatie (hardcoded)
    if (username === 'MEFEN' && password === 'Sufuf2020') {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('homescreen').classList.remove('hidden');
    } else {
        alert('Ongeldige inloggegevens');
    }
}
