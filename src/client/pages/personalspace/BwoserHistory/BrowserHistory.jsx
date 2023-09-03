import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import './BwoserHistory.css';
import axios from 'axios';
import { useUser } from "../userContext/UserContext"; // Update this path

const BrowserHistory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: loggedInUser } = useUser();

    useEffect(() => {
        const fetchBrowserHistory = async () => {
            if (!loggedInUser?._id) {
                setError("User is not logged in or user ID is undefined");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/user/${loggedInUser._id}/browser-history`);
                setProducts(response.data.browsingHistory);
            } catch (error) {
                setError("Failed to fetch browser history");
                console.error("Failed to fetch browser history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrowserHistory();
    }, [loggedInUser]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                    {products.length ? (
                        products.map(product => (
                            <Product key={product.productId} data={product} />
                        ))
                    ) : (
                        <div>You have no browsing history.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

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
