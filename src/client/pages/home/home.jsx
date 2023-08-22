import React, {useState} from "react";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import Discount from "../../components/discount/discount";
import './home.css'; // Importing the CSS file
import Showbar from "../../components/pagedetail/suggestshow/showbar";
import {Data} from "../../data/datas";
import TopbarContainer from "../../components/topbar/TopbarContainer";
import {useCart} from "../../components/topbar/CartContext";
const Home = () => {

    const { cart, addToCart } = useCart();

    return(
        <div className="home-container">
            <div className="topbar-container">
                <TopbarContainer cart={cart}/>
            </div>

            <div className="banner-container">
                <Banner/>
            </div>

            <div className="discount-container">
                <Discount/>
            </div>

            <div className="list-container">
                <Showbar addToCart={addToCart} data={Data}/>
            </div>

            <div className="list-container">
                <Showbar addToCart={addToCart} data={Data}/>
            </div>

            <div className="divider"></div>

            <div className="footer-container">
                <Footer/>
            </div>
        </div>
    )
}

export default Home;
