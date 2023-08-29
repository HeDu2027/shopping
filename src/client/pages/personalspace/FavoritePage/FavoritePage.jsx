import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import './FavoritePage.css'
import axios from "axios";
import { UserContext } from "../userContext/UserContext";

const FavoritePage = () => {
    const { user: loggedInUser } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loggedInUser) {
            console.error("User is not logged in.");
            return;
        }

        let favoritesArray = [];

        if (loggedInUser.favorites) {
            if (Array.isArray(loggedInUser.favorites)) {
                // Extracting product IDs from the array of favorite objects.
                favoritesArray = loggedInUser.favorites.map(fav => fav.productId);
            } else {
                console.error("Unexpected type for favorites");
                return;  // exit useEffect
            }
        } else {
            console.error("favorites is undefined or not an array!");
            return;
        }


        if (!favoritesArray.length) {
            console.warn("favorites array is empty!");
            return;
        }

        console.log("loggedInUser:", loggedInUser);

        const fetchFavorites = async () => {
            try {
                // Assuming you're storing the token in local storage
                const token = localStorage.getItem('token');

                // Check if token is null
                if (!token) {
                    console.error("Token is null. Please log in again.");
                    setError("Token is missing. Please log in again.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/user/${loggedInUser._id}/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch favorite products:", error);
                setError("Failed to fetch favorite products. Please try again later.");
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [loggedInUser]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                        {products.map(product => (
                            <Product key={product._id} data={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Product = ({ data }) => {
    return (
        <div className='card-wrapper'>
            <img className='image-wrapper' src={data.mainImage} alt={data.name} />
            <div className='name-wrapper'>
                {data.name}
            </div>
        </div>
    );
}

export default FavoritePage;
