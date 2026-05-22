



document.addEventListener("DOMContentLoaded", () => {
    // 1. Lexo ID-në nga URL-ja
    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = urlParams.get('id');

    // Nëse ka një ID në URL, gjej produktin dhe ndrysho HTML-në
    if (productIdParam !== null) {
        const productId = parseInt(productIdParam);
        const product = products.find(p => p.id === productId);

        if (product) {
            // 2. Kap elementet në HTML
            const imgElement = document.querySelector('.product-gallery img');
            const categoryElement = document.querySelector('.product-category-label');
            const titleElement = document.querySelector('.product-details h1');
            const priceElement = document.querySelector('.product-details .price');
            const descElement = document.querySelector('.product-details .description');
            const breadcrumbSpan = document.querySelector('.breadcrumb span');

            // 3. Përditëso të dhënat në faqe
            if(imgElement) {
                imgElement.src = product.imgSrc;
                imgElement.alt = product.tittle;
            }
            if(categoryElement) categoryElement.textContent = product.type;
            if(titleElement) titleElement.textContent = product.tittle;
            if(priceElement) priceElement.textContent = `${product.price.toFixed(2)} €`;
            if(descElement) descElement.textContent = product.description;
            if(breadcrumbSpan) breadcrumbSpan.textContent = product.tittle;

            // --- KODI I SHPORTËS TANI ËSHTË BRENDA DHE E NJEH PRODUKTIN ---
            const cartForm = document.querySelector('.add-to-cart-box');
            if (cartForm) {
                cartForm.addEventListener('submit', function(event) {
                    // Ndalon formën të bëjë refresh faqen
                    event.preventDefault(); 
                    
                    // Lexon sasinë e zgjedhur nga klienti
                    const quantityInput = cartForm.querySelector('input[name="quantity"]');
                    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                    
                    // Shton produktin në shportë duke dërguar ID-në dhe Sasinë
                    addToCart(product.id, quantity);
                });
            }
            // ---------------------------------------------------------------

        } else {
            document.querySelector('.product-single-wrapper').innerHTML = "<h1>Produkti nuk u gjet!</h1>";
        }
    }
});


