import React, {useEffect, useState} from "react";
import { AiOutlineDelete } from "react-icons/ai";

import initialProducts from "./products"; // 更改导入的名称以避免冲突
const Cart = ({product}) => {
    // 获取商品总数
    const totalProducts = initialProducts.length;

    // 每个商品高度设置为120px
    const productHeight = 120;

    // 购物车高度 = 商品数 * 商品高度 + 顶部总价高度
    const cartHeight = totalProducts * productHeight + 50;

    const [cartProducts, setCartProducts] = useState(initialProducts); // 将商品列表存储在状态中，注意这里的名称已经改变
    const [TotalPrice,setTotalPrice]=useState(0);

    useEffect(() => {
        // 重新计算总价
        const newTotal = cartProducts.reduce((sum, product) => {
            return sum + product.price * product.stock;
        }, 0);

        setTotalPrice(newTotal);

    }, [cartProducts]); // 当商品列表变化时重新计算总价，注意这里的名称已经改变

    const handleDelete = (id) => {
        setCartProducts(cartProducts.filter(product => product.id !== id)); // 删除指定id的商品，注意这里的名称已经改变
    }

    const styles={
        button:{
            width:'150px',
            height:'40px',
            borderRadius:'5px',
            background:'blue',
            color:'white',
            fontWeight:'bold',
            fontSize:'20px',
            border:'none'
        },
    }

    return (
        <div style={{
            position: "absolute",
            top: '100%',
            right: '-20%',
            transform: 'translateX(-50%)',
            width: 260,
            height: cartHeight ,
            backgroundColor: "#1DA1F2",
            border: "none",
            color: "white",
            padding:"15px",
        }}>
            {cartProducts.map(product => ( // 注意这里的名称已经改变
                <div key={product.id}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={product.picture} alt={product.title} style={{width: '100px', height: '100px'}} />

                        <div style={{marginLeft: '15px'}}>
                            <p style={{marginBottom: '5px'}}>{product.title}</p>

                            <div style={{display: 'flex', alignItems: 'center', padding:'5px'}}>
                                <div style={{marginRight: '30px'}}>
                                    <p style={{marginBottom: '5px',fontWeight:'bold'}}>${product.price}</p>
                                </div>
                                <div style={{marginLeft: '20px'}}>
                                    <p style={{marginBottom: '5px'}}>{product.stock}</p>
                                </div>
                            </div>

                            <div style={{display: 'flex', alignItems: 'center',padding:'5px'}}>
                                <div style={{marginRight: '10px'}}>
                                    <p style={{marginBottom: '5px'}}>Free ship</p>
                                </div>
                                <div style={{marginLeft: '5px'}}>
                                    <AiOutlineDelete size={20} onClick={() => handleDelete(product.id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p>Total</p>
                <p style={{marginLeft: '10px',fontWeight:'bold'}}>${TotalPrice}</p>
            </div>
            <div style={{padding: '5px'}}>
                <button className='button' style={styles.button}>Checkout</button>
            </div>
            <div style={{padding: '5px'}}>
                <button className='button' style={styles.button}>View cart</button>
            </div>
        </div>
    );
}

export default Cart;
