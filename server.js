const express = require('express'); // Zorg ervoor dat express is geïnstalleerd
const Pusher = require('pusher'); // Zorg ervoor dat pusher is geïnstalleerd
const path = require('path'); // Voor het bedienen van statische bestanden

const app = express();
const port = 5001;

// Pusher configureren met jouw app key en cluster
const pusher = new Pusher({
    appId: '1869623',        // Jouw Pusher App ID
    key: 'ffa266f1055f785864eb', // Jouw Pusher Key
    secret: '8ea27524a66990e1dc58', // Jouw Pusher Secret
    cluster: 'eu',             // Jouw Pusher Cluster
    useTLS: true               // Zorg ervoor dat TLS wordt gebruikt voor veilige verbindingen
});

// Middleware om JSON-lichaam te parseren
app.use(express.json());

// Middleware om statische bestanden te serveren (zoals index.html)
app.use(express.static(path.join(__dirname)));

// Voeg de GET-route toe om index.html te serveren
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint voor status updates
app.post('/status', (req, res) => {
    const { space, status } = req.body;
    
    // Verstuur de status via Pusher
    pusher.trigger('sufuf-channel', 'status-update', {
        space: space,
        status: status,
    });

    res.json({ message: 'Status verstuurd' });
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
