import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import Cart from "../shoppingcart/cart";
import products from "../shoppingcart/products";

const Topbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState("");
    const [showCart, setShowCart] = useState(false);
    // 在 MyAccount 组件上
    let accountMouseLeave = false;
    // 获取商品总数
    const totalProducts = products.length;

// 每个商品高度设置为120px
    const productHeight = 120;

// 购物车高度 = 商品数 * 商品高度 + 顶部总价高度
    const cartHeight = totalProducts * productHeight + 50;

    const handleAccountMouseLeave = () => {
        accountMouseLeave = true;
        checkMouseLeave();
    }

// 在悬浮框上
    let boxMouseLeave = false;

    const handleBoxMouseLeave = () => {
        boxMouseLeave = true;
        checkMouseLeave();
    }

    const checkMouseLeave = () => {
        if (accountMouseLeave && boxMouseLeave) {
            setShowDropdown(false);
        }
    }

    const handleHover = (option) => {
        setSelected(option);
    };

    const handleClick = (url) => {
        // 跳转逻辑
    };

    return (
        <div style={{ position: 'relative', width: '1200px', margin: '0 auto' }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#1DA1F2",
                    padding: "10px",
                    color: "white",
                    width: "100%",
                    margin: '0 auto',
                    borderRadius:'6px'
                }}
            >
                <div style={{padding: "0 1px"}}>
                    <p style={{margin: "0"}}>Hi <a style={{color: "black"}}>Sign in</a></p>
                </div>

                <div style={{padding: "0 2px"}}>
                    <p style={{margin: "0"}}>or</p>
                </div>

                <div style={{padding: "0 2px"}}>
                    <a style={{color: "black"}}>Register</a>
                </div>

                <div style={{padding: "0 30px"}}>Daily Deals</div>

                <div style={{padding: "0 30px"}}>Brand Outlet</div>

                <div style={{marginRight: "280px"}}>Help & Contact</div>

                <div style={{padding: "0 20px"}}>Sell</div>

                <div
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={handleAccountMouseLeave}
                    style={{padding: "0 20px"}}
                >
                    <select
                        style={{backgroundColor: "#1DA1F2", color: "white", border: "none"}}
                    >
                        <option>My Account</option>
                    </select>
                </div>

                <div style={{padding: "0 10px"}}>
                    <BsBell size={22} style={{color: "white"}}/>
                </div>

                <div style={{padding: "0 10px"}}>
                    <AiOutlineShoppingCart onClick={() => setShowCart(!showCart)}  size={22} style={{color: "white"}}/>

                </div>
            </div>
            {showCart && (
                <Cart style={{
                    position: "absolute",
                    top: '100%',
                    right: '-20%',
                    transform: 'translateX(-50%)',
                    width: 260,
                    height: cartHeight ,
                    backgroundColor: "#1DA1F2",
                    border: "none",
                    color: "white",
                    padding:"15px",
                }}/>
            )}

            {showDropdown && (
                <div
                    onMouseLeave={handleBoxMouseLeave}
                    style={{
                        position: "absolute",
                        top: '100%',
                        left: '80%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        height: 400,
                        //marginTop: '-1px',
                        backgroundColor: "#1DA1F2",
                        border: "none",
                        color: "white",
                        padding:"15px",
                        //borderRadius:'6px'
                    }}
                >
                    <div
                        onMouseOver={() => handleHover("Summary")}
                        onClick={() => handleClick("/Summary")}
                    >
                        <p>Summary</p>
                        {selected === "Summary" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Recently Viewed")}
                        onClick={() => handleClick("/Recently Viewed")}
                    >
                        <p>Recently Viewed</p>
                        {selected === "Recently Viewed" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Bids/Offers")}
                        onClick={() => handleClick("/Bids/Offers")}
                    >
                        <p>Bids/Offers</p>
                        {selected === "Bids/Offers" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Watchlist")}
                        onClick={() => handleClick("/Watchlist")}
                    >
                        <p>Watchlist</p>
                        {selected === "Watchlist" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Purchase History")}
                        onClick={() => handleClick("/Purchase History")}
                    >
                        <p>Purchase History</p>
                        {selected === "Purchase History" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Buy Again")}
                        onClick={() => handleClick("/Buy Again")}
                    >
                        <p>Buy Again</p>
                        {selected === "Buy Again" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Selling")}
                        onClick={() => handleClick("/Selling")}
                    >
                        <p>Selling</p>
                        {selected === "Selling" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Saved Searches")}
                        onClick={() => handleClick("/Saved Searches")}
                    >
                        <p>Saved Searches</p>
                        {selected === "Saved Searches" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Saved Sellers")}
                        onClick={() => handleClick("/Saved Sellers")}
                    >
                        <p>Saved Sellers</p>
                        {selected === "Saved Sellers" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("My Garage")}
                        onClick={() => handleClick("/My Garage")}
                    >
                        <p>My Garage</p>
                        {selected === "My Garage" && <hr/>}
                    </div>

                    <div
                        onMouseOver={() => handleHover("Messages")}
                        onClick={() => handleClick("/Messages")}
                    >
                        <p>Messages</p>
                        {selected === "Messages" && <hr/>}
                    </div>

                    {/* 其他11个选项 */}
                </div>
            )}
        </div>
    );
};

export default Topbar;
