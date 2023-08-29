import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style/ShowItem.css';
import StarRating from "./StarRating";
import { useCart } from "../../topbar/CartContext";
import axios from "axios";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useUser } from "../../../pages/personalspace/userContext/UserContext"; // Update this path

const ShowItem = ({ product }) => {
    const { addToCart } = useCart();
    const { user: loggedInUser } = useUser(); // Import and use the useUser hook from UserContext
    const [isFavorited, setIsFavorited] = useState(false);

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        addToCart(product);
    };

    const addToFavorites = async () => {
        console.log("Attempting to add to favorites:", product.id, loggedInUser._id);

        try {
            if (!loggedInUser?._id || !product?.id) {
                console.error("User ID or Product ID is missing");
                return;
            }

            await axios.post(`http://localhost:4000/user/${loggedInUser._id}/favorite/${product.id}`);
            // If you want to do something with the response, you can do it here

        } catch (error) {
            console.error("Failed to add product to favorites:", error);
        }
    };

    if (!product) {
        return <div>Error: Product not found!</div>;
    }

    return (
        <div className='productcontainer-wrapper'>
            <div className='productcontainer'>
                <div className='imagecontainer'>
                    <div className={`favorite-icon ${isFavorited ? 'favorited' : ''}`} onClick={() => {
                        setIsFavorited(!isFavorited);
                        addToFavorites(product.id);
                    }}>
                        {isFavorited ? <MdFavorite size={26}/> : <MdFavoriteBorder size={26}/>}
                    </div>
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
        </div>
    )
}

export default ShowItem;
