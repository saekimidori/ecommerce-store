let products = []
const productContainer = document.getElementById('product-container')
const productModal = document.getElementById('product-modal')

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
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })

function displayProducts(products) {
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

