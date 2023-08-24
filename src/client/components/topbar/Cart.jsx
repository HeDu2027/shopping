import React from "react";
import './styles/Cart.css';
import {useCart} from "./CartContext";
import {Link} from "react-router-dom";

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
                        <img src={product.mainImage} alt={product.name} className="product-image" />
                        <div className="cart-name">
                            <p>{product.name}</p>
                        </div>
                        <p>{product.price}</p>
                        <div>
                            <button onClick={() => decreaseQuantity(product.id)}>-</button>
                            <p>Quantity: {product.quantity} (Stock left: {product.stock})</p>
                            <button onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(product.id)}>Remove</button>
                    </div>
                ))
            )}
            <div className="cart-summary">
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Price: ${totalPrice}</p>
            </div>

            <Link to="/newpage" className="shop-link">Zum Shop</Link>

        </div>
    );
};

export default Cart;
