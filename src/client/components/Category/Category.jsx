import React from "react";
import { Link } from "react-router-dom";
import './Category.css'
import CategoryData from "./CategoryData";

const Category = () => {
    return (
        <div className="discount-wrapper">
            <div className="discount-container">
                {CategoryData.map((discount, index) => (
                    <Link to={`/productcontainer/${discount.name}`} key={index}> {/* Updated this line */}
                        <div className="discount-item">
                            <img src={discount.image} alt={discount.name} className="image"/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Category;
