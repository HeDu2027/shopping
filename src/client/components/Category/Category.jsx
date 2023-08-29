import React from "react";
import { Link } from "react-router-dom";
import './Category.css'

const Category = ({ data, className }) => {
    return (
        <div className={`category-wrapper ${className}`}>
            <div className="category-container">
                {data.map((category, index) => (
                    <Link to={`/productcontainer/${category.name}`} key={index}>
                        <div className="category-item">
                            <img src={category.image} alt={category.name} className="category-image"/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}


export default Category;
