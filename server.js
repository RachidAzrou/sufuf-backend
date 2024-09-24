const express = require('express');
const Pusher = require('pusher');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001; // Gebruik de omgevingsvariabele PORT

// Pusher configureren met jouw app key en cluster
const pusher = new Pusher({
    appId: '1869623',
    key: 'ffa266f1055f785864eb',
    secret: '8ea27524a66990e1dc58',
    cluster: 'eu',
    useTLS: true
});

// Middleware om JSON-lichaam te parseren
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Voeg de GET-route toe om index.html te serveren
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint voor status updates
app.post('/status', (req, res) => {
    const status = req.body.status;

    // Verstuur de status via Pusher
    pusher.trigger('sufuf-channel', 'status-update', {
        status: status,
    });

    res.json({ message: 'Status verstuurd' });
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
