import React, {useState,useEffect} from "react";
import Searchbar from "../searchbar/searchbar";
import {PiArrowUUpLeftBold, PiCurrencyDollarSimpleFill} from "react-icons/pi";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import image1 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l1600.jpg'
import image2 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16001.jpg'
import image3 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16002.jpg'
import image4 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16003.jpg'
import image5 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16004.jpg'
import image6 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16005.jpg'
import image7 from '/Users/hedu/WebstormProjects/shopping/src/client/components/pagedetails/asset/s-l16007.jpg'
import Topbar from "../topbar/topbar";
import {BsLightningCharge, BsPatchCheckFill} from "react-icons/bs";
import {BiSolidBadgeDollar} from "react-icons/bi";
import {HiShoppingBag} from "react-icons/hi";
import {IoMdInformationCircle} from "react-icons/io";
import {FaCcDiscover, FaCcMastercard, FaCcPaypal, FaCcVisa, FaGooglePay} from "react-icons/fa";
import {SiAmericanexpress} from "react-icons/si";
import Showbar from "./suggestshow/showbar";
import Footer from "../footer/footer";


const images = [image1, image2, image3, image4, image5, image6, image7];

const Pagedetails = () => {

    const styles={
        container:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px', // 设置组件之间的距离为10px
        },
        buttoncontainer:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
        },
        productContainer:{

        },
        description:{
            fontSize:'20px',
            fontWeight:'bold',
            color:'gray'
        },
        itemButton:{
            height:'40px',
            width:'160px',
            borderRadius:'6px',
            background:'#1DA1F2',
            border:'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        numberInput:{
            height: '35px',
            width: '40px',
        },
        tagContainer:{
            width:'200px',
            height:'50px',
            background: 'gray',
            borderRadius: '6px'
        },
    }

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handlePrevClick = () => {
        const currentIndex = images.indexOf(selectedImage);
        if (currentIndex > 0) {
            setSelectedImage(images[currentIndex - 1]);
        } else {
            setSelectedImage(images[images.length - 1]); // 如果当前是第一张图片，那么就显示最后一张图片
        }
    };

    const handleNextClick = () => {
        const currentIndex = images.indexOf(selectedImage);
        if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1]);
        } else {
            setSelectedImage(images[0]); // 如果当前是最后一张图片，那么就显示第一张图片
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick();
            } else if (event.key === 'ArrowRight') {
                handleNextClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // 在组件卸载时移除事件监听器
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage]); // 当selectedImage变化时重新添加事件监听器

    return(
        <div style={{width:'1200px',height:'1500px', margin:'0 auto'}}>
            <div>
                <div className="container" style={styles.container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1200px', height: '50px', marginBottom: '0px' }}>
                        <Topbar/>
                    </div>
                    <div style={{ display: 'flex',  width: '1200x%', height: '50px', marginBottom: '0px' }}>
                        <Searchbar/>
                    </div>
                    <div className='titleContailer'>
                        <p className='description' style={styles.description}><PiCurrencyDollarSimpleFill color='red' size={35}/>20% off with code: SAVE4SCHOOL</p>
                    </div>
                    <div  className='productContainer' style={{display:'flex'}}>
                        <div className='imgContainer' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '10px' }}>
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt="Small" onClick={() => handleImageClick(image)} style={{ width: '42px', height: '42px', border: selectedImage === image ? '2px solid blue' : '1px solid black', cursor: 'pointer' }} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '480px', height: '480px', border: '1px solid gray' }}>
                                    <FiChevronLeft onClick={handlePrevClick} />
                                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
                                    <FiChevronRight onClick={handleNextClick} />
                                </div>
                                <div style={{ marginLeft: '20px',width:'500px' }}>
                                    <p className='description' style={styles.description}>Anker PowerExpand USB C Hub Adapter 5-in-1 with 4K HDMI/USB 3.0/SD Card Reader</p>
                                    <hr/>
                                    <div >
                                        <div style={{margin:'5px'}}>
                                            <p>Condition:new</p>
                                            <p>Quantity<input className='numberInput' type='number' defaultValue='1' style={styles.numberInput}/> Limited quantity available / 7 sold</p>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div style={styles.buttoncontainer} style={{display: 'flex', alignItems: 'center'}}>
                                        <div style={{display: 'flex', alignItems: 'center',marginRight:'10px'}}>
                                            <p style={{marginRight:'10px'}}>Price:</p>
                                            <p style={{fontSize:'24px',fontWeight:'bold'}}>$247</p>
                                        </div>
                                        <div style={{marginLeft:'200px'}}>
                                            <div style={{margin:'5px'}}>
                                                <button className='itemButton' style={styles.itemButton}>Buy</button>
                                            </div>
                                            <div style={{margin:'5px'}}>
                                                <button className='itemButton' style={styles.itemButton}>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div style={styles.buttoncontainer}>
                                        <div style={{margin:'5px'}}>
                                            <button className='itemButton' style={styles.itemButton}>Make Offer</button>
                                        </div>
                                        <div style={{margin:'5px'}}>
                                            <button className='itemButton' style={styles.itemButton}>Add to Watchlist</button>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className='tagContainer'>
                                        <div style={{
                                            width: '500px',
                                            height: '90px',
                                            backgroundColor: '#D3D3D3',
                                            borderRadius:'5px',
                                            padding:'10px'
                                        }}>
                                            <div className="App">
                                                <div className="d-flex align-items-center mb-3">
                                                    <PiArrowUUpLeftBold size={30} className="mr-3" style={{marginRight:'10px'}} />
                                                    <p className="mb-0" style={{fontSize:'17px'}}>Breathe easy. Returns accepted.</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <BsLightningCharge size={30} className="mr-3" style={{marginRight:'10px'}} />
                                                    <p className="mb-0" style={{fontSize:'17px'}}>People want this. 17 people are watching this.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{height:'10px'}}>

                                    </div>

                                    <div style={{height:'340px',width:'500px',borderRadius:'5px',backgroundColor:'white',padding:'10px'}}>

                                        <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>
                                                Shipping:
                                            </div>
                                            <div>
                                                <div>
                                                    US $22.60 eBay International Shipping.
                                                </div>
                                                <div style={{fontSize:'14px',color:'gray'}}>
                                                    Located in: Ontario, California, United States
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{height:'5px'}}></div>

                                        <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>
                                                Duties:
                                            </div>
                                            <div>
                                                <div>
                                                    US $0.00 - Estimate, final at checkout.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{height:'5px'}}></div>

                                        <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>
                                                Delivery:
                                            </div>
                                            <div>
                                                <div>
                                                    Estimated between Mon, Aug 28 and Tue, Sep 5 to 71111.
                                                </div>
                                                <div style={{fontSize:'14px',color:'gray'}}>
                                                    Please note the delivery estimate is greater than 17 business days.
                                                    Seller ships within 1 day after receiving cleared payment.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{height:'5px'}}></div>

                                        <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>
                                                Returns:
                                            </div>
                                            <div>
                                                <div >
                                                    30 days returns. Buyer pays for return shipping.
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{height:'5px'}}></div>

                                        <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>
                                                Payments:
                                            </div>
                                            <div>
                                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                                    <FaGooglePay size={50} color='#00aced'/>
                                                    <FaCcVisa size={50} color='#00aced'/>
                                                    <FaCcMastercard size={50} color='#00aced'/>
                                                    <FaCcPaypal size={50} color='#00aced'/>
                                                    <FaCcDiscover size={50} color='#00aced'/>
                                                </div>
                                                <div style={{fontSize:'14px',color:'gray'}}>
                                                    *No Interest if paid in full in 6 months on $99+
                                                </div>
                                            </div>
                                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>
                        <div style={{height:'520px',width:'180px',backgroundColor:'transparent'}}>
                            <div style={{height:'200px',padding:'6px',width:'280px',border:'1px solid',backgroundColor:'transparent',borderRadius:'5px'}}>
                                <div>
                                    <p>Shop with confidence</p>
                                </div>
                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:'10px'}}>
                                        <BsPatchCheckFill size={30} color='#00aced'/>
                                    </div>
                                    <div>
                                        <div>
                                            Direct from Anker
                                        </div>
                                        <div style={{color:'gray'}}>
                                            Item sold directly by the brand.
                                        </div>
                                    </div>
                                </div>

                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:'10px'}}>
                                        <BiSolidBadgeDollar size={30} color='#00aced'/>
                                    </div>
                                    <div>
                                        <div>
                                            eBay Money Back Guarantee
                                        </div>
                                        <div style={{color:'gray'}}>
                                            Get the item you ordered or your money back.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{height:'10px'}}></div>

                            <div style={{height:'300px',padding:'6px',width:'280px',border:'1px solid',backgroundColor:'transparent',borderRadius:'5px'}}>

                                <div>
                                    <p>Shop with confidence</p>
                                </div>

                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:'10px'}}>
                                        <HiShoppingBag size={30} color='#00aced'/>
                                    </div>
                                    <div>
                                        <div>
                                            The Shop of Anker Mainpage
                                        </div>
                                        <div style={{color:'gray'}}>
                                            <a href="/#">Items sold directly by the link.</a>
                                        </div>
                                    </div>
                                </div>

                                <hr style={{ border:'1px dashed gray' }} />

                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:'10px'}}>
                                        <IoMdInformationCircle size={30} color='#00aced'/>
                                    </div>
                                    <div>
                                        <div>
                                            The information for the shops
                                        </div>
                                        <div style={{color:'gray',display:'flex',flexDirection:'column',padding:'2px'}}>
                                            <a href="/#">Contact seller.</a>
                                            <a href="/#">Save seller.</a>
                                            <a href="/#">visit store.</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Showbar/>
                <div style={{height: '50px'}}></div>

            </div>
            <hr style={{border: '1px solid black',width:'1350px'}} />
            <div>
                <div>    About eBayAnnouncementsCommunitySecurity CenterSeller CenterPoliciesAffiliatesHelp & ContactSite Map</div>
            </div>
            <div style={{height:'50px'}}></div>
        </div>

  )
}

export default Pagedetails
