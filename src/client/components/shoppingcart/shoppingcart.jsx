import React from "react";
import Cart from "./cart";
import product from "./products";

const Shoppingcart = () => {

    const styles={
        button:{
            width:'150px',
            height:'40px',
            borderRadius:'5px',
            background:'blue',
            color:'white',
            fontWeight:'bold',
            fontSize:'20px'
        }
    }
  return(
      <div>
          <div>
              <Cart/>
          </div>
      </div>
  )
}

export default Shoppingcart
