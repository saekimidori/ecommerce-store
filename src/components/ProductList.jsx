import { useState, useEffect } from 'react'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  const productContainer = document.getElementById('product-container')

  return (
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
  )
}