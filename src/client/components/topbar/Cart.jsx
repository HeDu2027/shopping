import React from "react";
import './styles/Cart.css';
import {useCart} from "./CartContext";

const Cart = ({ cart }) => {
    const { removeFromCart } = useCart();

    const calculateCartHeight = () => {
        return 50 * cart.length;
    };

    return (
        <div className="cart-overlay" style={{ height: `${calculateCartHeight()}px` }}>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>empty</p>
                </div>
            ) : (
                cart.map(product => (
                    <div key={product.id} className="cart-product">
                        <img src={product.mainImage} alt={product.name} className="product-image" />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => removeFromCart(product.id)}>Remove</button>
                    </div>
                ))

            )}
        </div>
    );
};

export default Cart;
