let products = []
const productContainer = document.getElementById('product-container')
const productModal = document.getElementById('product-modal')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const categoryFilter = document.getElementById('category-filter')
const sortFilter = document.getElementById('sort-filter')
const clearSearch = document.getElementById('clear-search')

fetch('https://dummyjson.com/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        products = data.products
        displayProducts(products)
        createCategoryOptions(products)
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })

function createCategoryOptions(products) {
    const categories = [...new Set(products.map(product => product.category))]
    categories.forEach(category => {
        const option = document.createElement('option')
        option.value = category
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1)
        categoryFilter.appendChild(option)
    })
}

function displayProducts(products) {
    if (products.length === 0) {
        productContainer.innerHTML = '<p>There are no products to display.</p>'
        return
    }
    products.forEach(product => {
        const productCard = document.createElement('article')

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <p class="price">$${product.price}</p>
            <div class="card-actions">
                <button class="view-details">View Details</button>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `

        const viewDetails = productCard.querySelector('.view-details')

        viewDetails.addEventListener('click', function() {
            showProductModal(product)
        })

        productContainer.appendChild(productCard)
    })
}

function showProductModal(product) {
    productDetails = document.getElementById('product-details')

    productDetails.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p><strong>Rating:</strong> ${product.rating}</p>
        <p>${product.availabilityStatus}</p>
        <p>${product.shippingInformation}</p>
        <p>${product.description}</p>
        <div class="card-actions">
            <button id="view-full-details">View Full Details</button>
            <button id="add-to-cart">Add to Cart</button>
        </div>
    `
    productModal.showModal()

    const closeModal = document.getElementById('close-modal')
    closeModal.addEventListener('click', function() {
        productModal.close()
    })
    productModal.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.close()
        }
    })

    const viewFullDetails = document.getElementById('view-full-details')
    const fullProductDetails = document.getElementById('full-product-details')

    viewFullDetails.addEventListener('click', function() {
        showFullProductDetails(product)
    })

    function showFullProductDetails(product) {
        productModal.close()
        productContainer.style.display = 'none'
        fullProductDetails.innerHTML = `
            <h2>${product.title}</h2>
            <div id="full-product-info">
                <div id="product-image">
                    ${product.images.map(image => 
                        `<li><img src="${image}" alt="${product.title}"></li>`).join('')}
                </div>
                <div id="product-info">
                    <p class="price">$${product.price}</p>
                    <p><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <p><strong>Rating:</strong> ${product.rating}</p>
                    <p>${product.availabilityStatus}</p>
                    <p>${product.shippingInformation}</p>
                    <p>${product.description}</p>

                    <h3>Specifications</h3>
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>SKU:</strong> ${product.sku}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Warranty:</strong> ${product.warrantyInformation}</p>

                    <button id="back-to-products">Back to Products</button>
                </div>
            </div>
            <h4>Customer Reviews</h4>
            <div id="customer-reviews">
                ${product.reviews && product.reviews.length > 0 ?
                    product.reviews.map(review => `
                        <div class="review">
                            <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                            <p>
                                <strong>${review.reviewerName}</strong> - 
                                <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                            </p>
                           <p>"${review.comment}"</p>
                        </div>
                    `).join('') :
                    '<p>No reviews available.</p>'
                }
            </div>
        `
    }
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedCategory = categoryFilter.value
    const selectedSort = sortFilter.value

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm)
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    if (selectedSort === 'price-low-high') {
        filteredProducts.sort((a, b) => a.price - b.price)
    } else if (selectedSort === 'price-high-low') {
        filteredProducts.sort((a, b) => b.price - a.price)
    } else if (selectedSort === 'rating-high-low') {
        filteredProducts.sort((a, b) => b.rating - a.rating)
    } else if (selectedSort === 'rating-low-high') {
        filteredProducts.sort((a, b) => a.rating - b.rating)
    }

    productContainer.innerHTML = ''
    displayProducts(filteredProducts)
}

searchInput.addEventListener('input', filterProducts)
searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    filterProducts()
})
categoryFilter.addEventListener('change', filterProducts)
sortFilter.addEventListener('change', filterProducts)
clearSearch.addEventListener('click', function() {
    searchInput.value = ''
    categoryFilter.value = ''
    filterProducts()
})
searchInput.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
        searchInput.value = ''
        filterProducts()
    }
})