const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu'
});

// Subscribe to the channel
const channel = pusher.subscribe('sufuf-channel');

// Bind to the status-update event
channel.bind('status-update', function(data) {
    updateStatus(data.status);
});

// Functie om de status van de lichten te updaten
function updateStatus(status) {
    const okLight = document.getElementById('okLight') || document.getElementById('okLightExt');
    const nokLight = document.getElementById('nokLight') || document.getElementById('nokLightExt');

    // Reset alle lichten naar grijs
    okLight.classList.remove('ok');
    okLight.classList.remove('nok');
    nokLight.classList.remove('ok');
    nokLight.classList.remove('nok');

    // Update lichten op basis van de status
    if (status === 'ok') {
        okLight.classList.add('ok'); // Zet het OK licht aan
    } else if (status === 'nok') {
        nokLight.classList.add('nok'); // Zet het NOK licht aan
    }
}

// Functie om de schakelaar te togglen
function toggleLight(light) {
    const okSwitch = document.getElementById('okSwitch');
    const nokSwitch = document.getElementById('nokSwitch');

    // Controleer welke schakelaar is ingeschakeld
    if (light === 'ok') {
        if (okSwitch.classList.contains('active')) {
            okSwitch.classList.remove('active');
            sendStatus('reset'); // Reset beide lichten
        } else {
            okSwitch.classList.add('active');
            nokSwitch.classList.remove('active');
            sendStatus('ok'); // Stuur OK status naar de server
        }
    } else if (light === 'nok') {
        if (nokSwitch.classList.contains('active')) {
            nokSwitch.classList.remove('active');
            sendStatus('reset'); // Reset beide lichten
        } else {
            nokSwitch.classList.add('active');
            okSwitch.classList.remove('active');
            sendStatus('nok'); // Stuur NOK status naar de server
        }
    }
}

// Functie om status te verzenden naar de server
function sendStatus(status) {
    fetch('https://sufuf-backend-2.onrender.com/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Netwerkreactie was niet ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Fout:', error);
    });
}
