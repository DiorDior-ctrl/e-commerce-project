document.addEventListener("DOMContentLoaded", () => {
    // 1. Lexo ID-në nga URL-ja (linku lart)
    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = urlParams.get('id');

    // Nëse ka një ID në URL, ekzekuto kodin
    if (productIdParam !== null) {
        const productId = parseInt(productIdParam);
        
        // 2. Gjej produktin tek baza e të dhënave (products.js)
        const product = products.find(p => p.id === productId);

        if (product) {
            // 3. Kap të gjitha elementet në HTML që duhet të ndryshojnë
            const imgElement = document.querySelector('.product-gallery img');
            const categoryElement = document.querySelector('.product-category-label');
            const titleElement = document.querySelector('.product-details h1');
            const priceElement = document.querySelector('.product-details .price');
            const descElement = document.querySelector('.product-details .description');
            const breadcrumbSpan = document.querySelector('.breadcrumb span');

            // 4. Zëvendëso tekstet e vjetra (Kufje Wireless) me të rejat
            if (imgElement) {
                imgElement.src = product.imgSrc;
                imgElement.alt = product.tittle;
            }
            if (categoryElement) categoryElement.textContent = product.type;
            if (titleElement) titleElement.textContent = product.tittle;
            if (priceElement) priceElement.textContent = `${product.price.toFixed(2)} €`;
            if (descElement) descElement.textContent = product.description;
            if (breadcrumbSpan) breadcrumbSpan.textContent = product.tittle;

            // 5. Funksionaliteti i butonit "Shto në Shportë"
            const cartForm = document.querySelector('.add-to-cart-box');
            if (cartForm) {
                cartForm.addEventListener('submit', function(event) {
                    event.preventDefault(); 
                    const quantityInput = cartForm.querySelector('input[name="quantity"]');
                    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                    addToCart(product.id, quantity);
                });
            }
            
            // 6. Gjenero 3 "Produkte të Tjera" rastësore në fund të faqes
            const relatedContainer = document.getElementById('related-products-container');
            if (relatedContainer) {
                const otherProducts = products.filter(p => p.id !== product.id);
                const shuffled = otherProducts.sort(() => 0.5 - Math.random());
                const selectedRelated = shuffled.slice(0, 3);
                
                relatedContainer.innerHTML = ''; 
                selectedRelated.forEach(relProduct => {
                    relatedContainer.innerHTML += `
                        <article class="related-card">
                            <img src="${relProduct.imgSrc}" alt="${relProduct.tittle}">
                            <div class="related-card-body">
                                <h3>${relProduct.tittle}</h3>
                                <p class="price">${relProduct.price.toFixed(2)} €</p>
                                <a href="single-product-Erisa.html?id=${relProduct.id}" class="btn btn-sm">Shiko Detajet</a>
                            </div>
                        </article>
                    `;
                });
            }
        }
    }
});