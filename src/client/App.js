import React, {useState} from 'react';
import Signup from "./pages/sign/signup";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import ForgotPassword from "./pages/forgetpassword/forgetpassword";
import LogBySMS from "./pages/login/logbysms";
import LogByEmail from "./pages/login/logbyemail";
import Google from "./auth/google";
import Navbar from "./components/navbar/navbar";
import Searchbar from "./components/searchbar/searchbar";
import Footer from "./components/footer/footer";
import Banner from "./components/banner/banner";
import Productcontainer from "./components/productdetails/productcontainer";
import Cart from "./components/shoppingcart/cart";
import Shoppingcart from "./components/shoppingcart/shoppingcart";
import Showbar from "./components/pagedetail/suggestshow/showbar";
import Shoppage from "./components/shoppage/shoppage";
import Newpage from "./components/shoppage/newpage";
import Checkpage from "./components/checkpage/checkpage";
import ProductDetail from "./components/pagedetail/ProductDetail";
import Leavemessage from "./pages/leavemessage/leavemessage";
import Instantmessage from "./pages/message/instantmessage/instantmessage";
import ShareLocation from "./pages/message/ShareLocation/ShareLocation";
import ShareFile from "./pages/message/ShareFile/ShareFile";
import VideoCall from "./pages/message/VideoCall/VideoCall";
import ShareScreen from "./pages/message/ShareScreen/ShareScreen";
import Voicecall from "./pages/message/voicecall/voicecall";
import Emoji from "./pages/message/Emoji";
import CommentSection from "./components/comment/CommentSection";
import {TranslationProvider} from "./components/comment/TranslationContext";
import TopbarContainer from "./components/topbar/TopbarContainer";
import {CartProvider} from "./components/topbar/CartContext";
import PersonalSpace from "./pages/personalspace/PersonalSpace";
import {Provider} from "react-redux";
import store from './redux/store';
import Profile from "./pages/personalspace/Profile/Profile";
import BrowserHistory from "./pages/personalspace/BwoserHistory/BrowserHistory";
import FavoritePage from "./pages/personalspace/FavoritePage/FavoritePage";
import PurchaseHistory from "./pages/personalspace/PurchaseHistory/PurchaseHistory";
import {UserContext,UserProvider} from "./pages/personalspace/userContext/UserContext";

function App() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    console.log("addToCart in App:", addToCart);
    const [loggedInUser, setLoggedInUser] = useState(null);
    return (
        <Provider store={store}>
            <TranslationProvider>
                <CartProvider>
                    <UserProvider>
                        <div style={{display: 'flex'}}>
                            <Router>
                                <Routes>
                                    <Route path="/signup" element={<Signup/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route path="/home" element={<Home addToCart={addToCart}/>}/>
                                    <Route path="/login-by-sms" element={<LogBySMS/>}/>
                                    <Route path="/login-by-email" element={<LogByEmail/>}/>
                                    <Route path="/google" element={<Google/>}/>
                                    <Route path="/navbar" element={<Navbar/>}/>
                                    <Route path="/searchbar" element={<Searchbar/>}/>
                                    <Route path="/footer" element={<Footer/>}/>
                                    <Route path="/banner" element={<Banner/>}/>

                                    <Route
                                        path="/productcontainer/:category"
                                        element={<Productcontainer key={window.location.pathname}/>}
                                    />

                                    <Route path="/cart" element={<Cart/>}/>
                                    <Route path="/shoppingcart" element={<Shoppingcart/>}/>
                                    <Route path="/shoppage" element={<Shoppage/>}/>
                                    <Route path="/showbar" render={() => <Showbar addToCart={addToCart}/>}/>

                                    <Route path="/newpage" element={<Newpage/>}/>
                                    <Route path="/checkpage" element={<Checkpage/>}/>
                                    <Route path="/product/:id" element={<ProductDetail/>}/>
                                    <Route path="/leavemessage" element={<Leavemessage/>}/>

                                    <Route path="/instantmessage" element={<Instantmessage/>}/>
                                    <Route path="/sharelocation" element={<ShareLocation/>}/>
                                    <Route path="/sharefile" element={<ShareFile/>}/>
                                    <Route path="/videocall" element={<VideoCall/>}/>
                                    <Route path="/sharescreen" element={<ShareScreen/>}/>
                                    <Route path="/voicecall" element={<Voicecall/>}/>
                                    <Route path="/emoji" element={<Emoji/>}/>

                                    <Route path="/products/:productId" element={<CommentSection/>}/>

                                    <Route path="/parentcomponent" element={<TopbarContainer/>}/>
                                    <Route path="/personalspace" element={<PersonalSpace/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                    <Route path="/browserhistory" element={<BrowserHistory/>}/>
                                    <Route path="/favoritepage" element={<FavoritePage/>}/>
                                    <Route path="/purchasehistory" element={<PurchaseHistory/>}/>

                                </Routes>
                            </Router>
                        </div>
                    </UserProvider>
                </CartProvider>
            </TranslationProvider>
        </Provider>
    );
}

export default App;
