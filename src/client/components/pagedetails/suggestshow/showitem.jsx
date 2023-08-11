import React, {useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

const Showitem = ({product}) => {

    const [isHeartFilled, setHeartFilled] = useState(false);

    const toggleHeart = () => {
        setHeartFilled(!isHeartFilled);
    };

    return(
        <div className='container' style={{width:'300px', margin: '0 10px',border:'none'}}>
            <div className='image-container' style={{position: 'relative', width: '220px', height: '220px',border:'none'}}>
                <img src={product.picture} style={{width: '100%', height: '100%', borderRadius:'15px',border:'none'}} />
                <div style={{position: 'absolute', right: '30px', top: '30px', color: 'black'}} onClick={toggleHeart}>
                    {isHeartFilled ? <AiFillHeart size={35} color='#00aced'/> : <AiOutlineHeart size={35} color='#00aced'/>}
                </div>
            </div>

            <div>
                {product.title}
            </div>

            <div style={{height:'3px'}}></div>

            <div style={{fontWeight:'bold'}}>
                ${product.price}
            </div>

            <div style={{height:'3px'}}></div>

            <div>
                {product.stock} sold
            </div>
        </div>
    )
}

export default Showitem;
