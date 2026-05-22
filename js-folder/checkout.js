// checkout.js — Validimi dhe Drag & Drop për Checkout

// Referencat e elementeve kryesore
var forma = document.getElementById("forma-checkout");
var butonPastro = document.getElementById("butoni-pastro");
var butonKupon = document.getElementById("butoni-kupon");
var suksesiDiv = document.getElementById("sukses-mesazhi");
var suksesiInfo = document.getElementById("sukses-info");

// Referencat për drag and drop
var zonaeDrop = document.getElementById("zona-drop");
var inputSkedar = document.getElementById("input-skedar");
var listaSkedareve = document.getElementById("lista-skedareve");

// Totali bazë i porosisë
var totaliBaze = 20500;
var totaliFinal = totaliBaze;


// FUNKSIONET E VALIDIMIT (te njejta me register.js)
function shfaqGabim(idGabimit, mesazhi) {
  var el = document.getElementById(idGabimit);
  el.textContent = mesazhi;
}

function fshijGabim(idGabimit) {
  var el = document.getElementById(idGabimit);
  el.textContent = "";
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

// Validimi i numrit të celularit me RegExp — formati: XXX-XXXXXXX
function celulariEsakte(numri) {
  var formati = /^\d{3}-\d{7}$/;
  return formati.test(numri);
}

// Validimi i numrit të kartës — formati: XXXX-XXXX-XXXX-XXXX
function karteEsakte(numri) {
  var formati = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  return formati.test(numri);
}


// SHFAQJA E DETAJEVE TË KARTËS
// Kur zgjedhim "Karte" shfaqen fushat për nr. kartë, skadencë, cvv
var radioPagesa = document.querySelectorAll("input[name='pagesa']");
var detajetKarte = document.getElementById("detajet-karte");

for (var i = 0; i < radioPagesa.length; i++) {
  radioPagesa[i].addEventListener("change", function() {
    if (this.value === "kartë") {
      detajetKarte.style.display = "block";
    } else {
      detajetKarte.style.display = "none";
    }
  });
}


// KUPONI I ZBRITJES
// Kodet e vlefshme dhe përqindja e zbritjes
var kuponet = {
  "LUXE10": 10,
  "LUXE20": 20,
  "WELCOME": 15
};

butonKupon.addEventListener("click", function() {
  var kodiKuponit = document.getElementById("kupon").value.trim().toUpperCase();
  var mesazhKupon = document.getElementById("mesazh-kupon");
  var rreshtiZbritjes = document.getElementById("rreshti-zbritjes");
  var vleraZbritjes = document.getElementById("vlera-zbritjes");
  var totaliEl = document.getElementById("totali-final");

  if (kodiKuponit === "") {
    mesazhKupon.textContent = "Shkruaj një kod kuponi.";
    mesazhKupon.className = "mesazh-kupon ka-gabim";
    return;
  }

  if (kuponet[kodiKuponit] !== undefined) {
    // Kuponi eshte i vlefshem — llogarisim zbritjen
    var perqindja = kuponet[kodiKuponit];
    var zbritja = Math.round(totaliBaze * perqindja / 100);
    totaliFinal = totaliBaze - zbritja;

    mesazhKupon.textContent = "Kuponi u aplikua! Zbritje " + perqindja + "%";
    mesazhKupon.className = "mesazh-kupon i-sakte";

    rreshtiZbritjes.style.display = "flex";
    vleraZbritjes.textContent = "- " + zbritja + " Lekë";
    totaliEl.textContent = totaliFinal + " Lekë";
  } else {
    // Kuponi nuk ekziston
    mesazhKupon.textContent = "Kodi i kuponit nuk është i vlefshëm.";
    mesazhKupon.className = "mesazh-kupon ka-gabim";

    rreshtiZbritjes.style.display = "none";
    totaliFinal = totaliBaze;
    totaliEl.textContent = totaliBaze + " Lekë";
  }
});

// DRAG AND DROP — W3C File API
// Bazuar te teknika nga referenca e projektit

// Kur skedari kalon siper zones — i ndryshojme stilin
zonaeDrop.addEventListener("dragover", function(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  zonaeDrop.classList.add("aktive");
});

// Kur skedari largohet nga zona
zonaeDrop.addEventListener("dragleave", function() {
  zonaeDrop.classList.remove("aktive");
});

// Kur skedari leshohet mbi zone
zonaeDrop.addEventListener("drop", function(event) {
  event.stopPropagation();
  event.preventDefault();
  zonaeDrop.classList.remove("aktive");

  var skedaretEZgjedhur = event.dataTransfer.files;
  procesojSkedarët(skedaretEZgjedhur);
});

// Kur zgjedhim skedar me butonin klasik
inputSkedar.addEventListener("change", function(event) {
  var skedaretEZgjedhur = event.target.files;
  procesojSkedarët(skedaretEZgjedhur);
});

// Funksioni që proceson skedarët e ngarkuar (File API)
function procesojSkedarët(skedarit) {
  for (var i = 0; i < skedarit.length; i++) {
    var skedari = skedarit[i];

    // Krijojme nje element të ri ne liste për çdo skedar
    var elementi = document.createElement("li");

    // Informacioni baze i skedarit
    var madhesia = (skedari.size / 1024).toFixed(1);
    elementi.innerHTML =
      "<span>&#128196; " + skedari.name + " (" + madhesia + " KB)</span>" +
      "<button type='button' onclick='hiqSkedarin(this)'>&#10005;</button>";

    listaSkedareve.appendChild(elementi);

    // Lexojme skedarin me FileReader (W3C File API)
    var lexues = new FileReader();
    lexues.onload = function(e) {
      // Skedari u lexua me sukses — mund te dergohej te serveri
      console.log("Skedari u ngarkua: " + e.target.result.substring(0, 50) + "...");
    };
    lexues.readAsDataURL(skedari);
  }
}

// Heqja e nje skedari nga lista
function hiqSkedarin(butoni) {
  butoni.parentElement.remove();
}


// VALIDIMI KRYESOR I FORMULARIT
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

  // -- 5. ADRESA --
  var adresa = document.getElementById("adresa");
  if (adresa.value.trim() === "") {
    shfaqGabim("gabim-adresa", "Adresa është e detyrueshme.");
    vendosKlaseFushe(adresa, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-adresa");
    vendosKlaseFushe(adresa, true);
  }

  // -- 6. QYTETI --
  var qyteti = document.getElementById("qyteti");
  if (qyteti.value.trim() === "") {
    shfaqGabim("gabim-qyteti", "Qyteti është i detyrueshëm.");
    vendosKlaseFushe(qyteti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-qyteti");
    vendosKlaseFushe(qyteti, true);
  }

  // -- 7. KODI POSTAR --
  var kodiPostar = document.getElementById("kodi-postar");
  if (kodiPostar.value === "") {
    shfaqGabim("gabim-kodi-postar", "Kodi postar është i detyrueshëm.");
    vendosKlaseFushe(kodiPostar, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-kodi-postar");
    vendosKlaseFushe(kodiPostar, true);
  }

  // -- 8. SHTETI --
  var shteti = document.getElementById("shteti");
  if (shteti.value === "") {
    shfaqGabim("gabim-shteti", "Duhet të zgjedhësh shtetin.");
    vendosKlaseFushe(shteti, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-shteti");
    vendosKlaseFushe(shteti, true);
  }

  // -- 9. DATA E DERGIMIT --
  var dataDergimit = document.getElementById("data-dergimit");
  if (dataDergimit.value === "") {
    shfaqGabim("gabim-data-dergimit", "Data e dërgimit është e detyrueshme.");
    vendosKlaseFushe(dataDergimit, false);
    kaGabime = true;
  } else {
    fshijGabim("gabim-data-dergimit");
    vendosKlaseFushe(dataDergimit, true);
  }

  // -- 10. METODA E PAGESES --
  var pagesMethods = document.querySelectorAll("input[name='pagesa']");
  var pagesaZgjedhur = false;
  var pagesaVlera = "";

  for (var j = 0; j < pagesMethods.length; j++) {
    if (pagesMethods[j].checked) {
      pagesaZgjedhur = true;
      pagesaVlera = pagesMethods[j].value;
      break;
    }
  }

  if (!pagesaZgjedhur) {
    shfaqGabim("gabim-pagesa", "Zgjidh metodën e pagesës.");
    kaGabime = true;
  } else {
    fshijGabim("gabim-pagesa");
  }

  // -- 11. DETAJET E KARTES (vetem nese eshte zgjedhur karte) --
  if (pagesaVlera === "kartë") {
    var nrKarte = document.getElementById("nr-karte");
    if (nrKarte.value.trim() === "") {
      shfaqGabim("gabim-nr-karte", "Numri i kartës është i detyrueshëm.");
      vendosKlaseFushe(nrKarte, false);
      kaGabime = true;
    } else if (!karteEsakte(nrKarte.value.trim())) {
      shfaqGabim("gabim-nr-karte", "Formati i gabuar. Shkruaj si: 1234-5678-9012-3456");
      vendosKlaseFushe(nrKarte, false);
      kaGabime = true;
    } else {
      fshijGabim("gabim-nr-karte");
      vendosKlaseFushe(nrKarte, true);
    }

    var skadenca = document.getElementById("skadenca");
    if (skadenca.value === "") {
      shfaqGabim("gabim-skadenca", "Skadenca është e detyrueshme.");
      vendosKlaseFushe(skadenca, false);
      kaGabime = true;
    } else {
      fshijGabim("gabim-skadenca");
      vendosKlaseFushe(skadenca, true);
    }

    var cvv = document.getElementById("cvv");
    if (cvv.value === "") {
      shfaqGabim("gabim-cvv", "CVV është i detyrueshëm.");
      vendosKlaseFushe(cvv, false);
      kaGabime = true;
    } else {
      fshijGabim("gabim-cvv");
      vendosKlaseFushe(cvv, true);
    }
  }

  // Nese ka gabime ndalojme
  if (kaGabime) {
    return;
  }


  // SUKSES — shfaqim informacionin me DOM
  suksesiInfo.innerHTML =
    "<strong>Emri:</strong> " + emri.value + " " + mbiemri.value + "<br />" +
    "<strong>Email:</strong> " + email.value + "<br />" +
    "<strong>Adresa:</strong> " + adresa.value + ", " + qyteti.value + "<br />" +
    "<strong>Shteti:</strong> " + shteti.options[shteti.selectedIndex].text + "<br />" +
    "<strong>Metoda e Pagesës:</strong> " + pagesaVlera + "<br />" +
    "<strong>Totali:</strong> " + totaliFinal + " Lekë";

  suksesiDiv.style.display = "block";
  suksesiDiv.scrollIntoView({ behavior: "smooth" });

  // Fshijme formën
  forma.style.display = "none";
}


// BUTONI PASTRO
function pastroFormen() {
  forma.reset();

  var gabimet = document.querySelectorAll(".gabim");
  for (var i = 0; i < gabimet.length; i++) {
    gabimet[i].textContent = "";
  }

  var inputet = document.querySelectorAll("input, select");
  for (var j = 0; j < inputet.length; j++) {
    inputet[j].classList.remove("ka-gabim", "e-sakte");
  }

  // Fshijme listen e skedareve
  listaSkedareve.innerHTML = "";

  // Fshijme mesazhin e kuponit dhe kthejme totalin
  document.getElementById("mesazh-kupon").textContent = "";
  document.getElementById("rreshti-zbritjes").style.display = "none";
  document.getElementById("totali-final").textContent = totaliBaze + " Lekë";
  totaliFinal = totaliBaze;

  // Fshehim detajet e kartes
  detajetKarte.style.display = "none";
}

// LIDHJA E EVENT LISTENERS
forma.addEventListener("submit", validoFormen);
butonPastro.addEventListener("click", pastroFormen);