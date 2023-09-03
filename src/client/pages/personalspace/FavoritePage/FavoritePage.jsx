import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../../../components/topbar/Topbar";
import './FavoritePage.css'
import { UserContext } from "../userContext/UserContext";
import StarRating from "../../../components/pagedetail/suggestshow/StarRating";

const FavoritePage = () => {
    const { user: loggedInUser } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);  // State to handle errors

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`http://localhost:4000/user/${loggedInUser._id}/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Response status:", response.status);
                console.log("Response headers:", response.headers);

                console.log("Fetched favorite products:", response.data);
                console.log("Products state after fetching:", products);

                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch favorite products:", error);
            }
        };

        fetchFavorites();
    }, [loggedInUser._id]);

    console.log("Current products state:", products); // <-- Add this line
    return (
        <div className='favorite-page-container'>
            <Topbar />
            <div className='favorite-content-container'>
                <div className='content-container'>
                    <div className='title-container'>
                        <div className='title-wrapper'>
                            Favorite Products Lists
                        </div>
                    </div>
                    <div className='item-list-container'>
                        {error && <p className="error-message">{error}</p>}  {/* Display error message if there's an error */}
                        {Array.isArray(products) && products.length === 0 && <p>You have no favorite products.</p>}  {/* Display message if no favorite products */}
                        {Array.isArray(products) && products.map(product => (
                            <Product key={product._id} data={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Product = ({ data }) => {

    console.log("Rendering product:", data.name); // <-- Add this line
    const imageName = data.mainImage.split('/').pop();
    return (
        <div className='product-container'>
            <img
                className='image-wrapper'
                src={`http://localhost:4000/productcontainer/images/${imageName}`}
                alt={data.name}
            />
            <div className='productName-container'>
                <p className="productName">{data.name}</p>
            </div>
            <div className='name-wrapper'>
                {data.stock} in stock
            </div>
            {/*<StarRating score={data.rating} />*/}
            {/*<StarRating score={data.rating} />*/}
            <p className="productPrice">{data.price}</p>
        </div>
    );
}

export default FavoritePage;
