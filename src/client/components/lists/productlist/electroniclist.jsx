import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import productImage from '/Users/hedu/Downloads/app/shopping/src/client/components/lists/productlist/asset/Apple_new_macbookair_wallpaper_screen_11102020_big.jpg.large.jpg';

function ElectronicList() {
    const electronicproducts = [
        {image: productImage, description: 'Product 1'},
        {image: productImage, description: 'Product 2'},
        {image: productImage, description: 'Product 3'},
        {image: productImage, description: 'Product 4'},
        {image: productImage, description: 'Product 5'},
        {image: productImage, description: 'Product 6'},
        {image: productImage, description: 'Product 7'},
        // Add more products as needed
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>All these apple's trending </h1>
                <div style={{ marginRight: '50px' }}>
                    {/* Your component goes here */}
                </div>
                <a href="/allproducts" style={{color:'black',fontSize:20}} >
                    <p>See all <BsArrowRight /></p>
                </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {electronicproducts.map((product, index) => (
                    <div key={index} style={{ border: 'none'}} onMouseEnter={e => e.target.style.border = '1px solid black'} onMouseLeave={e => e.target.style.border = '1px solid transparent'}>
                        <img src={product.image} alt={product.description} style={{width:'150px'}} />
                        <a href={`#${product.description.replace(/\s+/g, '-')}`}>{product.description}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ElectronicList;
