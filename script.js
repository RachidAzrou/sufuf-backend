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
    const status1 = document.getElementById('status1');
    const status2 = document.getElementById('status2');
    
    if (status === 'ok') {
        status1.style.backgroundColor = 'green';
        status2.style.backgroundColor = 'gray';
    } else if (status === 'nok') {
        status1.style.backgroundColor = 'gray';
        status2.style.backgroundColor = 'red';
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

// Functie voor de vrijwilliger om de status naar de server te sturen
function sendStatus(status) {
    fetch('http://localhost:5001/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    });
}
