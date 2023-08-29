import React, { useEffect, useState } from "react";
import './Product.css';
import StarRating from "../../../pagedetail/suggestshow/StarRating";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";
import { useUser } from "../../../../pages/personalspace/userContext/UserContext"; // Update this path

const Product = ({ product, addToCart, layout }) => {
    const isListLayout = layout === 'list';
    const [isFavorited, setIsFavorited] = useState(false);
    const { user: loggedInUser, updateUser } = useUser();

    const addToFavorites = async (product) => {
        console.log("Attempting to add to favorites:", product.id, loggedInUser._id);
        console.log("Current loggedInUser.favorites:", loggedInUser.favorites); // Debugging line

        if(loggedInUser && !Array.isArray(loggedInUser.favorites)) {
            loggedInUser.favorites = [];
        }

        console.log("Current loggedInUser.favorites:", loggedInUser.favorites);

        if (!loggedInUser || !Array.isArray(loggedInUser.favorites)) {
            console.error("loggedInUser.favorites is not an array!");
            return;
        }
        try {
            if (!loggedInUser?._id || !product?.id) {
                console.error("User ID or Product ID is missing");
                return;
            }

            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error("JWT token is missing");
                return;
            }

            // Send the JWT token in the Authorization header
            await axios.post(`http://localhost:4000/user/${loggedInUser._id}/favorite/${product.id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update the user's favorites in the context or state
            updateUser({
                ...loggedInUser,
                favorites: [...loggedInUser.favorites, product.id]
            });

            setIsFavorited(true);

        } catch (error) {
            console.error("Failed to add product to favorites:", error);
        }
    };

    useEffect(() => {
        if (loggedInUser?.favorites?.includes(product._id)) {
            setIsFavorited(true);
        }
    }, [loggedInUser, product.id]);


    return (
        <div className={`product-wrapper ${isListLayout ? 'listLayout' : ''}`}>
            <div className='productcontainer'>
                <div className='imagecontainer'>
                    <div className={`favorite-icon ${isFavorited ? 'favorited' : ''}`} onClick={() => {
                        setIsFavorited(!isFavorited);
                        addToFavorites(product);
                    }}>

                    {isFavorited ? <MdFavorite size={26}/> : <MdFavoriteBorder size={26}/>}
                    </div>
                    <img src={product.mainImage} alt={product.name} className="image" />
                </div>

                <div className='productName-container'>
                    <p className="productName">{product.name}</p>
                </div>

                <p className="productPrice">{product.price}</p>
                <StarRating score={product.rating} />
                <button className="addToCartButton" onClick={() => addToCart(product)}>Add to cart</button>
                <p className="productStock">{product.stock} in stock</p>
            </div>
        </div>
    )
}

export default Product;
