// Initialiseer Pusher
const pusher = new Pusher('ffa266f1055f785864eb', {
    cluster: 'eu'
});

// Abonneer op het kanaal
const channel = pusher.subscribe('sufuf-channel');

// Bind de status-update gebeurtenis
channel.bind('status-update', function(data) {
    console.log('Received status update:', data); // Logging
    updateLights(data.status);
});

// Functie om de lichten bij te werken
function updateLights(status) {
    const okLight = document.getElementById('okLight');
    const nokLight = document.getElementById('nokLight');

    // Reset de lichten naar grijs
    okLight.classList.remove('ok', 'active'); // Verwijder 'active' om grijs weer te geven
    nokLight.classList.remove('nok', 'active'); // Verwijder 'active' om grijs weer te geven

    // Update de lichten op basis van de status
    if (status === 'ok') {
        okLight.classList.add('ok', 'active'); // Zet het OK licht aan
    } else if (status === 'nok') {
        nokLight.classList.add('nok', 'active'); // Zet het NOK licht aan
    }
}

// Functie om de schakelaar te togglen
function toggleLight(light) {
    const okSwitch = document.getElementById('okSwitch');
    const nokSwitch = document.getElementById('nokSwitch');

    // Controleer welke schakelaar is ingeschakeld
    if (light === 'ok') {
        if (okSwitch.classList.contains('active')) {
            // Schakel uit
            okSwitch.classList.remove('active');
            sendStatus('reset'); // Reset beide lichten
        } else {
            // Schakel in
            okSwitch.classList.add('active');
            nokSwitch.classList.remove('active'); // Zorg ervoor dat NOK uit is
            sendStatus('ok'); // Stuur OK status naar de server
        }
    } else if (light === 'nok') {
        if (nokSwitch.classList.contains('active')) {
            // Schakel uit
            nokSwitch.classList.remove('active');
            sendStatus('reset'); // Reset beide lichten
        } else {
            // Schakel in
            nokSwitch.classList.add('active');
            okSwitch.classList.remove('active'); // Zorg ervoor dat OK uit is
            sendStatus('nok'); // Stuur NOK status naar de server
        }
    }
}

// Functie om status naar de server te verzenden
function sendStatus(status) {
    fetch('/status', {
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
        console.log('Server response:', data); // Logging
    })
    .catch((error) => {
        console.error('Fout:', error);
    });
}
