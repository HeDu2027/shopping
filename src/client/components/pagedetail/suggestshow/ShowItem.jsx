import React from "react";
import {Link} from "react-router-dom";
import './style/ShowItem.css'
import StarRating from "./StarRating";
import {useCart} from "../../topbar/CartContext";

const ShowItem = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        addToCart(product);
        // Here, you can set the showCart state to true to display the cart
        // For example: setShowCart(true);
    };

    if (!product) {
        return <div>Error: Product not found!</div>;
    }

    return (
        <div className='productcontainer'>
            <div className='imagecontainer'>
                <Link to={`/pagedetail/${product.id}`}>
                    <img src={product.mainImage} alt={product.name} className="image" />
                </Link>
            </div>
            <p className="productName">{product.name}</p>
            <p className="productPrice">{product.price}</p>
            <StarRating score={product.rating} />
            <button className="addToCartButton" onClick={() => handleAddToCart(product)}>
                Add to cart
            </button>
            <p className="productStock">{product.stock} in stock</p>
        </div>
    )
}



export default ShowItem;
