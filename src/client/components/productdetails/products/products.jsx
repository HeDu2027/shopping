import React from "react";
import Product from "./product/product";

import image from '/Users/hedu/Downloads/app/shopping/src/client/components/productdetails/asset/s-l1600.jpg';

const productData = [
    { name: 'Apple MacBook Pro', price: 'US $1999.99', stock: 20, image: image },
    { name: 'Samsung Galaxy S21', price: 'US $799.99', stock: 30, image: image },
    { name: 'Sony PlayStation 5', price: 'US $499.99', stock: 15, image: image },
    { name: 'Microsoft Xbox Series X', price: 'US $499.99', stock: 10, image: image },
    { name: 'Nintendo Switch', price: 'US $299.99', stock: 25, image: image },
    { name: 'Apple iPhone 13', price: 'US $999.99', stock: 30, image: image },
    { name: 'Google Pixel 6', price: 'US $599.99', stock: 20, image: image },
    { name: 'Samsung Galaxy Tab S7', price: 'US $649.99', stock: 15, image: image },
    { name: 'Apple iPad Pro', price: 'US $799.99', stock: 20, image: image },
    { name: 'Microsoft Surface Pro 7', price: 'US $749.99', stock: 15, image: image },
    { name: 'Dell XPS 13', price: 'US $999.99', stock: 10, image: image },
    { name: 'HP Spectre x360', price: 'US $1249.99', stock: 10, image: image },
    { name: 'Apple Watch Series 7', price: 'US $399.99', stock: 20, image: image },
    { name: 'Samsung Galaxy Watch 4', price: 'US $249.99', stock: 30, image: image },
    { name: 'Fitbit Versa 3', price: 'US $229.99', stock: 25, image: image },
    { name: 'Bose QuietComfort 35 II', price: 'US $299.99', stock: 20, image: image },
    { name: 'Sony WH-1000XM4', price: 'US $349.99', stock: 15, image: image },
    { name: 'Apple AirPods Pro', price: 'US $249.99', stock: 30, image: image },
    { name: 'Samsung Galaxy Buds Pro', price: 'US $199.99', stock: 20, image: image },
    { name: 'Jabra Elite 75t', price: 'US $149.99', stock: 25, image: image },
    { name: 'Canon EOS R6', price: 'US $2499.99', stock: 10, image: image },
    { name: 'Nikon Z6 II', price: 'US $1999.99', stock: 10, image: image },
    { name: 'Sony Alpha a7 III', price: 'US $1999.99', stock: 10, image: image },
    { name: 'Fujifilm X-T4', price: 'US $1699.99', stock: 10, image: image },
    { name: 'GoPro HERO9 Black', price: 'US $399.99', stock: 20, image: image },
    { name: 'DJI Mavic Air 2', price: 'US $799.99', stock: 15, image: image },
    { name: 'Apple iMac (24-inch, 2021)', price: 'US $1299.99', stock: 10, image: image },
    { name: 'Dell Alienware Aurora R10', price: 'US $1799.99', stock: 10, image: image },
    { name: 'HP Envy 32 All-in-One', price: 'US $1799.99', stock: 10, image: image },
    { name: 'Microsoft Surface Studio 2', price: 'US $3499.99', stock: 5, image: image },
];



const Products = ({ currentPage, sortOption, searchTerm,layout }) => {

    const styles = {
        productsContainer: {
            display: 'grid',
            gridTemplateColumns: layout === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)',
            gap: '10px',
        },
        // Other styles remain the same
    }

    const productsPerPage = 16;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    let filteredProducts = productData;

    // Filter products based on the search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    let sortedProductData = [...filteredProducts]; // Filtered products

    if (sortOption === 'Highest Prices') {
        sortedProductData.sort((a, b) => parseFloat(b.price.slice(4)) - parseFloat(a.price.slice(4)));
    } else if (sortOption === 'Lowest Prices') {
        sortedProductData.sort((a, b) => parseFloat(a.price.slice(4)) - parseFloat(b.price.slice(4)));
    }

    return (
        <div style={styles.productsContainer}>
            {sortedProductData.slice(startIndex, endIndex).map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </div>
    );
};

export default Products;
