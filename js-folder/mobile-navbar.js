// mobile-navbar.js — Hamburger menu dhe linqet mobile

var hamburger = document.getElementById("hamburger");
var siteNav = document.getElementById("site-nav");

// Shtojmë linqet Hyr, Profili, Shporta në fund të menusë kur jemi në mobile
// Këto shfaqen vetëm në mobile sepse header-actions fshihet
function shtoLinqetMobile() {
    var lista = siteNav.querySelector("ul");

    // Kontrollojmë nëse i kemi shtuar tashmë
    if (lista.querySelector(".mobile-only")) {
        return;
    }

    // Krijojmë 3 elementet e reja
    var linqet = [
        { tekst: "Hyr", href: "login-Dior.html" },
        { tekst: "Profili", href: "profile-Alisa.html" },
        { tekst: "Shporta", href: "cart-Diori.html" }
    ];

    for (var i = 0; i < linqet.length; i++) {
        var li = document.createElement("li");
        li.classList.add("mobile-only");

        var a = document.createElement("a");
        a.href = linqet[i].href;
        a.textContent = linqet[i].tekst;

        li.appendChild(a);
        lista.appendChild(li);
    }
}

// Kur klikohet hamburger
hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("open");
    siteNav.classList.toggle("open");

    // Shtojmë linqet herën e parë që hapet menuja
    if (siteNav.classList.contains("open")) {
        shtoLinqetMobile();
    }
});