import React from "react";

const styles={
    productcontainer:{
        height:'300px',
        width:'300px',
        overflow: 'hidden', // Add this line
    },
    imagecontainer:{
        height:'60%',
        width: '60%',
    },
    // Other styles remain the same
}

const Product = ({ product }) => {
    return(
        <div className='productcontainer' style={styles.productcontainer}>
            <div className='imagecontainer' style={styles.imagecontainer}>
                <img src={product.image} alt={product.name} style={{width: '100%', height: '100%'}}/>
            </div>
            <div className='infocontainer' style={styles.infocontainer}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.stock}</p>
            </div>
        </div>
    )
}


export default Product
