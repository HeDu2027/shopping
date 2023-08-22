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
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...productToAdd, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const productIndex = cart.findIndex(p => p.id === productId);

        if (productIndex !== -1) {
            const updatedCart = [...cart];
            if (updatedCart[productIndex].quantity > 1) {
                updatedCart[productIndex].quantity -= 1;
            } else {
                updatedCart.splice(productIndex, 1);
            }
            setCart(updatedCart);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );

};
