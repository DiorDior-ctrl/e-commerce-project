// render-checkout.js — Shfaq produktet e shportës në faqen e Checkout
// Shënim: variabla 'cart' lexohet nga localStorage, e ndarë me cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

function renderCheckout() {
    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Shporta është bosh</p>";
        totalEl.textContent = "0 Lekë";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        checkoutItems.innerHTML += `
            <li class="produkt-item">
                <img src="${item.imgSrc}" width="60">
                <div>
                    <h4>${item.tittle}</h4>
                    <p>Sasia: ${item.quantity}</p>
                    <p>${item.price * item.quantity}</p>
                </div>
            </li>
        `;

        total += item.price * item.quantity;
    });
    total += 5;

    totalEl.textContent = `${total.toFixed(2)} `;
}

renderCheckout();