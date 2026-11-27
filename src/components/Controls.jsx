export function Controls({products, search, onSearchChange}) {
    const categories = [...new Set(products.map(product => product.category))]

    return (
        <>
            <nav>
                <div id="controls">
                    <input type="text" id="search-input" 
                        value={search}
                        placeholder="Search products..."
                        onChange={(event) => onSearchChange(event.target.value)} 
                    />
                
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option 
                                value={category}
                                key={category}
                                >{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                        ))}
                    </select>
                    
                    <button type="button" id="clear-search">Clear</button>

                    <select id="sort-filter">
                        <option value="default">Sort by</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="rating-high-low">Rating: High to Low</option>
                        <option value="rating-low-high">Rating: Low to High</option>
                    </select>
                </div>
            </nav>
        </>
    )
}