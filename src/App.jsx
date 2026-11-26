import { useEffect, useState } from 'react'
import { getProducts } from './api'
import { Controls } from './components/Controls'
import { ProductCard } from './components/ProductCard'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <>
      <header>
        <h1>Welcome to Our E-commerce Store</h1>
      </header>

      <Controls products={products}/>
    
      <main>
        <div id="product-container">
          <ProductCard products={products}/>
        </div>

        <div id="full-product-details">
        </div>

        <dialog id="product-modal">
            <button id="close-modal" type="button">x</button>
            <div id="product-details"></div>
        </dialog>
      </main>
    </>
  )
}