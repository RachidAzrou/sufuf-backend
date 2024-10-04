const express = require('express');
const Pusher = require('pusher');
const path = require('path');
const app = express();

// Pusher configuratie
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID, // Pusher ID uit je Render environment
    key: process.env.PUSHER_KEY, // Pusher key
    secret: process.env.PUSHER_SECRET, // Pusher secret
    cluster: process.env.PUSHER_CLUSTER, // Pusher cluster
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Voor statische bestanden

// Status endpoint
app.post('/status', (req, res) => {
    const { status } = req.body;

    pusher.trigger('sufuf-channel', 'status-update', {
        status: status,
    });

    res.json({ success: true });
});

// Frontend route (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Luisteren op de poort
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server draait op poort ${port}`);
});
