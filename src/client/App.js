import React, { useState } from 'react';
import Signup from "./pages/signup";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home";
import ForgotPassword from "./pages/forgetpassword";
import LogBySMS from "./pages/logbysms";
import LogByEmail from "./pages/logbyemail";
import Google from "./auth/google";
import Navbar from "./components/navbar/navbar";
import Searchbar from "./components/searchbar/searchbar";
import List from "./components/lists/list";
import Footer from "./components/footer/footer";
import Banner from "./components/banner/banner";
import Pagedetails from "./components/pagedetails/pagedetails";
import Productcontainer from "./components/productdetails/productcontainer";
import Topbar from "./components/topbar/topbar";
import Cart from "./components/shoppingcart/cart";
import Shoppingcart from "./components/shoppingcart/shoppingcart";
import Showitem from "./components/pagedetails/suggestshow/showitem";
import Showbar from "./components/pagedetails/suggestshow/showbar";
import Shoppage from "./components/shoppage/shoppage";
import Newpage from "./components/shoppage/newpage";
import Checkpage from "./components/checkpage/checkpage";

function App() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/*<Sidebar isSearchOpen={isSearchOpen} onSearchClick={handleSearchClick} />*/}
            {/*{isSearchOpen && <Search />}*/}
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login-by-sms" element={<LogBySMS/>} />
                    <Route path="/login-by-email" element={<LogByEmail/>}/>
                    <Route path="/google" element={<Google/>}/>
                    <Route path="/navbar" element={<Navbar/>}/>
                    <Route path="/searchbar" element={<Searchbar/>}/>
                    <Route path="/list" element={<List/>}/>
                    <Route path="/footer" element={<Footer/>}/>
                    <Route path="/banner" element={<Banner/>}/>
                    <Route path="/pagedetails" element={<Pagedetails/>}/>
                    <Route path="/productcontainer" element={<Productcontainer/>}/>
                    <Route path="/topbar" element={<Topbar/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/shoppingcart" element={<Shoppingcart/>}/>
                    <Route path="/shoppage" element={<Shoppage/>}/>
                    <Route path="/showbar" element={<Showbar/>}/>

                    <Route path="/newpage" element={<Newpage/>}/>
                    <Route path="/checkpage" element={<Checkpage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
