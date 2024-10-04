const socket = io();

// Haal referenties op naar de HTML-elementen
const nokLight = document.getElementById('nok-light');
const okLight = document.getElementById('ok-light');

const nokButton = document.getElementById('nok-button');
const okButton = document.getElementById('ok-button');

// Luister naar updates van de server over de lichten
socket.on('light-update', (data) => {
    if (data.ok) {
        okLight.style.backgroundColor = 'green';
        nokLight.style.backgroundColor = 'grey';
    } else if (data.nok) {
        nokLight.style.backgroundColor = 'red';
        okLight.style.backgroundColor = 'grey';
    } else {
        okLight.style.backgroundColor = 'grey';
        nokLight.style.backgroundColor = 'grey';
    }
});

// Controleer of we op de EXT pagina zijn, en als dat zo is, voeg knoppenfunctionaliteit toe
if (nokButton && okButton) {
    nokButton.addEventListener('click', () => {
        socket.emit('switch-light', { light: 'nok' });
    });

    okButton.addEventListener('click', () => {
        socket.emit('switch-light', { light: 'ok' });
    });
}
