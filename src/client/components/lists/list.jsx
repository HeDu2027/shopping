import React from 'react';
import ElectronicList from "./productlist/electroniclist";
import ProductList from "./productlist/productlist";

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
