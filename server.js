const express = require('express');
const Pusher = require('pusher');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5001;

const pusher = new Pusher({
    appId: '1869623',
    key: 'ffa266f1055f785864eb',
    secret: '8ea27524a66990e1dc58',
    cluster: 'eu',
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Endpoint voor inloggen
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'MEFEN' && password === 'Sufuf2020') {
        res.cookie('username', username, { maxAge: 7200000, httpOnly: true }); // 2 uur
        res.cookie('role', 'imam', { maxAge: 7200000, httpOnly: true });
        res.json({ message: 'Inloggen succesvol', role: 'imam' });
    } else if (username === 'Vrijwilliger' && password === 'Sufuf2020') {
        res.cookie('username', username, { maxAge: 7200000, httpOnly: true });
        res.cookie('role', 'vrijwilliger', { maxAge: 7200000, httpOnly: true });
        res.json({ message: 'Inloggen succesvol', role: 'vrijwilliger' });
    } else {
        res.status(401).json({ message: 'Ongeldige inloggegevens' });
    }
});

// Endpoint voor status updates
app.post('/status', (req, res) => {
    const { space, status } = req.body;
    
    pusher.trigger('sufuf-channel', 'status-update', { space, status });
    res.json({ message: 'Status verstuurd' });
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
