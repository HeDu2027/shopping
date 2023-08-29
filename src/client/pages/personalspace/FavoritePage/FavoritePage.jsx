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
            console.error("loggedInUser is undefined!");
            return;
        }
        console.log("loggedInUser:", loggedInUser);

        const fetchFavorites = async () => {
            try {
                let favoritesArray = [];

                if (loggedInUser && loggedInUser.favorites) {
                    if (Array.isArray(loggedInUser.favorites)) {
                        favoritesArray = loggedInUser.favorites;
                    } else if (typeof loggedInUser.favorites === 'string') {
                        favoritesArray = loggedInUser.favorites.split(',');
                    }

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
                }else {
                    console.error("favorites is undefined or not an array!");
                }
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
