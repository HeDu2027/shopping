import React, { useState } from "react";
import Topbar from './Topbar'
import Cart from "./Cart";
import ShowItem from "../../components/pagedetail/suggestshow/ShowItem"; // Import the ShowItem component
import {useCart} from "./CartContext";

const TopbarContainer = () => {
    const { cart, addToCart } = useCart(); // Get cart and addToCart from context
    const [showCart, setShowCart] = useState(false);

    const toggleCartVisibility = () => {
        setShowCart(!showCart);
    };

    const closeCart = () => {
        setShowCart(false);
    };

    return (
        <div>
            <Topbar cart={cart} toggleCartVisibility={toggleCartVisibility} showCart={showCart} />
            {showCart && <Cart cart={cart} closeCart={closeCart} />}
            <ShowItem addToCart={addToCart} /> {/* Pass the addToCart function to ShowItem */}
        </div>
    );
};

export default TopbarContainer;
