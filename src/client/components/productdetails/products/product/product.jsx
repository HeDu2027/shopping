import React, { useEffect, useState } from "react";
import './Product.css';
import StarRating from "../../../pagedetail/suggestshow/StarRating";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";
import { useUser } from "../../../../pages/personalspace/userContext/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ product, addToCart, layout }) => {
    const isListLayout = layout === 'list';
    const [isFavorited, setIsFavorited] = useState(false);
    const { user: loggedInUser, updateUser } = useUser();
    const navigate = useNavigate();

    const imageName = product.mainImage.split('/').pop();
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
            await axios.post(`http://localhost:4000/user/${loggedInUser._id}/favorite/${product.id}`, {
                productName: product.name,
                productPrice: product.price,
                productStock: product.stock
            }, {
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
            console.error("Failed to add product to favorites:", error.response.data);
        }
    };

    useEffect(() => {
        if (loggedInUser?.favorites?.includes(product._id)) {
            setIsFavorited(true);
        }
    }, [loggedInUser, product.id]);
    console.log("Toggling favorite for product ID:", product.id);

    const toggleFavorite = async (product) => {
        if (isFavorited) {
            // Remove from favorites
            try {
                const token = localStorage.getItem('jwtToken');
                await axios.delete(`http://localhost:4000/user/${loggedInUser._id}/favorite/${product.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIsFavorited(false);  // Update the state to reflect that the product is no longer favorited
                // Update the user's favorites in the context or state
                const updatedFavorites = loggedInUser.favorites.filter(fav => fav !== product.id);
                updateUser({
                    ...loggedInUser,
                    favorites: updatedFavorites
                });
            } catch (error) {
                console.error("Failed to remove product from favorites:", error);
            }
        } else {
            // Add to favorites
            addToFavorites(product);
        }
    };
    console.log("Navigating to product detail for product ID:", product.id);

    const navigateToProductDetail = async () => {
        // Redirect to the product detail page
        navigate(`/product/${product.id}`);

        // Add the product ID to the user's browsing history
        try {
            await axios.post(`http://localhost:4000/user/${loggedInUser._id}/add-to-history`, {
                productId: product.id
            });
        } catch (error) {
            console.error("Failed to add to browsing history:", error);
        }
    };

    console.log("Adding to browsing history for user ID:", loggedInUser._id, "with product ID:", product.id);

    return (
        <div className={`product-wrapper ${isListLayout ? 'listLayout' : ''}`}>
            <div className='productcontainer'>

                <div className='imagecontainer'>
                    <div className={`favorite-icon ${isFavorited ? 'favorited' : ''}`} onClick={() => toggleFavorite(product)}>
                        {isFavorited ? <MdFavorite size={26}/> : <MdFavoriteBorder size={26}/>}
                    </div>

                    {/* Updated the image to have an onClick event instead of being wrapped in a Link */}
                    <img
                        src={`http://localhost:4000/productcontainer/images/${imageName}`}
                        alt={product.name}
                        className="image"
                        onClick={navigateToProductDetail} // Added onClick event here
                    />
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
