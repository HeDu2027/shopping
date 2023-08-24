import React from "react";
import Product from "./product/product";
import productData from './productData'; // Importing the data
import './Products.css';

const Products = ({ layout, currentPage, sortOption, searchTerm, ratingFilter, products, filteredProducts, productsPerPage, addToCart }) => {

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filter products based on the selected rating
    if (ratingFilter) {
        filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter && product.rating < ratingFilter + 1);
    }

    let sortedProductData = [...filteredProducts]; // Filtered products

    if (sortOption === 'Highest Prices') {
        sortedProductData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Lowest Prices') {
        sortedProductData.sort((a, b) => a.price - b.price);
    }


    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = sortedProductData.slice(startIndex, endIndex);

    return (
        <div className={`productsContainer ${layout === 'grid' ? 'gridLayout' : 'listLayout'}`}>
            {displayedProducts.map((product, index) => (
                <Product key={index} product={product} addToCart={addToCart}/>
            ))}
        </div>
    );
};

export default Products;
