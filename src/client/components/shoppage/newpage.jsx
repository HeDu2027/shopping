import React, { useState } from "react";
import { useCart } from "../topbar/CartContext";
import Searchbar from "../searchbar/searchbar";
import './NewPage.css';
import {FaPlusSquare} from "react-icons/fa";
import {AiFillMinusCircle} from "react-icons/ai";
import {BiSolidPlusCircle} from "react-icons/bi";
import Topbar from "../topbar/Topbar";
import TopbarContainer from "../topbar/TopbarContainer";  // Importieren Sie die CSS-Datei

const Newpage = () => {

    const [itemCount, setItemCount] = useState(1);
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const [removingProducts, setRemovingProducts] = useState([]);

    const handleRemove = (productId) => {
        setRemovingProducts([...removingProducts, productId]);

        setTimeout(() => {
            removeFromCart(productId);
            setRemovingProducts(removingProducts.filter(id => id !== productId));
        }, 1000); // Warten Sie 1 Sekunde (1000ms), was der Dauer der Animation entspricht
    };

    const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2);
    const handleSelectChange = (event) => {
        setItemCount(event.target.value);
    };

    return (
        <div className="newpage-container">
            <div className="newpage-width">
                <div className="topbar-container">
                    <TopbarContainer cart={cart}/>
                </div>

                <div style={{ height: '30px' }}></div>

                <div className="newpage-signout">
                    You're signed out right now. To save these items or see your previously saved items,
                </div>

                <div style={{ height: '20px' }}></div>

                <div >
                    {cart.map(product => (
                        <div key={product.id} className={`newpage-product ${removingProducts.includes(product.id) ? 'drop-remove' : ''}`}>
                            <div style={{ padding: '15px' }}>
                                <img src={product.mainImage} alt={product.name} className="newpage-product-image" />
                            </div>
                            <div className="newpage-product-name">
                                {product.name}
                            </div>

                            <div className="quantity-container">

                                <div className="plusandminus-container">
                                    <button onClick={() => decreaseQuantity(product.id)}><AiFillMinusCircle size={28} color='#25d366'/></button>
                                    <input value={product.quantity}
                                        onChange={handleSelectChange}
                                        className="newpage-product-select">
                                    </input>
                                    <button onClick={() => increaseQuantity(product.id)}><BiSolidPlusCircle size={28} color='#25d366'/></button>
                                </div>

                                <div style={{marginLeft:'25px',marginTop:'10px'}}>
                                    Stock: {product.stock}
                                </div>

                                {}

                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column',margin:'20px' }}>
                                <div className="newpage-product-price">
                                    ${product.price}
                                </div>
                                <div className="newpage-product-shipping">
                                    Free shipping
                                </div>
                            </div>

                            <div
                                 style={{
                                marginBottom: '70px',
                                height: '30px',
                                width: '100px',
                                borderRadius: '10px',
                                backgroundColor: '#25d366',
                                display: 'flex',  // Hinzugefügt
                                alignItems: 'center',  // Zentriert den Inhalt vertikal
                                justifyContent: 'center'  // Zentriert den Inhalt horizontal
                            }}>
                                <button style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    border: 'none',  // Entfernt den Standard-Button-Rahmen
                                    background: 'transparent'  // Setzt den Hintergrund des Buttons auf transparent
                                }} onClick={() => handleRemove(product.id)}>Remove</button>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="newpage-summary">
                    <div style={{marginLeft:'800px',fontWeight:'bold',fontSize:'26px'}}>
                        <p>Total: {totalQuantity}</p>
                    </div>

                    <div style={{marginLeft:'800px',fontWeight:'bold',fontSize:'26px'}}>
                        <p>Total Price: ${totalPrice}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Newpage;
