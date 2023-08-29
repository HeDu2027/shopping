import React, { useState } from "react";
import Topbar from './Topbar'
import Cart from "./Cart";
import ShowItem from "../../components/pagedetail/suggestshow/ShowItem"; // Import the ShowItem component
import {useCart} from "./CartContext";
import './styles/Topbar.css'
const TopbarContainer = () => {
    const { cart, addToCart } = useCart(); // Get cart and addToCart from context
    console.log(cart);  // Log the cart here
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
            <ShowItem addToCart={addToCart} /> {}
        </div>
    );
};

export default TopbarContainer;
