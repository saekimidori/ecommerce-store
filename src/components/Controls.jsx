export function Controls({products}) {
    const categories = [...new Set(products.map(product => product.category))]

    return (
        <>
            <nav>
                <div id="controls">
                    <form id="search-form">
                        <input type="text" id="search-input" placeholder="Search products..." />
                    
                        <select id="category-filter">
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option 
                                    value={category}
                                    key={category}
                                    >{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                            ))}
                        </select>

                        <button type="submit">Search</button>
                        <button type="button" id="clear-search">Clear</button>

                        <select id="sort-filter">
                            <option value="default">Sort by</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating-high-low">Rating: High to Low</option>
                            <option value="rating-low-high">Rating: Low to High</option>
                        </select>
                    </form>
                </div>
            </nav>
        </>
    )
}