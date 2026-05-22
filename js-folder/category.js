const categories = [...new Set(products.map(p => p.type))];

categories.forEach(category => {
    const section = document.querySelector(`[data-category="${category}"]`);
    if (!section) return;

    const container = section.querySelector(".category-products");

    const filtered = products.filter(p => p.type === category);

    filtered.forEach(product => {
        container.innerHTML += `
            <article class="product-card">
                <div class="product-card__image-wrapper">
                    <a href="single-product-Erisa.html?id=${product.id}">
                        <img src="${product.imgSrc}" alt="${product.tittle}">
                    </a>
                </div>
                <div class="product-card__body">
                    <span class="product-card__category">${product.type}</span>
                    <h3 class="product-card__name">
                        <a href="single-product-Erisa.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                            ${product.tittle}
                        </a>
                    </h3>
                </div>
                <div class="product-card__footer">
                    <div class="product-card__price">$${product.price.toFixed(2)}</div>
                    <button class="btn btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </article>
        `;
    });
});