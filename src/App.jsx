import { useEffect, useState } from 'react'
import { Controls } from './components/Controls'
import { ProductList } from './components/ProductList'
// import { createCategoryOptions } from './api'
// import { displayProducts } from './utils'



export default function App() {
  const [products] = useState([])

  return (
    <>
        <header>
                <h1>Welcome to Our E-commerce Store</h1>
        </header>

        <Controls />
      
        <main>
            <div id="product-container">
                <ProductList />
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