var tempText;
var humidText;

document.addEventListener("DOMContentLoaded", (event) => {
    init();
});

function init() {
    tempText = document.getElementById('temperature');
    humidText = document.getElementById('humidity');

    setInterval(printClimateData, 5000);
}

function printClimateData() {
    fetch('/temperature')
        .then(response => response.json())
        .then(response => tempText.innerHTML = response);

    fetch('/humidity')
        .then(response => response.json())
        .then(response => humidText.innerHTML = response);
}



