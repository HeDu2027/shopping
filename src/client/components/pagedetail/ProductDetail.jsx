import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {FaCcDiscover, FaCcMastercard, FaCcPaypal, FaCcVisa, FaGooglePay} from "react-icons/fa";
import {BiMinus, BiPlus} from "react-icons/bi";
import Footer from "../footer/footer";
import { ClothingData, getRandomRating } from '../../data/Clothing/ProductData';
import Showbar from "./suggestshow/showbar"; // Replace with the actual path
import {Data} from '../../data/datas'
import Topbar from "../topbar/Topbar";
import StarRating from "./suggestshow/StarRating";
import axios from "axios";
import { useUser } from "../../pages/personalspace/userContext/UserContext";
import CommentSection from "../comment/CommentSection"; // Update this path if necessary

const ProductDetail = () => {

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
            color:'gray',
        },
        itemButton:{
            height:'60px',
            width:'200px',
            borderRadius:'30px',
            background:'#25d366',
            border:'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        numberInput:{
            height: '35px',
            width: '18px',
            border: 'none',
            backgroundColor:'#F2F2F2',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight:'bold',
            fontSize:'24px'

        },
        tagContainer:{
            width:'200px',
            height:'50px',
            background: 'gray',
            borderRadius: '6px'
        },
    }

    const { user: loggedInUser, updateUser } = useUser();


    const { id } = useParams();
    console.log("Retrieved ID:", id);
    useEffect(() => {
        // Fetch product data from the backend
        console.log("Fetching product details for ID:", id);

        axios.get(`http://localhost:4000/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setSelectedImage(response.data.mainImage);  // Update selectedImage here

                // Update user's browsing history
                if (loggedInUser?._id) {
                    const token = localStorage.getItem('jwtToken');
                    if (token) {
                        axios.post(`http://localhost:4000/user/${loggedInUser._id}/add-to-history`, {                            productId: response.data._id
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(() => {
                            console.log("Browsing history updated successfully.");
                        }).catch(error => {
                            console.error("Error updating browsing history:", error);
                        });
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });

    }, [id, loggedInUser]);

    const [product, setProduct] = useState(null); // Initialize product state to null
    const [selectedImage, setSelectedImage] = useState("");
    useEffect(() => {
        // Fetch product data from the backend
        axios.get(`http://localhost:4000/product/${id}`)

            .then(response => {
                setProduct(response.data);
                setSelectedImage(response.data.mainImage);  // Update selectedImage here
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    const allImages = product ? [product.mainImage, ...product.images] : [];

    useEffect(() => {
        if (product) {
            setSelectedImage(product.mainImage);
        }
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick();
            } else if (event.key === 'ArrowRight') {
                handleNextClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage, product]);

    if (!product) {
        return <div>Product not found!</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handlePrevClick = () => {
        const currentIndex = allImages.indexOf(selectedImage); // Changed images to allImages
        if (currentIndex > 0) {
            setSelectedImage(allImages[currentIndex - 1]);
        } else {
            setSelectedImage(allImages[allImages.length - 1]); // If it's the first image, show the last image
        }
    };

    const handleNextClick = () => {
        const currentIndex = allImages.indexOf(selectedImage); // Changed images to allImages
        if (currentIndex < allImages.length - 1) {
            setSelectedImage(allImages[currentIndex + 1]);
        } else {
            setSelectedImage(allImages[0]); // If it's the last image, show the first image
        }
    };


    const imageName = selectedImage.split('/').pop();
    return (
        <div>

        <div style={{width:'1200px',height:'1500px', margin:'0 auto'}}>

            <div style={{ display: 'flex',  width: '1200x%', height: '50px', marginBottom: '42px' }}>
                <Topbar />
            </div>
            <div>

                <div className="container" style={styles.container}>

                    <div  className='productContainer' style={{display:'flex'}}>
                        <div className='imgContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'10px' }}>

                            <div className='imgContainer' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px',marginLeft:'20px' }}>

                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '600px',
                                        height: '600px',
                                        border: 'none',
                                        marginBottom: '10px',
                                        borderRadius:'15px',
                                        backgroundColor:'wheat',
                                        padding:'5px'
                                    }}>
                                        <FiChevronLeft onClick={handlePrevClick} />
                                        <img src={`http://localhost:4000/productcontainer/images/${imageName}`} alt="Selected" style={{ width: '100%', height: '100%' }} />
                                        <FiChevronRight onClick={handleNextClick} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                                        {allImages.map((image, index) => {
                                            const smallImageName = image.split('/').pop();
                                            return(
                                            <img key={index} src={`http://localhost:4000/productcontainer/images/${smallImageName}`}  alt="Small" onClick={() => handleImageClick(image)}
                                                 style={{ width: '100px', height: '100px',
                                                     borderRadius:'10px',
                                                     backgroundColor:'blanchedalmond',
                                                     padding:'2px',
                                                     border: selectedImage === image ? '1px solid blue' : 'none', cursor: 'pointer',
                                                 }} />
                                        )})}
                                    </div>
                                </div>


                                <div style={{ marginLeft: '20px',width:'500px',marginTop:'50px'}}>
                                    <p className='description' style={styles.description}>{product.name}{product.description}</p>
                                    <hr/>
                                    <div >
                                        <div style={{margin:'5px'}}>
                                            <p>Condition:new</p>

                                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                <p style={{marginRight:'20px'}}><StarRating score={product.rating} /></p>
                                                <p>{product.stock} in stock</p>
                                            </div>

                                            <hr/>
                                        </div>
                                    </div>
                                    <div style={styles.buttoncontainer} style={{display: 'flex',flexDirection:'column',marginLeft:'5px'}}>

                                        <div style={{display: 'flex', alignItems: 'center',marginRight:'10px'}}>
                                            <p style={{marginRight:'10px'}}>Price:</p>
                                            <p style={{fontSize:'24px',fontWeight:'bold'}}>${product.price}</p>
                                            <p style={{fontSize:'24px',fontWeight:'bold'}}>or ${parseFloat(product.price/12).toFixed(2)}/month</p>
                                        </div>

                                        <div>
                                            <p>Suggested payments with 12 months</p>
                                        </div>

                                    </div>
                                    <hr/>

                                    <div style={{height:'60px', width:'200px', backgroundColor:'#F2F2F2',
                                        borderRadius:'30px',
                                        marginLeft:'25px',
                                        display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <BiMinus size={20} color='#25d366'/>
                                        <input  defaultValue='1' style={styles.numberInput}/>
                                        <BiPlus size={20} color='#25d366'/>
                                    </div>

                                    <div style={{marginLeft:'10px',display:'flex',marginBottom:'10px'}}>
                                        <div style={{margin:'15px',marginRight:'40px'}}>
                                            <button className='itemButton' style={styles.itemButton}>Buy</button>
                                        </div>
                                        <div style={{margin:'15px'}}>
                                            <button className='itemButton' style={styles.itemButton}>Add to cart</button>
                                        </div>
                                    </div>


                                    <div style={{height:'10px'}}>

                                    </div>

                                    <div style={{height:'340px',width:'500px',borderRadius:'5px',backgroundColor:'white',padding:'10px'}}>

                                        <div style={{width:'480px',height:'130px',borderRadius:'10px',border:'0.5px solid gray'}}>

                                            <div style={{display:'flex',margin:'10px'}}>
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

                                            <hr/>

                                            <div style={{display:'flex',margin:'10px'}}>
                                                <div style={{marginRight:'10px'}}>
                                                    Returns:
                                                </div>
                                                <div>
                                                    <div >
                                                        30 days returns. Buyer pays for return shipping.
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div style={{height:'5px'}}></div>

                                        <div style={{height:'5px'}}></div>


                                        <div style={{height:'5px'}}></div>

                                        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                                            <div>
                                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                                    <FaGooglePay size={50} color='#25d366'/>
                                                    <FaCcVisa size={50} color='#25d366'/>
                                                    <FaCcMastercard size={50} color='#25d366'/>
                                                    <FaCcPaypal size={50} color='#25d366'/>
                                                    <FaCcDiscover size={50} color='#25d366'/>
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

                    </div>

                </div>
                <div style={{height: '5px'}}></div>

            </div>

            <div>
                <CommentSection/>
            </div>

            {/*<div>*/}
            {/*    <Showbar data={ClothingData}/>*/}
            {/*</div>*/}

            {/*<hr style={{border: '1px solid black',width:'1350px'}} />*/}

            <div>
                <Footer/>
            </div>

            <div style={{height:'50px'}}></div>

        </div>

        </div>
    );
}

export default ProductDetail;
