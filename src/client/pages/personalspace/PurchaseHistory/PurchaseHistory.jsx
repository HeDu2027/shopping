import React, {useEffect, useState} from "react";
import Topbar from "../../../components/topbar/Topbar";
import axios from "axios";

const PurchaseHistory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch user's browser history products from the backend
        const fetchPurchase = async () => {
            try {
                const response = await axios.get('/path-to-your-backend-api/user/browser-history'); // Replace with your API endpoint
                setProducts(response.data.purchaseHistory);
            } catch (error) {
                console.error("Failed to fetch purchase history:", error);
            }
        };
        fetchPurchase();
    }, []);

  return(
      <div className='purchase-history-container'>

          <Topbar/>

          <div className='favorite-content-container'>

              <div className='content-container'>

                  <div className='title-container'>
                      <div className='title-wrapper'>
                          Purchased Products
                      </div>
                  </div>

                  <div className='item-list-container'>
                      {products.map(product => (
                          <Product key={product.productId} data={product} />
                      ))}
                  </div>
              </div>
          </div>
      </div>
  )
}

const Product = ({ data }) => {
    return (
        <div className='card-wrapper'>
            <img className='image-wrapper' src={data.image} alt={data.name} />
            <div className='name-wrapper'>
                {data.name}
            </div>
        </div>
    );
}
export default PurchaseHistory
