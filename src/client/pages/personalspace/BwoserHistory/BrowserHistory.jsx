import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/Topbar";
import './BwoserHistory.css';
import axios from 'axios';
import { useUser } from "../userContext/UserContext";

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
                console.log("Browsing History Response:", response.data);

                // Assuming the browsingHistory contains only product IDs
                const productIds = response.data.browsingHistory.map(item => item.productId);

                // Fetch product details for each product ID
                const productDetailsPromises = productIds.map(id => axios.get(`http://localhost:4000/product/${id}`));
                const productDetailsResponses = await Promise.all(productDetailsPromises);
                console.log("Product Details Responses:", productDetailsResponses);

                const allProducts = productDetailsResponses.map(res => res.data);
                console.log("Mapped Products:", allProducts);
                setProducts(allProducts);

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
                            <Product key={product._id} data={product} />
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
    console.log("Product Data:", data);
    return (
        <div className='card-wrapper'>
            <img className='image-wrapper' src={data.mainImage} alt={data.name} />
            <div className='name-wrapper'>
                {data.name}
            </div>
            <div className='name-wrapper'>
                {data.stock} in stock
            </div>
        </div>
    );
}

export default BrowserHistory;
