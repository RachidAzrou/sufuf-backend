// Pusher configureren met jouw app key en cluster
const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu'
});

// Abonneer op het Pusher-kanaal
const channel = pusher.subscribe('sufuf-channel');

// Pusher event listener voor het ontvangen van real-time updates van de vrijwilliger
channel.bind('status-update', function(data) {
    updateStatus(data.status, data.room);
});

// Functie om het statusveld voor de IMAM te updaten
function updateStatus(status, room) {
    const statusElement = document.getElementById(`status${room}`);
    if (status === 'ok') {
        statusElement.style.backgroundColor = 'green';
    } else if (status === 'nok') {
        statusElement.style.backgroundColor = 'red';
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

// Functie om de ruimte van de vrijwilliger te kiezen
function chooseRoom(room) {
    document.getElementById('roomSelection').classList.remove('hidden');
    // Hier kan je de logica toevoegen om te controleren of iemand al is ingelogd in de ruimte
}

// Functie voor de vrijwilliger om de status naar de server te sturen
function sendStatus(status) {
    const selectedRoom = document.querySelector('#roomSelection h3').innerText; // aanname dat je de ruimte weet
    fetch('https://sufuf-backend-2.onrender.com/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status, room: selectedRoom }), // Stuur de status en kamer mee
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}
