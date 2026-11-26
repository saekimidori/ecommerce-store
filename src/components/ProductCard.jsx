import { useState, useEffect } from 'react'

export function ProductCard({products}) {
  return (
    products.map(product => (
      <article key={product.id}>
        <img src={product.images[0]} alt={product.title} />
        <h2>{product.title}</h2>
        <p><strong>Rating:</strong> {product.rating}</p>
        <p className="price">${product.price}</p>
        <div className="card-actions">
          <button 
            className="view-details"
            onClick={() => showProductModal(product)}>View Details</button>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </article>
    ))
  )
}