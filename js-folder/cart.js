let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, qty = 1) {

    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    const sasia = parseInt(qty);
    if (existing) {
        existing.quantity += sasia; 
    } else {
        cart.push({ ...product, quantity: sasia }); 
    }

    saveCart();
    updateCartCounter();

showToast(`Sukses: ${sasia}x "${product.tittle}" u shtuan në shportë!`);
}

function showToast(message) {
    // 1. Krijojmë një element të ri (div) në HTML
    const toast = document.createElement('div');
    toast.classList.add('toast-notification');
    toast.innerText = message;

    // 2. E shtojmë në fund të faqes (në body)
    document.body.appendChild(toast);

    // 3. I japim pak kohë që të shfaqet me animacion
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 4. E heqim automatikisht pas 3 sekondash (3000 milisekonda)
    setTimeout(() => {
        toast.classList.remove('show');
        // E fshijmë plotësisht nga HTML pas animacionit të mbylljes
        setTimeout(() => toast.remove(), 300); 
    }, 3000);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCounter();
}

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    renderCart();
    updateCartCounter();
}

function updateCartCounter() {
    const counter = document.getElementById("cart-counter");
    if (!counter) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = total;
    counter.style.display = total > 0 ? "flex" : "none";
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartEmpty = document.getElementById("cart-empty");
    const cartSummary = document.getElementById("cart-summary");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartEmpty.classList.add("visible");
        cartSummary.style.display = "none";
        return;
    }

    cartEmpty.classList.remove("visible");
    cartSummary.style.display = "block";

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-card">
                <img src="${item.imgSrc}" alt="${item.tittle}">
                <div class="cart-card-info">
                    <h3>${item.tittle}</h3>
                    <p>${item.type}</p>
                    <p class="cart-card-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="cart-card-actions">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Hiq ✕</button>
                    </div>
                </div>
            </div>
        `;
    });

    calculateTotals();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

updateCartCounter();
renderCart();


