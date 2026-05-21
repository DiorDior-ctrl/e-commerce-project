const productsContainer = document.querySelector(".products-container");

products.forEach((product) => {
    productsContainer.innerHTML += `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.imgSrc}" alt="${product.tittle}">
            </div>
            <div class="product-info">
                <h3>${product.tittle}</h3>
                <p class="product-type">${product.type}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="buy-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </article>
    `;
});