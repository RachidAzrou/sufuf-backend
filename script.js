const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu'
});

const channel = pusher.subscribe('sufuf-channel');

channel.bind('status-update', function(data) {
    updateStatus(data.status);
});

function updateStatus(status) {
    // Logica voor het bijwerken van IMAM-status (niet getoond voor eenvoud)
}

function chooseRole(role) {
    document.getElementById('homescreen').classList.add('hidden');
    if (role === 'imam') {
        document.getElementById('imamScreen').classList.remove('hidden');
    } else if (role === 'vrijwilliger') {
        document.getElementById('vrijwilligerScreen').classList.remove('hidden');
    }
}

function chooseRoom(room) {
    document.getElementById('vrijwilligerScreen').classList.add('hidden');
    document.getElementById('roomTitle').innerText = room;
    document.getElementById('roomScreen').classList.remove('hidden');
}

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

function goBack() {
    const currentScreen = document.querySelector('.screen:not(.hidden)');
    
    if (currentScreen.id === 'roomScreen') {
        document.getElementById('vrijwilligerScreen').classList.remove('hidden');
        document.getElementById('roomScreen').classList.add('hidden');
    } else if (currentScreen.id === 'vrijwilligerScreen') {
        document.getElementById('homescreen').classList.remove('hidden');
        document.getElementById('vrijwilligerScreen').classList.add('hidden');
    } else if (currentScreen.id === 'imamScreen') {
        document.getElementById('homescreen').classList.remove('hidden');
        document.getElementById('imamScreen').classList.add('hidden');
    }
}
