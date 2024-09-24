// Functie om cookies te lezen
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Bij het laden van de pagina controleren we of de gebruiker al is ingelogd
window.onload = function() {
    const username = getCookie('username');
    const role = getCookie('role');

    if (username && role) {
        // Hier kun je logica toevoegen om de juiste pagina te tonen
        if (role === 'imam') {
            showImamPage(); // Functie om de imam pagina weer te geven
        } else if (role === 'vrijwilliger') {
            showVrijwilligerPage(); // Functie om de vrijwilliger pagina weer te geven
        }
    }
};

// Functie voor inloggen
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Inloggen succesvol') {
            window.location.href = 'imam.html'; // Of naar de juiste pagina voor de rol
        } else {
            alert(data.message);
        }
    });
}
