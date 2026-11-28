import { useEffect, useState } from 'react'
import { getProducts } from './api'
import { Controls } from './components/Controls'
import { ProductCard } from './components/ProductCard'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  const filteredProducts = 
    products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || product.category === category
      return matchesSearch && matchesCategory
    }
    
    )

  return (
    <>
      <header>
        <h1>Welcome to Our E-commerce Store</h1>
      </header>

      <Controls 
        products={products}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />
    
      <main>
        <div id="product-container">
          <ProductCard products={filteredProducts}/>
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