import React, {useState} from 'react';
import {FaEbay} from "react-icons/fa";
import {FiSearch} from "react-icons/fi";
import {SiEbay} from "react-icons/si";

function SearchBar() {
    const [showPopup, setShowPopup] = useState(false);

    const Popup = () => (
        <div style={{ position: 'absolute', width: '400px', height: '400px', backgroundColor: 'white' }}>
            <div>
                <div className='label-container'>
                    <div className='motors-container'>
                        <p>Motors</p>
                        <p>Motors</p>
                        <p>Motors</p>
                        <p>Motors</p>
                    </div>
                </div>
                <div className='button-container'>

                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', height: '50px' , margin: '0 auto'}}>
                <SiEbay size={40} color= ' #0064D2'/>
                <button onClick={() => setShowPopup(!showPopup)} style={{ height: '40px', border: 'none', backgroundColor: 'transparent', fontSize:15 }}>Shop by category</button>
                <div style={{ marginRight: '20px' }}>
                    {/* Your component goes here */}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <div style={{display: 'flex', border: '1px solid gray', width: '100%', height: '42px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <FiSearch size={22} />
                        </div>

                        <input
                            onFocus={(e) => e.preventDefault()}
                            style={{ height: '40px', flexGrow: 1,width: '550px',border:'none' }}
                            placeholder="Search..."
                        />
                        <select style={{ height: '40px' ,width:'150px',border:'none'}}>
                            <option value="electronics">All Categories</option>
                            <option value="fashion">Fashion</option>
                            <option value="homeGarden">Home & Garden</option>
                            <option value="motors">Motors</option>
                            <option value="sportingGoods">Sporting Goods</option>
                            <option value="toysHobbies">Toys & Hobbies</option>
                            <option value="healthBeauty">Health & Beauty</option>
                            <option value="collectibles">Collectibles</option>
                            <option value="art">Art</option>
                            <option value="books">Books</option>
                            <option value="businessIndustrial">Business & Industrial</option>
                            <option value="computersTablets">Computers/Tablets & Networking</option>
                            <option value="cellPhonesAccessories">Cell Phones & Accessories</option>
                            <option value="jewelryWatches">Jewelry & Watches</option>
                            <option value="consumerElectronics">Consumer Electronics</option>
                            <option value="baby">Baby</option>
                            <option value="petSupplies">Pet Supplies</option>
                            <option value="movies">Movies</option>
                            <option value="music">Music</option>
                            <option value="videoGames">Video Games & Consoles</option>
                            <option value="antiques">Antiques</option>
                            <option value="camerasPhoto">Cameras & Photo</option>
                            <option value="travel">Travel</option>
                            <option value="ticketsExperiences">Tickets & Experiences</option>
                            <option value="everythingElse">Everything Else</option>
                        </select>
                    </div>
                    <div style={{ marginRight: '20px' }}>
                        {/* Your component goes here */}
                    </div>
                    <button style={{ height: '40px',width:'180px',backgroundColor:'#00aced',color:'white',fontSize:'17px',border:'none '}}>Search</button>
                </div>
                <label
                    className="label"
                    style={{height: 40, lineHeight: '40px',marginLeft:'10px'}}
                >
                    Advance
                </label>
                {showPopup && <Popup />}
            </div>
        </div>
    );
}

export default SearchBar;
