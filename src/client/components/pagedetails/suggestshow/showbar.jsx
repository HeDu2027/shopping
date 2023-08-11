import React, {useRef} from "react";
import Showitem from "./showitem";
import products from './products';
import {BsArrowLeftSquareFill, BsArrowRightSquareFill} from "react-icons/bs"; // import your products data

const Showbar = () => {
    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    };

    return(
        <div style={{width: '110%', padding: '0 15px', position: 'relative'}}>
            <BsArrowLeftSquareFill size={25} color='#00aced' onClick={() => scroll(-100)} style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}}/>
            <div ref={scrollContainer} style={{display: 'flex', margin:'20px',overflowX: 'scroll', height: '100%', width: '100%'}}>
                {products.map((product, index) => (
                    <Showitem key={index} product={product} />
                ))}
            </div>
            <BsArrowRightSquareFill size={25} color='#00aced' onClick={() => scroll(100)} style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}/>
        </div>
    )
}

export default Showbar;
