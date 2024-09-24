body {
    font-family: 'Arial', sans-serif;
    background-color: #e9ecee; /* Lichtgrijs achtergrond, vergelijkbaar met WhatsApp */
    text-align: center;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}

.hidden {
    display: none;
}

.screen {
    margin: 20px;
}

h1 {
    color: #25D366; /* WhatsApp Groen */
    font-size: 32px;
}

h2 {
    color: #4CAF50; /* Groene kleur voor titels */
}

.btn {
    padding: 15px 30px;
    margin: 10px;
    border-radius: 25px; /* Afgeronde knoppen */
    border: none;
    color: white;
    background-color: #25D366; /* WhatsApp Groen */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #128C7E; /* Donkerder groen bij hover */
}

.ok {
    background-color: #4CAF50; /* Groen voor OK */
}

.nok {
    background-color: #f44336; /* Rood voor NOK */
}

.status {
    font-size: 20px;
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    color: white;
}

.status-button {
    display: inline-block;
    background-color: gray; /* Standaard kleur */
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 10px;
}

.back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #25D366; /* WhatsApp Groen */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    z-index: 1; /* Zorgt ervoor dat de knop boven andere elementen ligt */
}
