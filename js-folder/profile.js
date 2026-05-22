// profile.js — Navigimi dhe Validimi i Formave të Profilit

// NAVIGIMI MES SEKSIONEVE
// Kur klikojmë mbi menu-linkun, shfaqim seksionin përkatës
var menuLinqet = document.querySelectorAll(".menu-link");
var seksionet = document.querySelectorAll(".seksion-profili");

for (var i = 0; i < menuLinqet.length; i++) {
  menuLinqet[i].addEventListener("click", function(event) {
    event.preventDefault();

    // Heqim klasën active nga të gjithë linqet
    for (var j = 0; j < menuLinqet.length; j++) {
      menuLinqet[j].classList.remove("active");
    }

    // Fshehim të gjitha seksionet
    for (var k = 0; k < seksionet.length; k++) {
      seksionet[k].classList.remove("aktiv");
    }

    // Aktivizojmë linkun e klikuar
    this.classList.add("active");

    // Shfaqim seksionin përkatës
    var idSeksionit = this.getAttribute("data-seksion");
    document.getElementById(idSeksionit).classList.add("aktiv");
  });
}

// FUNKSIONET E VALIDIMIT
function shfaqGabim(idGabimit, mesazhi) {
  document.getElementById(idGabimit).textContent = mesazhi;
}

function fshijGabim(idGabimit) {
  document.getElementById(idGabimit).textContent = "";
}

function vendosKlaseFushe(fushe, eshteeSakte) {
  if (eshteeSakte) {
    fushe.classList.remove("ka-gabim");
    fushe.classList.add("e-sakte");
  } else {
    fushe.classList.remove("e-sakte");
    fushe.classList.add("ka-gabim");
  }
}

// Validimi i email-it me RegExp
function emailEsakte(email) {
  var formati = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return formati.test(email);
}

// Validimi i celularit me RegExp
function celulariEsakte(numri) {
  var formati = /^\d{3}-\d{7}$/;
  return formati.test(numri);
}

// FORMA 1: Të dhënat personale

var formaTeDhenat = document.getElementById("forma-te-dhenat");

formaTeDhenat.addEventListener("submit", function(event) {
  event.preventDefault();

  var kaGabime = false;

  var emri = document.getElementById("emri");
  if (emri.value.trim() === "") {
    shfaqGabim("gabim-emri", "Emri është i detyrueshëm.");
    vendosKlaseFushe(emri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-emri");
    vendosKlaseFushe(emri, true);
  }

  var mbiemri = document.getElementById("mbiemri");
  if (mbiemri.value.trim() === "") {
    shfaqGabim("gabim-mbiemri", "Mbiemri është i detyrueshëm.");
    vendosKlaseFushe(mbiemri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-mbiemri");
    vendosKlaseFushe(mbiemri, true);
  }

  var email = document.getElementById("email");
  if (email.value.trim() === "") {
    shfaqGabim("gabim-email", "Email-i është i detyrueshëm.");
    vendosKlaseFushe(email, false);
    kaGabime = true;
  } else if (!emailEsakte(email.value.trim())) {
    shfaqGabim("gabim-email", "Email-i nuk është i vlefshëm.");
    vendosKlaseFushe(email, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-email");
    vendosKlaseFushe(email, true);
  }

  var celulari = document.getElementById("celulari");
  if (celulari.value.trim() !== "" && !celulariEsakte(celulari.value.trim())) {
    shfaqGabim("gabim-celulari", "Formati i gabuar. Shkruaj si: 069-1234567");
    vendosKlaseFushe(celulari, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-celulari");
    if (celulari.value.trim() !== "") vendosKlaseFushe(celulari, true);
  }

  if (kaGabime) return;

  // Përditësojmë emrin dhe email-in në kokën e profilit (DOM)
  document.getElementById("emri-display").textContent = emri.value + " " + mbiemri.value;
  document.getElementById("email-display").textContent = email.value;

  // Shfaqim mesazhin e suksesit
  var sukses = document.getElementById("sukses-te-dhenat");
  sukses.style.display = "block";
  setTimeout(function() {
    sukses.style.display = "none";
  }, 3000);
});

// FORMA 2: Adresa e re
var formaAdresa = document.getElementById("forma-adresa");
var pastroAdresa = document.getElementById("pastro-adresa");

formaAdresa.addEventListener("submit", function(event) {
  event.preventDefault();

  var kaGabime = false;

  var adresaEmri = document.getElementById("adresa-emri");
  if (adresaEmri.value.trim() === "") {
    shfaqGabim("gabim-adresa-emri", "Emri është i detyrueshëm.");
    vendosKlaseFushe(adresaEmri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-adresa-emri");
    vendosKlaseFushe(adresaEmri, true);
  }

  var adresaMbiemri = document.getElementById("adresa-mbiemri");
  if (adresaMbiemri.value.trim() === "") {
    shfaqGabim("gabim-adresa-mbiemri", "Mbiemri është i detyrueshëm.");
    vendosKlaseFushe(adresaMbiemri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-adresa-mbiemri");
    vendosKlaseFushe(adresaMbiemri, true);
  }

  var rruga = document.getElementById("rruga");
  if (rruga.value.trim() === "") {
    shfaqGabim("gabim-rruga", "Adresa është e detyrueshme.");
    vendosKlaseFushe(rruga, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-rruga");
    vendosKlaseFushe(rruga, true);
  }

  var qyteti = document.getElementById("qyteti");
  if (qyteti.value.trim() === "") {
    shfaqGabim("gabim-qyteti", "Qyteti është i detyrueshëm.");
    vendosKlaseFushe(qyteti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-qyteti");
    vendosKlaseFushe(qyteti, true);
  }

  var kodiPostar = document.getElementById("kodi-postar");
  if (kodiPostar.value === "") {
    shfaqGabim("gabim-kodi-postar", "Kodi postar është i detyrueshëm.");
    vendosKlaseFushe(kodiPostar, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-kodi-postar");
    vendosKlaseFushe(kodiPostar, true);
  }

  var shteti = document.getElementById("shteti-adresa");
  if (shteti.value === "") {
    shfaqGabim("gabim-shteti-adresa", "Zgjidh shtetin.");
    vendosKlaseFushe(shteti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-shteti-adresa");
    vendosKlaseFushe(shteti, true);
  }

  if (kaGabime) return;

  var sukses = document.getElementById("sukses-adresa");
  sukses.style.display = "block";
  setTimeout(function() {
    sukses.style.display = "none";
  }, 3000);

  formaAdresa.reset();
  var inputet = formaAdresa.querySelectorAll("input, select");
  for (var i = 0; i < inputet.length; i++) {
    inputet[i].classList.remove("e-sakte", "ka-gabim");
  }
});

pastroAdresa.addEventListener("click", function() {
  formaAdresa.reset();
  var gabimet = formaAdresa.querySelectorAll(".gabim");
  for (var i = 0; i < gabimet.length; i++) {
    gabimet[i].textContent = "";
  }
  var inputet = formaAdresa.querySelectorAll("input, select");
  for (var j = 0; j < inputet.length; j++) {
    inputet[j].classList.remove("e-sakte", "ka-gabim");
  }
});

// FORMA 3: Ndrysho fjalëkalimin
var formaFjalekalimi = document.getElementById("forma-fjalekalimi");

formaFjalekalimi.addEventListener("submit", function(event) {
  event.preventDefault();

  var kaGabime = false;

  var fjaleVjetr = document.getElementById("fjalekalimi-vjetr");
  if (fjaleVjetr.value === "") {
    shfaqGabim("gabim-fjalekalimi-vjetr", "Fjalëkalimi aktual është i detyrueshëm.");
    vendosKlaseFushe(fjaleVjetr, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-fjalekalimi-vjetr");
    vendosKlaseFushe(fjaleVjetr, true);
  }

  var fjaleRi = document.getElementById("fjalekalimi-ri");
  if (fjaleRi.value === "") {
    shfaqGabim("gabim-fjalekalimi-ri", "Fjalëkalimi i ri është i detyrueshëm.");
    vendosKlaseFushe(fjaleRi, false);
    kaGabime = true;
  } else if (fjaleRi.value.length < 6) {
    shfaqGabim("gabim-fjalekalimi-ri", "Fjalëkalimi duhet të ketë minimumi 6 karaktere.");
    vendosKlaseFushe(fjaleRi, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-fjalekalimi-ri");
    vendosKlaseFushe(fjaleRi, true);
  }

  var konfirmo = document.getElementById("konfirmo-fjalekalimi");
  if (konfirmo.value === "") {
    shfaqGabim("gabim-konfirmo", "Konfirmo fjalëkalimin.");
    vendosKlaseFushe(konfirmo, false);
    kaGabime = true;
  } else if (konfirmo.value !== fjaleRi.value) {
    shfaqGabim("gabim-konfirmo", "Fjalëkalimet nuk përputhen.");
    vendosKlaseFushe(konfirmo, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-konfirmo");
    vendosKlaseFushe(konfirmo, true);
  }

  if (kaGabime) return;

  var sukses = document.getElementById("sukses-fjalekalimi");
  sukses.style.display = "block";
  setTimeout(function() {
    sukses.style.display = "none";
  }, 3000);

  formaFjalekalimi.reset();
  var inputet = formaFjalekalimi.querySelectorAll("input");
  for (var i = 0; i < inputet.length; i++) {
    inputet[i].classList.remove("e-sakte", "ka-gabim");
  }
});

// NDRYSHIMI I FOTOS SE PROFILIT (W3C File API)
var inputFoto = document.getElementById("ndrysho-foto");
var imgProfili = document.getElementById("foto-profili");

inputFoto.addEventListener("change", function(event) {
  var skedari = event.target.files[0];

  if (skedari) {
    var lexues = new FileReader();

    lexues.onload = function(e) {
      imgProfili.src = e.target.result;
    };

    lexues.readAsDataURL(skedari);
  }
});
