import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import './BwoserHistory.css';
import axios from 'axios';
import { useUser } from "../userContext/UserContext"; // Update this path

const BrowserHistory = () => {
    const [products, setProducts] = useState([]);
    const { user: loggedInUser } = useUser();

    useEffect(() => {
        // Fetch user's browser history products from the backend
        const fetchBrowserHistory = async () => {
            if (!loggedInUser?._id) {
                console.error("User is not logged in or user ID is undefined");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/user/${loggedInUser._id}/browser-history`);
                setProducts(response.data.browsingHistory);
            } catch (error) {
                console.error("Failed to fetch browser history:", error);
            }
        };
        fetchBrowserHistory();
    }, [loggedInUser]);

    return (
        <div className='browser-history-container'>
            <Topbar />

            <div className='item-container'>
                <div className='title-container'>
                    <div className='title-wrapper'>
                        Your browser history
                    </div>
                </div>

                <div className='item-list-container'>
                    {products.map(product => (
                        <Product key={product.productId} data={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ... rest of the code remains unchanged


const Product = ({ data }) => {
    return (
        <div className='card-wrapper'>
            <img className='image-wrapper' src={data.image} alt={data.name} />
            <div className='name-wrapper'>
                {data.name}
            </div>
        </div>
    );
}

export default BrowserHistory;
