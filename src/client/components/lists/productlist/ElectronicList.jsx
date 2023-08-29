import React, { useRef } from "react";
import {BsArrowLeftSquareFill, BsArrowRight, BsArrowRightSquareFill} from "react-icons/bs";
import ShowItem from "../../pagedetail/suggestshow/ShowItem";
import '../../pagedetail/suggestshow/style/showbar.css'
import ElectronicProducts from "./ElectronicData";
const ElectronicList = () => {
    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="showbar-wrapper">

            {}
            {}
            {}
            {}
            {}
            {}

            <div ref={scrollContainer} className="showbar-container">
                {ElectronicProducts.map((showitem, index) => (
                    <div key={index} className="showbar-item">
                        <ShowItem product={showitem} />
                    </div>
                ))}
            </div>


        </div>
    );
}


export default ElectronicList
