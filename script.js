// Pusher configureren voor client-side
const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu'
});

const channel = pusher.subscribe('sufuf-channel');

// Wanneer er een status-update binnenkomt
channel.bind('status-update', function(data) {
    updateLights(data.status);
});

// Functie om de status van de lichten te updaten
function updateLights(status) {
    const okLight = document.getElementById('okLight');
    const nokLight = document.getElementById('nokLight');

    if (status === 'ok') {
        okLight.style.backgroundColor = 'green';
        nokLight.style.backgroundColor = 'gray';
    } else if (status === 'nok') {
        nokLight.style.backgroundColor = 'red';
        okLight.style.backgroundColor = 'gray';
    }
}

// Functie om de status naar de server te sturen
function sendStatus(status) {
    fetch('/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
