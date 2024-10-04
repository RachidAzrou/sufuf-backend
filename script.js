const pusher = new Pusher('YOUR_PUSHER_KEY', {
    cluster: 'YOUR_PUSHER_CLUSTER',
});

const channel = pusher.subscribe('sufuf-channel');

// Real-time update in Viewer
channel.bind('status-update', function(data) {
    updateLights(data.status);
});

// Navigate to pages
function navigateTo(page) {
    document.getElementById('homeScreen').classList.add('hidden');
    if (page === 'viewer') {
        document.getElementById('viewerScreen').classList.remove('hidden');
    } else if (page === 'ext') {
        document.getElementById('extScreen').classList.remove('hidden');
    }
}

// Go back to home screen
function goBack() {
    document.querySelectorAll('div[id$="Screen"]').forEach(screen => screen.classList.add('hidden'));
    document.getElementById('homeScreen').classList.remove('hidden');
}

// Update lights in real-time
function updateLights(status) {
    const nokLight = document.getElementById('nokLight');
    const okLight = document.getElementById('okLight');
    
    nokLight.classList.remove('red');
    okLight.classList.remove('green');

    if (status === 'nok') {
        nokLight.classList.add('red');
    } else if (status === 'ok') {
        okLight.classList.add('green');
    }
}

// Send status from EXT page
function sendStatus(status) {
    fetch('https://YOUR_BACKEND_URL/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Netwerkfout');
        }
        return response.json();
    }).catch(error => {
        console.error('Fout:', error);
    });
}
