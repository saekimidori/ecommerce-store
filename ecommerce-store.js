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
            <p>Rating: ${product.rating}</p>
            <p>Price: $${product.price}</p>
            <button class="view-details">View Details</button>
            <button class="add-to-cart">Add to Cart</button>
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
        <p>${product.description}</p>
        <p>Rating: ${product.rating}</p>
        <p>Price: $${product.price}</p>
        <button id="view-full-details">View Full Details</button>
        <button id="add-to-cart">Add to Cart</button>
    `
    productModal.showModal()

    const closeModal = document.getElementById('close-modal')
    closeModal.addEventListener('click', function() {
        productModal.close()
    })
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