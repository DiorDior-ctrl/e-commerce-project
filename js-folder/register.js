// register.js — Validimi i Formularit te Regjistrimit

// Marrim referencen e formularit dhe elementeve kryesore
var forma = document.getElementById("forma-regjistrimit");
var butonPastro = document.getElementById("butoni-pastro");
var suksesiDiv = document.getElementById("sukses-mesazhi");


// FUNKSIONI QE SHFAQ GABIMIN NË EKRAN
function shfaqGabim(idGabimit, mesazhi) {
  var elementGabimit = document.getElementById(idGabimit);
  elementGabimit.textContent = mesazhi;
}


// FUNKSIONI QE FSHIN GABIMIN NGA EKRANI
function fshijGabim(idGabimit) {
  var elementGabimit = document.getElementById(idGabimit);
  elementGabimit.textContent = "";
}


// FUNKSIONI QE SHTON OSE HEQË KLASAT E VALIDIMIT
function vendosKlaseFushe(fushe, eshteeSakte) {
  if (eshteeSakte) {
    fushe.classList.remove("ka-gabim");
    fushe.classList.add("e-sakte");
  } else {
    fushe.classList.remove("e-sakte");
    fushe.classList.add("ka-gabim");
  }
}


// VALIDIMI I EMAIL-IT me RegExp
// Rregulli: karaktere@karaktere.minimumi2karaktere
// Shembull i sakte: emri@domain.com

function emailEsakte(email) {
  // [^\s@]+ = karaktere para @ (jo hapësirë, jo @)
  // @       = karakteri @
  // [^\s@]+ = karaktere pas @ (domeni)
  // \.      = pika e detyrushme
  // [^\s@]{2,} = minimumi 2 karaktere pas pikës (.com, .al etj)
  var formati = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return formati.test(email);
}


// VALIDIMI I NUMRIT TE CELULARIT
// Formati i kerkuar: XXX-XXXXXXX (p.sh. 069-1234567)

function celulariEsakte(numri) {
  // Kontrollojme me RegExp - 3 shifra, vize, 7 shifra
  var formati = /^\d{3}-\d{7}$/;
  return formati.test(numri);
}


// FUNKSIONI KRYESOR I VALIDIMIT — ekzekutohet kur dërgojme formen
function validoFormen(event) {
  // Ndalojme dergimin default të formularit
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

  // -- 5. DATA E LINDJES --
  var datalindjes = document.getElementById("datalindjes");
  if (datalindjes.value === "") {
    shfaqGabim("gabim-datalindjes", "Data e lindjes është e detyrueshme.");
    vendosKlaseFushe(datalindjes, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-datalindjes");
    vendosKlaseFushe(datalindjes, true);
  }

  // -- 6. GJINIA (radio buttons) --
  // Perdorim vektorin querySelectorAll per te kapur te gjitha radio butonat
  var gjiniaRadiot = document.querySelectorAll("input[name='gjinia']");
  var gjiniaZgjedhur = false;

  for (var i = 0; i < gjiniaRadiot.length; i++) {
    if (gjiniaRadiot[i].checked) {
      gjiniaZgjedhur = true;
      break;
    }
  }

  if (!gjiniaZgjedhur) {
    shfaqGabim("gabim-gjinia", "Duhet të zgjedhësh gjininë.");
    kaGabime = true;
  } else {
    fshijGabim("gabim-gjinia");
  }

  // -- 7. ADRESA --
  var adresa = document.getElementById("adresa");
  if (adresa.value.trim() === "") {
    shfaqGabim("gabim-adresa", "Adresa është e detyrueshme.");
    vendosKlaseFushe(adresa, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-adresa");
    vendosKlaseFushe(adresa, true);
  }

  // -- 8. SHTETI (select) --
  var shteti = document.getElementById("shteti");
  if (shteti.value === "") {
    shfaqGabim("gabim-shteti", "Duhet të zgjedhësh shtetin.");
    vendosKlaseFushe(shteti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-shteti");
    vendosKlaseFushe(shteti, true);
  }

  // -- 9. INTERESAT (checkboxes) --
  // Perdorim vektorin querySelectorAll per te kontrolluar te gjitha checkboxat
  var interesat = document.querySelectorAll("input[name='interesat']");
  var njeriZgjedhur = false;

  for (var j = 0; j < interesat.length; j++) {
    if (interesat[j].checked) {
      njeriZgjedhur = true;
      break;
    }
  }

  if (!njeriZgjedhur) {
    shfaqGabim("gabim-interesat", "Zgjidh të paktën një interes.");
    kaGabime = true;
  } else {
    fshijGabim("gabim-interesat");
  }

  // -- 10. FJALEKALIMI --
  var fjalekalimi = document.getElementById("fjalekalimi");
  if (fjalekalimi.value === "") {
    shfaqGabim("gabim-fjalekalimi", "Fjalëkalimi është i detyrueshëm.");
    vendosKlaseFushe(fjalekalimi, false);
    kaGabime = true;
  } else if (fjalekalimi.value.length < 6) {
    shfaqGabim("gabim-fjalekalimi", "Fjalëkalimi duhet të ketë minimumi 6 karaktere.");
    vendosKlaseFushe(fjalekalimi, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-fjalekalimi");
    vendosKlaseFushe(fjalekalimi, true);
  }

  // -- 11. KONFIRMIMI I FJALEKALIMIT --
  var konfirmo = document.getElementById("konfirmo-fjalekalimi");
  if (konfirmo.value === "") {
    shfaqGabim("gabim-konfirmo", "Konfirmo fjalëkalimin.");
    vendosKlaseFushe(konfirmo, false);
    kaGabime = true;
  } else if (konfirmo.value !== fjalekalimi.value) {
    shfaqGabim("gabim-konfirmo", "Fjalëkalimet nuk përputhen.");
    vendosKlaseFushe(konfirmo, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-konfirmo");
    vendosKlaseFushe(konfirmo, true);
  }

  // -- 12. NUMRI I POROSIVE --
  var porosiMujore = document.getElementById("porosi-mujore");
  if (porosiMujore.value === "") {
    shfaqGabim("gabim-porosi", "Ky fushë është e detyrueshme.");
    vendosKlaseFushe(porosiMujore, false);
    kaGabime = true;
  } else if (porosiMujore.value < 1 || porosiMujore.value > 100) {
    shfaqGabim("gabim-porosi", "Numri duhet të jetë ndërmjet 1 dhe 100.");
    vendosKlaseFushe(porosiMujore, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-porosi");
    vendosKlaseFushe(porosiMujore, true);
  }

  // Nese ka gabime ndalojme ketu
  if (kaGabime) {
    return;
  }


  // NESE NUK KA GABIME — shfaqim informacionin me DOM
  // Shtojme elementin e suksesit ne faqe (kerkese nr. 9)
  var fotoInput = document.getElementById("foto-profili");
  // RREGULLIM: suksesiFoto dhe suksesiInfo merren nga DOM
  var suksesiFoto = document.getElementById("sukses-foto");
  var suksesiInfo = document.getElementById("sukses-info");

  // Marrim gjinine e zgjedhur
  var gjiniaTekst = "";
  for (var k = 0; k < gjiniaRadiot.length; k++) {
    if (gjiniaRadiot[k].checked) {
      gjiniaTekst = gjiniaRadiot[k].value;
      break;
    }
  }

  // Nese ka foto të ngarkuar, e shfaqim me FileReader (W3C File API)
  // RREGULLIM: kontrollohet files[0] dhe src vendoset nga FileReader;
  //            nese nuk ka foto, imazhi fshihet me display:none
  if (fotoInput.files && fotoInput.files.length > 0) {
    var lexues = new FileReader();

    lexues.onload = function(e) {
      suksesiFoto.src = e.target.result;
      suksesiFoto.style.display = "block";
    };

    lexues.readAsDataURL(fotoInput.files[0]);
  } else {
    // Asnje foto e ngarkuar — fshijme imazhin
    suksesiFoto.src = "#";
    suksesiFoto.style.display = "none";
  }

  // Ndertojme dhe shfaqim informacionin me DOM (kerkese nr. 9)
  suksesiInfo.innerHTML =
    "<strong>" + emri.value + " " + mbiemri.value + "</strong><br />" +
    "Email: " + email.value + "<br />" +
    "Gjinia: " + gjiniaTekst + "<br />" +
    "Shteti: " + shteti.options[shteti.selectedIndex].text;

  // Shfaqim kutine e suksesit
  suksesiDiv.style.display = "block";

  // Scroll lart qe ta shohe perdoruesi mesazhin
  suksesiDiv.scrollIntoView({ behavior: "smooth" });

  // Fshijme formen pasi u dërgua
  forma.style.display = "none";
}


// BUTONI PASTRO — fshin te gjitha fushat dhe gabimet
function pastroFormen() {
  forma.reset();

  // Fshijme te gjitha mesazhet e gabimit
  var gabimet = document.querySelectorAll(".gabim");
  for (var i = 0; i < gabimet.length; i++) {
    gabimet[i].textContent = "";
  }

  // Heqim klasat e validimit nga te gjitha inputet
  var inputet = document.querySelectorAll("input, select");
  for (var j = 0; j < inputet.length; j++) {
    inputet[j].classList.remove("ka-gabim", "e-sakte");
  }
}


// LIDHJA E EVENT LISTENERS
forma.addEventListener("submit", validoFormen);
butonPastro.addEventListener("click", pastroFormen);