import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import {Link} from "react-router-dom";
import './styles/Topbar.css';
import Cart from "./Cart";

const Topbar = ({ cart, toggleCartVisibility, showCart }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAccountMouseLeave = () => {
        setShowDropdown(false);
    }

    return (
        <div className="topbar-wrapper">
            <div className="topbar-content">
                <div className="login-section">
                    <p>Hi <Link to="/sign">Sign Up</Link></p>
                    <p>or</p>
                    <p>Hi <Link to="/login">Log in</Link></p>
                </div>

                <div className="account-section"
                     onMouseEnter={() => setShowDropdown(true)}
                     onMouseLeave={handleAccountMouseLeave}
                >
                    <select>
                        <option>My Account</option>
                    </select>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <AiOutlineSearch className="search-icon" />
                </div>

                <div className="notification-section">
                    <div style={{ position: 'relative' }}>
                        <button onClick={toggleCartVisibility}>
                            <AiOutlineShoppingCart size={22} /> Cart
                        </button>
                        {cart && cart.length > 0 && (
                            <span className="cart-count">{cart.length}</span>
                        )}
                        {showCart && <Cart cart={cart} />} {/* Conditionally render the Cart */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Topbar;
