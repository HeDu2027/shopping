import React, {useRef} from 'react';
import { BsArrowRight } from "react-icons/bs";
import products from '/Users/hedu/Downloads/app/shopping/src/client/components/products.js';
import './ProductList.css';
import ProductData from "./ProductData";
import ShowItem from "../../pagedetail/suggestshow/ShowItem";

function ProductList() {

    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="product-list-container">

            <div className="product-list-header">
                <h1>Score these trending kicks</h1>
                <a href="/allproducts" className="see-all-link">
                    <p>See all <BsArrowRight /></p>
                </a>
            </div>

            <div ref={scrollContainer} className="showbar-container">
                {ProductData.map((showitem, index) => (
                    <div key={index} className="showbar-item">
                        <ShowItem product={showitem} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ProductList;
