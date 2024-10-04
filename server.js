const express = require('express');
const Pusher = require('pusher');
const path = require('path');
const cors = require('cors'); // Voeg CORS toe

const app = express();
const port = process.env.PORT || 5000; // Gebruik omgevingspoort van Render

// Pusher configureren met jouw gegevens
const pusher = new Pusher({
    appId: '1869623',
    key: 'ffa266f1055f785864eb',
    secret: '8ea27524a66990e1dc58',
    cluster: 'eu',
    useTLS: true
});

// Middleware om JSON te parseren
app.use(cors()); // Schakel CORS in
app.use(express.json());

// Statische bestanden zoals HTML en CSS serveren
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint om status updates te verwerken
app.post('/status', (req, res) => {
    const { status } = req.body;

    // Log de ontvangen status voor debugging
    console.log('Received status:', status);

    // Trigger Pusher event
    pusher.trigger('sufuf-channel', 'status-update', {
        status: status
    })
    .then(() => {
        // Succesvolle trigger
        res.json({ message: 'Status verstuurd' });
    })
    .catch(err => {
        // Fout bij het triggeren
        console.error('Pusher error:', err);
        res.status(500).json({ message: 'Fout bij het versturen van status' });
    });
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
