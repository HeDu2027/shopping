import React, {useContext, useState} from "react";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import './styles/Topbar.css';
import Cart from "./Cart";
import {BiSolidShoppingBagAlt} from "react-icons/bi";
import {UserContext} from "../../pages/personalspace/userContext/UserContext";
import {useDispatch} from "react-redux";
import {userLogout} from "../../redux/actions/userActions";

const Topbar = ({ cart, toggleCartVisibility, showCart }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAccountMouseLeave = () => {
        setShowDropdown(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        // Remove the token and user from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        // Clear the user from UserContext
        setUser(null);

        // Dispatch the logout action to clear the user state in Redux
        dispatch(userLogout());

        // Redirect the user to the login page
        navigate('/login');
    };

    return (
        <div className="topbar-wrapper">
            <div className="topbar-content">

                <div style={{marginLeft:'50px'}}>
                    <Link to='/home'>
                        <BiSolidShoppingBagAlt size={40} color='#25d366'/>
                    </Link>
                </div>

                <div className="login-section">
                    <p style={{fontSize: '18px', marginRight: '30px', marginLeft: '10px', marginTop: '12px'}}>
                        <Link to="/signup" style={{color: '#888888'}}>Sign up</Link>
                    </p>
                    <p style={{fontSize: '18px', marginTop: '12px'}}>
                        <Link to="/login" style={{color: '#888888'}}>Log in</Link>
                    </p>
                </div>


                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search Product"
                        className="search-input"
                        style={{width:'400px',height:'40px',borderRadius:'15px'}}
                    />
                    <AiOutlineSearch style={{left:'88%'}} size='26px' className="search-icon" />
                </div>

                <div className="account-section">
                    <div>
                        <p style={{fontSize:'18px',marginTop:'12px'}}>
                            {user ? (
                                <Link to="/personalspace" style={{color: '#888888'}}>{user.username} personal space</Link>
                            ) : (
                                <Link to="/myaccount" style={{color: '#888888'}}>My Account</Link>
                            )}
                        </p>
                    </div>
                </div>

                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>

                <div className="notification-section">
                    <div style={{ position: 'relative' }}>
                        <button onClick={toggleCartVisibility}>
                            <AiOutlineShoppingCart size={24} /> Cart
                        </button>
                        {cart && cart.length > 0 && (
                            <span className="cart-count">{cart.length}</span>
                        )}
                        {showCart && <Cart cart={cart} />} {}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Topbar;
