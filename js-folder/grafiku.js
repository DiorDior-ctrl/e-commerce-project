// grafiku.js — Grafiku i shitjeve sipas kategorisë me Chart.js

// Marrim elementin canvas ku do të shfaqet grafiku
var canvas = document.getElementById("grafikuShitjeve");

// Krijojmë grafikun e byrekut (doughnut)
var grafiku = new Chart(canvas, {
    type: "doughnut",

    data: {
        labels: ["Modë", "Aksesorë", "Kozmetikë", "Shtëpi & Dekor"],
        datasets: [{
            data: [38, 27, 20, 15],
            backgroundColor: [
                "#1c1a18",
                "#c18b53",
                "#8a837b",
                "#d4cfc9"
            ],
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 8
        }]
    },

    options: {
        responsive: true,
        plugins: {
            // Fshehim legjendën e Chart.js sepse kemi tonën
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    // Shfaqim përqindjen tek tooltip
                    label: function(context) {
                        return context.label + ": " + context.parsed + "%";
                    }
                }
            }
        },
        // Animacion kur ngarkohet grafiku
        animation: {
            duration: 1000,
            easing: "easeInOutQuart"
        }
    }
});