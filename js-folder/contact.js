// contact.js — Validimi i Formularit të Kontaktit

var forma = document.getElementById("forma-kontaktit");
var butonPastro = document.getElementById("butoni-pastro");
var suksesiDiv = document.getElementById("sukses-mesazhi");
var suksesiInfo = document.getElementById("sukses-info");

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

// Validimi i celularit me RegExp — formati: XXX-XXXXXXX
function celulariEsakte(numri) {
  var formati = /^\d{3}-\d{7}$/;
  return formati.test(numri);
}

// YJET INTERAKTIVE
var yjet = document.querySelectorAll(".yja");
var inputVleresimi = document.getElementById("vleresimi");
var vleraYjeve = 0;

for (var i = 0; i < yjet.length; i++) {
  // Kur kalojmë me mouse sipër yjeve — ndriçojmë
  yjet[i].addEventListener("mouseover", function() {
    var vlera = parseInt(this.getAttribute("data-vlera"));
    ndricoYjet(vlera);
  });

  // Kur largohemi nga yjet — kthehemi te vlera e zgjedhur
  yjet[i].addEventListener("mouseout", function() {
    ndricoYjet(vleraYjeve);
  });

  // Kur klikojmë — ruajmë vlerën
  yjet[i].addEventListener("click", function() {
    vleraYjeve = parseInt(this.getAttribute("data-vlera"));
    inputVleresimi.value = vleraYjeve;
    ndricoYjet(vleraYjeve);
    fshijGabim("gabim-vleresimi");
  });
}

// Funksioni që ndriçon yjet deri në vlerën e dhënë
function ndricoYjet(vlera) {
  for (var j = 0; j < yjet.length; j++) {
    if (parseInt(yjet[j].getAttribute("data-vlera")) <= vlera) {
      yjet[j].classList.add("aktive");
    } else {
      yjet[j].classList.remove("aktive");
    }
  }
}

// VALIDIMI KRYESOR
function validoFormen(event) {
  event.preventDefault();

  var kaGabime = false;

  // -- 1. EMRI --
  var emri = document.getElementById("emri");
  if (emri.value.trim() === "") {
    shfaqGabim("gabim-emri", "Emri është i detyrueshëm.");
    vendosKlaseFushe(emri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-emri");
    vendosKlaseFushe(emri, true);
  }

  // -- 2. MBIEMRI --
  var mbiemri = document.getElementById("mbiemri");
  if (mbiemri.value.trim() === "") {
    shfaqGabim("gabim-mbiemri", "Mbiemri është i detyrueshëm.");
    vendosKlaseFushe(mbiemri, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-mbiemri");
    vendosKlaseFushe(mbiemri, true);
  }

  // -- 3. EMAIL --
  var email = document.getElementById("email");
  if (email.value.trim() === "") {
    shfaqGabim("gabim-email", "Email-i është i detyrueshëm.");
    vendosKlaseFushe(email, false);
    kaGabime = true;
  } else if (!emailEsakte(email.value.trim())) {
    shfaqGabim("gabim-email", "Email-i nuk është i vlefshëm. Shembull: emri@domain.com");
    vendosKlaseFushe(email, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-email");
    vendosKlaseFushe(email, true);
  }

  // -- 4. CELULARI --
  var celulari = document.getElementById("celulari");
  if (celulari.value.trim() === "") {
    shfaqGabim("gabim-celulari", "Numri i celularit është i detyrueshëm.");
    vendosKlaseFushe(celulari, false);
    kaGabime = true;
  } else if (!celulariEsakte(celulari.value.trim())) {
    shfaqGabim("gabim-celulari", "Formati i gabuar. Shkruaj si: 069-1234567");
    vendosKlaseFushe(celulari, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-celulari");
    vendosKlaseFushe(celulari, true);
  }

  // -- 5. SUBJEKTI --
  var subjekti = document.getElementById("subjekti");
  if (subjekti.value === "") {
    shfaqGabim("gabim-subjekti", "Zgjidh subjektin.");
    vendosKlaseFushe(subjekti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-subjekti");
    vendosKlaseFushe(subjekti, true);
  }

  // -- 6. MESAZHI --
  var mesazhi = document.getElementById("mesazhi");
  if (mesazhi.value.trim() === "") {
    shfaqGabim("gabim-mesazhi", "Mesazhi është i detyrueshëm.");
    vendosKlaseFushe(mesazhi, false);
    kaGabime = true;
  } else if (mesazhi.value.trim().length < 20) {
    shfaqGabim("gabim-mesazhi", "Mesazhi duhet të ketë minimumi 20 karaktere.");
    vendosKlaseFushe(mesazhi, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-mesazhi");
    vendosKlaseFushe(mesazhi, true);
  }

  // -- 7. VLERESIMI ME YJE --
  if (vleraYjeve === 0) {
    shfaqGabim("gabim-vleresimi", "Zgjidh vlerësimin.");
    kaGabime = true;
  } else {
    fshijGabim("gabim-vleresimi");
  }

  if (kaGabime) {
    return;
  }

  // SUKSES — shfaqim informacionin me DOM
  var yjetTekst = "";
  for (var k = 0; k < vleraYjeve; k++) {
    yjetTekst += "★";
  }

  suksesiInfo.innerHTML =
    "<strong>Emri:</strong> " + emri.value + " " + mbiemri.value + "<br />" +
    "<strong>Email:</strong> " + email.value + "<br />" +
    "<strong>Subjekti:</strong> " + subjekti.options[subjekti.selectedIndex].text + "<br />" +
    "<strong>Vlerësimi:</strong> " + yjetTekst + "<br />" +
    "<strong>Mesazhi:</strong> " + mesazhi.value;

  suksesiDiv.style.display = "block";
  suksesiDiv.scrollIntoView({ behavior: "smooth" });
  forma.style.display = "none";
}

// BUTONI PASTRO
function pastroFormen() {
  forma.reset();

  var gabimet = document.querySelectorAll(".gabim");
  for (var i = 0; i < gabimet.length; i++) {
    gabimet[i].textContent = "";
  }

  var inputet = document.querySelectorAll("input, select, textarea");
  for (var j = 0; j < inputet.length; j++) {
    inputet[j].classList.remove("ka-gabim", "e-sakte");
  }

  // Kthejme yjet ne gjendjen fillestare
  vleraYjeve = 0;
  inputVleresimi.value = "";
  ndricoYjet(0);
}

// LIDHJA E EVENT LISTENERS
forma.addEventListener("submit", validoFormen);
butonPastro.addEventListener("click", pastroFormen);
