import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (productToAdd) => {
        const existingProductIndex = cart.findIndex(p => p.id === productToAdd.id);

        if (existingProductIndex !== -1) {
            if (cart[existingProductIndex].quantity < cart[existingProductIndex].stock) {
                const updatedCart = [...cart];
                updatedCart[existingProductIndex].quantity += 1;
                updatedCart[existingProductIndex].stock -= 1; // Decrease stock
                setCart(updatedCart);
            } else {
                alert("Out of stock!!!");
            }
        } else {
            if (productToAdd.stock > 0) {
                setCart(prevCart => [...prevCart, { ...productToAdd, quantity: 1 }]);
                productToAdd.stock -= 1; // Decrease stock
            } else {
                alert("Out of stock!!!");
            }
        }
    };


    const increaseQuantity = (productId) => {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            if (cart[productIndex].stock > 0) {
                const updatedCart = [...cart];
                updatedCart[productIndex].quantity += 1;
                updatedCart[productIndex].stock -= 1; // Decrease stock
                setCart(updatedCart);
            } else {
                alert("Out of stock!!!");
            }
        }
    };

    const decreaseQuantity = (productId) => {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex !== -1 && cart[productIndex].quantity > 1) { // Ensure quantity doesn't go below 1
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity -= 1;
            if (updatedCart[productIndex].stock < cart[productIndex].stock) { // Ensure stock doesn't go below 0
                updatedCart[productIndex].stock += 1; // Increase stock
            }
            setCart(updatedCart);
        } else if (productIndex !== -1 && cart[productIndex].quantity === 1) {
            // If quantity is 1, remove the product from the cart
            const updatedCart = cart.filter(p => p.id !== productId);
            setCart(updatedCart);
        }
    };


    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );

};
