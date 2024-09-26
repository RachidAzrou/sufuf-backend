const express = require('express');
const Pusher = require('pusher');
const path = require('path');

// Maak een express-app
const app = express();
const port = 5001;

// Pusher configureren
const pusher = new Pusher({
    appId: '1869623',
    key: 'ffa266f1055f785864eb',
    secret: '8ea27524a66990e1dc58',
    cluster: 'eu',
    useTLS: true
});

// Middleware om JSON-lichaam te parseren
app.use(express.json());

// Statische bestanden serveren (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Stuur index.html als basispagina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API-endpoint voor status updates
app.post('/status', (req, res) => {
    const { space, status } = req.body;

    // Verstuur de status naar Pusher
    pusher.trigger('sufuf-channel', 'status-update', {
        space: space,
        status: status,
    });

    res.json({ message: 'Status verstuurd' });
});

// Server starten
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
