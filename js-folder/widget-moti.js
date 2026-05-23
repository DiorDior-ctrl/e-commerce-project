// widget-moti.js — Widget i Motit
// Përdorimi i OpenWeatherMap API për të marrë motin e qytetit të përdoruesit

// API key nga OpenWeatherMap (falas - regjistrimi te openweathermap.org)
var API_KEY = "a485b801c9cab0dc29e6fef8b3dc1772";

// Elementet e faqes
var motiLoading = document.getElementById("moti-loading");
var motiPermbajtja = document.getElementById("moti-permbajtja");
var motiGabim = document.getElementById("moti-gabim");
var motiQyteti = document.getElementById("moti-qyteti");
var motiTemp = document.getElementById("moti-temp");
var motiPershkrim = document.getElementById("moti-pershkrim");
var motiSugjerim = document.getElementById("moti-sugjerim");

// Funksioni që jep sugjerim veshjeje bazuar në temperaturë
function sugjerimVeshjeje(temp) {
    if (temp >= 30) {
        return "Mot i nxehtë — koha për veshje të lehta dhe të freskëta!";
    } else if (temp >= 20) {
        return "Mot i këndshëm — ideale për veshje casual dhe të rehatshme.";
    } else if (temp >= 10) {
        return "Mot i freskët — një xhaketë e lehtë do të ishte perfekte.";
    } else {
        return "Mot i ftohtë — kontrollo koleksionin tonë të veshjes së ngrohtë!";
    }
}

// Funksioni që merr motin me koordinatat e dhëna
function merrMotin(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric&lang=sq";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Marrim të dhënat nga API
            var qyteti = data.name;
            var temp = Math.round(data.main.temp);
            var pershkrim = data.weather[0].description;

            // Shfaqim të dhënat në faqe
            motiQyteti.textContent = qyteti;
            motiTemp.textContent = temp + "°C";
            motiPershkrim.textContent = pershkrim;
            motiSugjerim.textContent = sugjerimVeshjeje(temp);

            // Fshehim loading dhe shfaqim permbajtjen
            motiLoading.style.display = "none";
            motiPermbajtja.style.display = "flex";
        })
        .catch(function() {
            // Nese ka gabim shfaqim mesazhin e gabimit
            motiLoading.style.display = "none";
            motiGabim.style.display = "block";
        });
}

// Marrim vendndodhjen e përdoruesit me Geolocation API
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(pozicioni) {
            var lat = pozicioni.coords.latitude;
            var lon = pozicioni.coords.longitude;
            merrMotin(lat, lon);
        },
        function() {
            // Nese perdoruesi refuzon vendndodhjen, tregojme Tiranën si default
            merrMotin(41.3275, 19.8187);
        }
    );
} else {
    // Nese browseri nuk e suporton Geolocation, tregojme Tiranën
    merrMotin(41.3275, 19.8187);
}