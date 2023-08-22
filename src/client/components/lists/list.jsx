import React from 'react';
import ElectronicList from "./productlist/ElectronicList";
import ProductList from "./productlist/productlist";
import Showbar from "../pagedetail/suggestshow/showbar";

const List = () => {
  return(
      <div style={{
          width:'80%',
          height:'10%',
          position: 'relative',
          left: '50%',
          transform: 'translate(-50%, -50%)',
      }}>
          <ElectronicList/>
          <ProductList/>
      </div>
  )
}

export default List
