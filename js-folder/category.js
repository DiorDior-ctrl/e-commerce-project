document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort");
    const filterBtn = document.getElementById("apply-filters-btn");

    // 1. Funksioni që vizaton produktet në ekran
    function renderProducts(productsToRender) {
        const allSections = document.querySelectorAll(".category-section");
        
        // Pastrojmë HTML-në dhe fshehim seksionet para se t'i rimbushim
        allSections.forEach(section => {
            const container = section.querySelector(".category-products");
            if (container) container.innerHTML = "";
            section.style.display = "none"; 
        });

        const categories = [...new Set(productsToRender.map(p => p.type))];

        categories.forEach(category => {
            const section = document.querySelector(`[data-category="${category}"]`);
            if (!section) return;

            const container = section.querySelector(".category-products");
            const filtered = productsToRender.filter(p => p.type === category);

            if (filtered.length > 0) {
                section.style.display = "block"; // Shfaqim seksionin
                
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
            }
        });

        // Përditësojmë tekstin "Duke shfaqur X produkte"
        const toolbarResults = document.querySelector(".toolbar-results");
        if (toolbarResults) {
            toolbarResults.textContent = `Duke shfaqur ${productsToRender.length} produkte`;
        }
    }

    // 2. Funksioni që filtron dhe rendit
    function applyFiltersAndSort() {
        // Kontrollojmë nëse produktet ekzistojnë
        if (typeof products === 'undefined') {
            console.error("Produktet nuk u gjetën!");
            return;
        }

        let result = [...products]; 

        // FILTRIMI SIPAS KATEGORISË
        const activeCategories = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
        
        if (activeCategories.length > 0) {
            result = result.filter(p => activeCategories.includes(p.type.toLowerCase()));
        } else {
            result = []; 
        }

        // RENDITJA SIPAS ÇMIMIT DHE TË REJAVE
        const sortValue = sortSelect.value;
        if (sortValue === "Çmimi: Ulët-Lart") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortValue === "Çmimi: Lart-Ulët") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortValue === "Të rejat") {
            result.sort((a, b) => b.id - a.id); 
        }

        renderProducts(result);
    }

    // 3. Lidhim butonin dhe renditjen
    if (filterBtn) {
        filterBtn.addEventListener("click", applyFiltersAndSort);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", applyFiltersAndSort);
    }

    // 4. Shfaq të gjitha produktet herën e parë
    if (typeof products !== 'undefined') {
        renderProducts(products);
    }
});