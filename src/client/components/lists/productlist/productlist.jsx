import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import productImage from '/Users/hedu/Downloads/app/shopping/src/client/components/lists/productlist/asset/s-l500.png';
import {Link} from "react-router-dom";
import products from '/Users/hedu/Downloads/app/shopping/src/client/components/products.js'
function ProductList() {


    return (
        <div style={{
            marginTop:'50px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>Score these trending kicks</h1>
                <div style={{ marginRight: '50px' }}>
                    {/* Your component goes here */}
                </div>
                <a href="/allproducts" style={{color:'black',fontSize:20}} >
                    <p>See all <BsArrowRight /></p>
                </a>
            </div>
            <div style={{ display: 'flex', width:'150px',height:'150px'}}>
                {products.map((product, index) => (
                    <div key={index} style={{ border: 'none',marginRight:'25px'}} onMouseEnter={e => e.target.style.border = '1px solid black'} onMouseLeave={e => e.target.style.border = '1px solid transparent'}>
                        <img src={product.image} alt={product.description} style={{width:'150px'}} />
                        <Link to={`/pagedetail/${index}`}>{product.description}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
