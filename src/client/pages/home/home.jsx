import React, {useState} from "react";
import SearchBar from "../../components/searchbar/searchbar";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import Discount from "../../components/discount/discount";
import './home.css'; // Importing the CSS file
import {ProductData,ClothingData} from "../../data/ProductData";
import Showbar from "../../components/pagedetail/suggestshow/showbar";
import {Data} from "../../data/datas";
import TopbarContainer from "../../components/topbar/TopbarContainer";
const Home = () => {

    const [cart, setCart] = useState([]);

    const addToCart = (productToAdd) => {
        // Check if adding would exceed stock
        const quantityInCart = cart.filter(p => p.id === productToAdd.id).length;
        if (quantityInCart + 1 > productToAdd.stock) {
            // Show out of stock message
            alert("Out of stock! Please contact the owner of this shop.");
            return;
        }

        // Add product to cart
        setCart(prevCart => [...prevCart, productToAdd]);
    };




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
