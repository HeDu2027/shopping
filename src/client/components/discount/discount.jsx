import React from "react";
import './Discount.css'
import DiscountData from "./DiscountData";
const Discount = () => {

    return (
        <div className="discount-wrapper">

            <div className="discount-container">
                {DiscountData.map((discount, index) => (
                    <div key={index} className="discount-item">
                        <img src={discount.image} alt={discount.name} className="image"/>
                    </div>
                ))}
            </div>

        </div>
    );
}


export default Discount
