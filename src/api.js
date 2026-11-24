const BASE_URL = 'https://dummyjson.com/products'

export async function getProducts() {
  const res = await fetch(`${BASE_URL}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.products
}