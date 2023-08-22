import React, { useRef } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import ShowItem from "./ShowItem";
import './style/showbar.css'
const Showbar = ({data, addToCart}) => {

    console.log("Showbar addToCart:", typeof addToCart);

    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="showbar-wrapper">
            <BsArrowLeftSquareFill
                className="arrow-icon left-arrow"
                onClick={() => scroll(-100)}
            />

            <div ref={scrollContainer} className="showbar-container">
                {data.map((showitem, index) => (
                    <div key={index} className="showbar-item">
                        <ShowItem product={showitem} addToCart={addToCart}/>
                    </div>
                ))}
            </div>

            <BsArrowRightSquareFill
                className="arrow-icon right-arrow"
                onClick={() => scroll(100)}
            />
        </div>
    );
}


export default Showbar
