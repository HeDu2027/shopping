import React from "react";
import './styles/Cart.css';
import {useCart} from "./CartContext";
import {Link} from "react-router-dom";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import {BiMinus, BiPlus} from "react-icons/bi";

const Cart = ({ cart }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const calculateCartHeight = () => {
        return 50 * cart.length;
    };

    // Calculate total quantity and total price
    const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2);

    return (
        <div className="cart-overlay" style={{ height: `${calculateCartHeight()}px` }}>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>empty</p>
                </div>
            ) : (
                cart.map(product => (
                    <div key={product.id} className="cart-product">
                        <img style={{borderRadius:'10px'}} src={product.mainImage} alt={product.name} className="product-image" />

                        <div className="cart-name">
                            <p style={{fontSize: '12px', marginBottom: '2px',marginTop:'12px'}}>{product.name}</p>
                            <p style={{fontSize: '12px'}}>{product.price}</p>
                        </div>


                        <div style={{display: 'flex', alignItems: 'center', height: '30px', width: '55px', border: '0.5px solid #888888',borderRadius:'5px'}}>
                            <button style={{border: 'none', background: 'none', padding: '0', margin: '0'}} onClick={() => decreaseQuantity(product.id)}>
                                <BiMinus size={22} />
                            </button>
                            <p style={{margin: '0', padding: '0', fontSize: '16px',fontWeight:'bold'}}>{product.quantity}</p>
                            <button style={{border: 'none', background: 'none', padding: '0', margin: '0'}} onClick={() => increaseQuantity(product.id)}>
                                <BiPlus size={22} />
                            </button>
                        </div>


                        <button onClick={() => removeFromCart(product.id)}>
                            <IoMdRemoveCircleOutline size={22}/>
                        </button>
                    </div>
                ))
            )}
            <div className="cart-summary">
                <p style={{fontSize: '12px', marginBottom: '2px'}}>Total Quantity: {totalQuantity}</p>
                <p style={{fontSize: '12px', marginBottom: '2px'}}>Total Price: ${totalPrice}</p>
                <Link to="/newpage" className="shop-link">Zum Shop</Link>
            </div>

        </div>
    );
};

export default Cart;
