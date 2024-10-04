const express = require('express');
const Pusher = require('pusher');
const app = express();
const port = 5000;

const pusher = new Pusher({
    appId: 'YOUR_PUSHER_APP_ID',
    key: 'YOUR_PUSHER_KEY',
    secret: 'YOUR_PUSHER_SECRET',
    cluster: 'YOUR_PUSHER_CLUSTER',
    useTLS: true
});

app.use(express.json());

app.post('/status', (req, res) => {
    const { status } = req.body;

    // Trigger Pusher event
    pusher.trigger('sufuf-channel', 'status-update', {
        status: status,
    });

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
