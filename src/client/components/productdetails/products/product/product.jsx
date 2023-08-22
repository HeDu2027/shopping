import React from "react";
import './Product.css';
import StarRating from "../../../pagedetail/suggestshow/StarRating";
const Product = ({ product }) => {
    return (
        <div className='productcontainer'>
            <div className='imagecontainer'>
                <img src={product.image} alt={product.name} className="image" />
            </div>
            <p className="productName">{product.name}</p>
            <p className="productPrice">{product.price}</p>
            <StarRating score={product.rating} />
            <button className="addToCartButton">Add to cart</button>
            <p className="productStock">{product.stock} in stock</p>
        </div>
    )
}

export default Product;
