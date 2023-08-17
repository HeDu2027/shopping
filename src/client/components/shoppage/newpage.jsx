// import React, {useEffect, useState} from "react";
// import Topbar from "../topbar/topbar";
// import Searchbar from "../searchbar/searchbar";
// import products from "../shoppingcart/products"; // 导入products
// import { FaTrash } from 'react-icons/fa'; // 导入删除图标
//
// const Newpage = () => {
//
//     const [productList, setProductList] = useState(products.map(product => ({...product, count: 1}))); // 为每个产品添加一个新的属性来存储它的数量
//     const totalPrice = productList.reduce((total, product) => total + product.price * product.count, 0);
//     const discountValue = 0; // 这里是一个示例值，你可以根据实际情况修改
//     const subtotal = totalPrice + discountValue;
//
//     const handleSelectChange = (event, id) => { // 修改handleSelectChange函数，使它接受一个产品的id作为参数
//         const newProductList = productList.map(product => {
//             if (product.id === id) {
//                 return {...product, count: parseInt(event.target.value)};
//             } else {
//                 return product;
//             }
//         });
//         setProductList(newProductList);
//     };
//
//     const handleDelete = (id) => { // 创建一个函数来处理删除操作
//         setProductList(productList.filter(product => product.id !== id));
//     };
//
//     // 计算所有商品的数量总和
//     const totalItemCount = productList.reduce((total, product) => total + product.count, 0);
//
//
//
//     return(
//         <div style={{display:'flex', flexDirection: 'column', alignItems: 'center',height:'1200px'}}>
//             <div style={{width: '1200px', margin: '0 auto'}}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', marginBottom: '0px' }}>
//                     <Topbar/>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'center', height: '50px', marginBottom: '0px' }}>
//                     <Searchbar/>
//                 </div>
//                 <div style={{display:'flex', alignItems: 'center'}}>
//                     <div style={{fontWeight:'bold',fontSize:'24px',marginRight:'850px'}}>
//                         Shopping cart
//                     </div>
//                     <div>
//                         Send Us Your Comments
//                     </div>
//                 </div>
//
//                 <div style={{height:'30px'}}></div>
//
//                 <div style={{borderRadius:'5px',height:'50px',width:'1200px',backgroundColor:'#00aced',color:'white',display:'flex',alignItems:'center'}}>
//                     You're signed out right now. To save these items or see your previously saved items,
//                 </div>
//
//                 <div style={{height:'20px'}}></div>
//
//                 <div style={{display:'flex'}}>
//
//                     <div>
//                         {productList.map((product) => ( // 遍历productList数组并显示每个产品的信息
//                             <div style={{display:'flex'}} key={product.id}>
//                                 <div style={{display:'flex',height:'250px',width:'900px',border:'1px solid gray',borderRadius:'5px',marginRight:'20px'}}>
//
//                                     <div style={{padding:'15px'}}>
//                                         <img src={product.picture} alt={product.title} style={{height:'220px',width:'220px',border:'1px solid',borderRadius:'5px'}}/>
//                                     </div>
//
//                                     <div style={{padding:'30px',width:'300px',fontWeight:'bold'}}>
//                                         {product.title}
//                                     </div>
//
//                                     <div style={{marginLeft:'20px',marginTop:'40px',width:'80px',height:'40px'}}>
//                                         <select value={product.count} // 使用product.count作为select的value
//                                                 onChange={(event) => handleSelectChange(event, product.id)}
//                                                 style={{width:'70px',height:'40px',
//                                                     alignItems:'center',
//                                                     backgroundColor:'transparent',
//                                                     borderRadius:'5px',
//                                                     border:'1px solid'
//                                                 }}>
//                                             <option>1</option>
//                                             <option>2</option>
//                                             <option>3</option>
//                                             <option>4</option>
//                                             <option>5</option>
//                                             <option>6</option>
//                                             <option>7</option>
//                                             <option>8</option>
//                                             <option>9</option>
//                                             <option>10</option>
//                                         </select>
//
//                                         <div style={{color:'gray',width:'200px',marginTop:'20px'}}>Standard Shipping</div>
//                                     </div>
//
//                                     <div style={{display:'flex',flexDirection:'column'}}>
//
//                                         <div style={{marginTop:'40px',marginLeft:'70px',fontWeight:'bold',fontSize:'24px'}}>
//                                             ${product.price}
//                                         </div>
//
//                                         <div style={{marginLeft:'70px',marginTop:'25px',marginBottom:'40px',color:'gray'}}>
//                                             Free shipping
//                                         </div>
//
//                                     </div>
//
//                                     <div style={{padding:'15px'}}>
//                                         <FaTrash onClick={() => handleDelete(product.id)} /> {/* 添加删除图标，并在点击时调用handleDelete函数 */}
//                                     </div>
//
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//
//                     <div>
//                         <div style={{height:'250px',width:'380px',border:'1px solid gray',borderRadius:'5px'}}>
//
//                             <div style={{padding:'20px'}}>
//
//                                 <button style={{width:'300px',height:'50px',borderRadius:'5px',border:'none',backgroundColor:'#00aced',color:'white',fontWeight:'bold'}}>
//                                     Go to checkout
//                                 </button>
//
//                                 <div style={{display:'flex',marginTop:'10px'}}>
//                                     <div style={{marginRight:'210px'}}>
//                                         Item({totalItemCount})
//                                     </div>
//                                     <div>
//                                         ${totalPrice.toFixed(2)}
//                                     </div>
//                                 </div>
//
//                                 <div style={{display:'flex',marginTop:'10px'}}>
//                                     <div style={{marginRight:'210px'}}>
//                                         Shipping
//                                     </div>
//                                     <div>
//                                         Free
//                                     </div>
//                                 </div>
//
//                                 <div style={{display:'flex',marginTop:'10px'}}>
//                                     <div style={{marginRight:'210px'}}>
//                                         Discounts
//                                     </div>
//                                     <div>
//                                         $0
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <hr style={{border: '1px solid gray',width:'90%',margin:'auto'}} />
//
//                             <div style={{display:'flex',marginTop:'10px',marginLeft:'20px'}}>
//                                 <div style={{marginRight:'210px',fontWeight:'bold',fontSize:'20px'}}>
//                                     Subtotal
//                                 </div>
//                                 <div>
//                                     ${subtotal.toFixed(2)}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//
//             </div>
//             <hr style={{border: '1px solid gray',width:'100%',margin:'auto'}} />
//         </div>
//     )
// }
//
// export default Newpage
