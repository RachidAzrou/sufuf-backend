const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let lightState = {
    nok: false,
    ok: false
};

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/viewer', (req, res) => {
    res.sendFile(__dirname + '/viewer.html');
});

app.get('/ext', (req, res) => {
    res.sendFile(__dirname + '/ext.html');
});

// WebSocket communicatie
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Stuur de huidige lichtstatus naar de nieuwe client
    socket.emit('light-update', lightState);

    // Ontvang wijzigingen van de EXT en update de lichtstatus
    socket.on('switch-light', (data) => {
        if (data.light === 'ok') {
            lightState.ok = true;
            lightState.nok = false;
        } else if (data.light === 'nok') {
            lightState.nok = true;
            lightState.ok = false;
        }
        // Stuur de update naar alle clients
        io.emit('light-update', lightState);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start de server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
