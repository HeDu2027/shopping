import React, {useEffect, useState} from "react";
import {LiaAmazonPay, LiaCcDiscover} from "react-icons/lia";
import slash from "slash";
import {FaAlipay, FaCcDiscover, FaCcMastercard, FaCcPaypal, FaCcVisa} from "react-icons/fa";
import {SiApplepay, SiContactlesspayment, SiGooglepay} from "react-icons/si";
import {BiSolidLockOpen} from "react-icons/bi";
import {PiCurrencyDollarFill} from "react-icons/pi";
import google from "../../auth/google";
import {RiWechatPayFill} from "react-icons/ri";
import WeixinJSBridge from "q";
import * as wx from "dotenv";

const Checkpage = () => {

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showEditButton, setShowEditButton] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [address, setAddress] = useState("He Du, 510 Chemin de Moulares, Residence La Coupole 226, Montpellier, Occitanie 34070, France");
    const [addressDetails, setAddressDetails] = useState({
        country: "",
        firstName: "",
        lastName: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: "",
        countryCode: "",
        phoneNumber: ""
    });
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardHolderName: '',
        isRemembered: false
    });

    const [paymentMethod, setPaymentMethod] = useState(null);

    useEffect(() => {
        // 获取配置参数，例如从你的后端API
        fetch('/api/getWeChatConfig')
            .then(response => response.json())
            .then(data => {
                wx.config({
                    debug: true,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: ['chooseWXPay']
                });
            });
    }, []);
    const handleWechatPay = async () => {
        try {
            const response = await fetch('/api/wechatpay');

            if (response.headers.get('content-type') !== 'application/json') {
                throw new Error('Received non-JSON response');
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
            }

            const data = await response.json();

            if (data && data.prepay_id) {
                invokeWechatPayment(data);
            } else {
                console.error('Prepay ID not found in response:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }


    const invokeWechatPayment = (data) => {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": data.appId,
                "timeStamp": data.timeStamp,
                "nonceStr": data.nonceStr,
                "package": `prepay_id=${data.prepay_id}`,
                "signType": "MD5",
                "paySign": data.paySign
            },
            (res) => {
                if (res.err_msg === "get_brand_wcpay_request:ok") {
                    // 支付成功
                    alert('支付成功！');
                } else {
                    // 支付失败
                    alert('支付失败：' + res.err_msg);
                }
            }
        );
    }



    const handleAliPay = () => {
        // Similar logic for AliPay
    };


    let paymentsClient;

    const [isGooglePayInitialized, setGooglePayInitialized] = useState(false);

    // let retries = 0;
    // const initializeGooglePay = () => {
    //     if (window.google && window.google.payments && window.google.payments.api) {
    //         paymentsClient = new google.payments.api.PaymentsClient({
    //             environment: 'TEST'
    //         });
    //
    //         const paymentDataRequest = {
    //             // ... 其他配置参数
    //         };
    //
    //         paymentsClient.isReadyToPay(paymentDataRequest).then(response => {
    //             if (response.result) {
    //                 const button = paymentsClient.createButton({
    //                     onClick: handleGooglePayClick
    //                 });
    //                 document.getElementById('google-pay-button-container').appendChild(button);
    //                 setGooglePayInitialized(true);
    //             }
    //         });
    //     } else if (retries < 10) { // Increase the number of retries
    //         retries++;
    //         setTimeout(initializeGooglePay, 500); // Retry every half second
    //     }
    // };
    //
    // useEffect(() => {
    //
    //     initializeGooglePay();
    // }, []);


    const handleGooglePayClick = () => {
        const paymentDataRequest = {
            // ... 其他配置参数
        };

        paymentsClient.loadPaymentData(paymentDataRequest).then(paymentData => {
            // 发送支付数据到后端
            fetch('/process-google-pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentData })
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    alert('Payment successful!');
                } else {
                    alert('Payment failed!');
                }
            });
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    // const handleChangePaypal = () => {
    //     setShowPaypal(true);
    //     // 如果您有其他的逻辑，也可以在这里添加
    // };

    const [showPaypal, setShowPaypal] = useState(false);

    useEffect(() => {
        if (showPaypal) {
            // 初始化PayPal按钮
            window.paypal.Buttons({
                createOrder: function(data, actions) {
                    // 这里可以设置订单详情
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '0.01' // 设置您的金额
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    // 订单已批准
                    return actions.order.capture().then(function(details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                    });
                }
            }).render('#paypal-button-container');
        }
    }, [showPaypal]);

    const handleChangePaypal = () => {
        setShowPaypal(!showPaypal);
    }

    const saveCardToDB = async () => {
        try {
            const response = await fetch('http://localhost:4000/card/save-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardDetails)
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error saving card:', error);
        }
    }

    // const fetchCardFromDB = async (userId) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/card/get-card/${userId}`);
    //         const card = await response.json();
    //         if (card) {
    //             setCardDetails(card);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching card:', error);
    //     }
    // }
    //
    // useEffect(() => {
    //     // Assuming you have the user's ID stored in a variable called userId
    //     fetchCardFromDB(userId);
    // }, []);


    const saveAddressToDB = async () => {
        try {
            const requestBody = {
                ...addressDetails,
                //userId: YOUR_USER_ID_HERE // 从你的状态或上下文中获取
            };

            const response = await fetch('http://localhost:4000/address/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error saving address:', error);
        }
    }

    const handleSaveClick = () => {
        const formattedAddress = `
        ${addressDetails.firstName} ${addressDetails.lastName},
        ${addressDetails.street1}
        ${addressDetails.street2}
        ${addressDetails.city}, ${addressDetails.state} ${addressDetails.zip},
        ${addressDetails.country},
        ${addressDetails.countryCode} ${addressDetails.phoneNumber}
    `;
        setAddress(formattedAddress.trim());
        setIsEditable(false);
        saveAddressToDB();
    };


    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleCancelClick = () => {
        setIsEditable(false);
    };


    const handleChange = (payment) => {
        if (selectedPayment === payment) {
            setSelectedPayment(null);
        } else {
            setSelectedPayment(payment);
        }
    };



    return(
      <div>

          <div style={{display:'flex',alignItems:'center'}}>
              <LiaAmazonPay size={70} color='#00aced'/>
              <div style={{marginLeft:'50px',fontSize:'24px',fontWeight:'bold'}}>
                  Checkout
              </div>
          </div>

          <div style={{display:"flex"}}>

              <div>

                  <div style={{height:'400px',width:'700px',border:'1px solid',marginRight:'20px',borderRadius:'5px'}}>

                      <div >
                          <p style={{display:'flex',padding:'10px',fontSize:'20px',fontWeight:'bold'}}>Pay with</p>
                      </div>

                      <hr style={{slash}}/>

                      <div style={{
                          height: selectedPayment === 'visaMasterDiscover' ? '300px' : '50px',
                          alignItems: 'center',
                          display: 'flex'
                      }}>
                          <input
                              type="checkbox"
                              checked={selectedPayment === 'visaMasterDiscover'}
                              onChange={() => handleChange('visaMasterDiscover')}
                          />
                          {selectedPayment === 'visaMasterDiscover' ? (
                              <div style={{height:'500px',width:'700px',border:'1px solid',borderRadius:'5px',backgroundColor:'gray'}}>

                                  <div style={{padding:'20px'}}>
                                      <div style={{padding:'5px'}}>
                                          Credit or debit card
                                      </div>
                                      <div style={{padding:'5px'}}>
                                          <BiSolidLockOpen size={24} color='black'/>Your payment is secure. Your card details will not be shared with sellers.
                                      </div>
                                  </div>

                                  <div>
                                      <input placeholder='card number'
                                             value={cardDetails.cardNumber}
                                             onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                                             style={{width:'200px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                      }}/>

                                  </div>

                                  <div>
                                      <input placeholder='MM/YY' style={{width:'200px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                          marginTop:'20px'
                                      }}/>

                                      <input placeholder='security code' style={{width:'200px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                          marginTop:'20px'
                                      }}/>
                                  </div>

                                  <div>
                                      <input placeholder='first name' style={{width:'200px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                          marginTop:'20px'
                                      }}/>

                                      <input placeholder='last name' style={{width:'200px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                          marginTop:'20px'
                                      }}/>

                                      <button onClick={saveCardToDB}>Save</button>
                                  </div>

                                  <div style={{marginLeft:'20px',marginTop:'10px',display:'flex',alignItems:'center'}}>
                                      <input   type={"checkbox"} checked={cardDetails.isRemembered}
                                               onChange={() => setCardDetails(prev => ({ ...prev, isRemembered: !prev.isRemembered }))}/>
                                      <div style={{marginLeft:'10px'}}>Remember this card for future orders</div>
                                  </div>

                                  <div style={{marginLeft:'20px',marginTop:'10px',fontWeight:'bold'}}>
                                      Billing address
                                  </div>

                                  <div style={{marginLeft:'20px',marginTop:'10px'}}>
                                      {addressDetails.country} <br />
                                      {addressDetails.firstName} {addressDetails.lastName} <br />
                                      {addressDetails.street1} <br />
                                      {addressDetails.street2} <br />
                                      {addressDetails.city}, {addressDetails.state} {addressDetails.zip} <br />
                                      {addressDetails.countryCode} {addressDetails.phoneNumber}
                                  </div>

                                  <div style={{marginLeft:'20px',marginTop:'10px'}}>
                                      <a>Edit your billing address</a>
                                  </div>

                                  <div style={{display:'flex',marginLeft:'20px',marginBottom:'20px',marginTop:'20px'}}>
                                      <div>
                                          <button style={{
                                              height:'40px',
                                              width:'120px',
                                              borderRadius:'5px',
                                              backgroundColor:'#00aced',
                                              border:'none',
                                              color:'white',
                                              fontWeight:'bold',
                                              marginLeft:'50px'
                                          }}>
                                              Done
                                          </button>
                                      </div>

                                      <div>
                                          <button style={{
                                              height:'40px',
                                              width:'120px',
                                              borderRadius:'5px',
                                              backgroundColor:'white',
                                              border:'1px solid #00aced',
                                              color:'#00aced',
                                              fontWeight:'bold',
                                              marginLeft:'50px'
                                          }}>
                                              Cancel
                                          </button>
                                      </div>
                                  </div>

                              </div>
                          ) : (
                              <div style={{padding:'15px'}}>
                                  <FaCcVisa size={40} color='#1A1F71' style={{marginRight:'5px'}} />
                                  <FaCcMastercard size={40} color='#FFA200' style={{marginRight:'5px'}}/>
                                  <FaCcDiscover size={40} color='#FF6600' style={{marginRight:'5px'}}/>
                              </div>
                          )}
                      </div>



                      <hr style={{slash}}/>

                      <div style={{height:'50px', alignItems:'center', display:'flex'}}>
                          <input type="radio" />
                          <div style={{padding:'15px'}}>
                              <FaCcPaypal size={40} color='#0070BA' style={{marginRight:'5px'}}/>
                          </div>
                          <div>
                              <button onClick={handleChangePaypal}>paypal</button>
                          </div>
                          {showPaypal && <div id="paypal-button-container"></div>}
                      </div>

                      <hr style={{slash}}/>

                      <div style={{height:'50px', alignItems:'center', display:'flex'}}>
                          <input type="radio" onChange={() => {}} />
                          <div style={{padding:'15px'}}>
                              <RiWechatPayFill size={40} color='#1DB954' style={{marginRight:'5px'}} />
                              <FaAlipay size={40} color='#1DB954' style={{marginRight:'5px'}} />
                          </div>
                          <div>
                              <button onClick={handleWechatPay}>WechatPay</button>
                              <button onClick={handleAliPay}>AliPay</button>
                          </div>
                      </div>

                      <hr style={{slash}}/>

                      <div style={{height:'50px',alignItems:'center',display:'flex'}}>
                          <input
                              type="radio"
                              onChange={handleChange}
                          />

                          <div style={{padding:'15px'}}>
                              <SiApplepay size={40} color='black' style={{marginRight:'5px'}} />
                              <SiGooglepay size={40} color='black' style={{marginRight:'5px'}} />
                          </div>

                          <div>
                              <div id="google-pay-button-container"></div>
                          </div>

                          <div>
                              <button >Initialize Google Pay</button>
                          </div>


                      </div>

                      <hr style={{slash}}/>

                  </div>

                  <div style={{height:'180px',width:'700px',border:'1px solid',marginRight:'20px',borderRadius:'5px',marginTop:'20px'}}>

                      <div style={{marginLeft:'20px',marginTop:'30px',fontWeight:'bold'}}>
                          Ship To
                      </div>

                      {isEditable ? (
                          <div style={{
                              height:'420px',
                              width:'700px',
                              border:'1px solid',
                              borderRadius:'5px',
                              backgroundColor:'#f5f5f5',
                              padding:'20px',
                          }}>

                                  <div>
                                      <input placeholder='Country or Region'
                                             value={addressDetails.country}
                                             onChange={(e) => setAddressDetails(prev => ({ ...prev, country: e.target.value }))}
                                             style={{
                                          width:'260px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          padding:'10px',
                                          marginLeft:'20px',
                                          border:'1px solid',
                                          marginTop:'20px'
                                      }}/>

                                  </div>

                                  <div>

                                      <div>
                                          <input placeholder='First Name'
                                                 value={addressDetails.firstName}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, firstName: e.target.value }))}
                                                 style={{width:'260px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                          <input placeholder='Last Name'
                                                 value={addressDetails.lastName}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, lastName: e.target.value }))}
                                                 style={{width:'260px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                      </div>

                                      <div>
                                          <input placeholder='Street Address'
                                                 value={addressDetails.street1}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, street1: e.target.value }))}
                                                 style={{width:'260px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                          <input placeholder='Street Address 2'
                                                 value={addressDetails.street2}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, street2: e.target.value }))}
                                                 style={{width:'260px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                      </div>

                                      <div>
                                          <input placeholder='city'
                                                 value={addressDetails.city}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, city: e.target.value }))}
                                                 style={{width:'170px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                          <input placeholder='state/province/Region'
                                                 value={addressDetails.state}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, state: e.target.value }))}
                                                 style={{width:'170px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                          <input placeholder='zip code'
                                                 value={addressDetails.zip}
                                                 onChange={(e) => setAddressDetails(prev => ({ ...prev, zip: e.target.value }))}
                                                 style={{width:'170px',
                                              height:'40px',
                                              borderRadius:'5px',
                                              padding:'10px',
                                              marginLeft:'20px',
                                              border:'1px solid',
                                              marginTop:'20px'
                                          }}/>
                                      </div>

                                  </div>

                                  <div>
                                  <input placeholder='country code'
                                         value={addressDetails.countryCode}
                                         onChange={(e) => setAddressDetails(prev => ({ ...prev, countryCode: e.target.value }))}
                                         style={{width:'260px',
                                      height:'40px',
                                      borderRadius:'5px',
                                      padding:'10px',
                                      marginLeft:'20px',
                                      border:'1px solid',
                                      marginTop:'20px'
                                  }}/>
                                  <input placeholder='phone number'
                                         value={addressDetails.phoneNumber}
                                         onChange={(e) => setAddressDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                         style={{width:'260px',
                                      height:'40px',
                                      borderRadius:'5px',
                                      padding:'10px',
                                      marginLeft:'20px',
                                      border:'1px solid',
                                      marginTop:'20px'
                                  }}/>
                              </div>

                                  <div style={{padding:'5px'}}>

                                     <button onClick={handleSaveClick}
                                             style={{
                                         width:'150px',
                                         height:'40px',
                                         borderRadius:'5px',
                                         border:'none',
                                         backgroundColor:'#00aced',
                                         color:'white',
                                         fontWeight:'bold',
                                         marginLeft:'30px',
                                         marginTop:'20px'
                                     }}>
                                         Save
                                     </button>

                                      <button onClick={handleCancelClick} style={{
                                          width:'150px',
                                          height:'40px',
                                          borderRadius:'5px',
                                          border:'none',
                                          backgroundColor:'#00aced',
                                          color:'white',
                                          fontWeight:'bold',
                                          marginLeft:'80px'
                                      }}>
                                          Cancel
                                      </button>
                                  </div>

                          </div>
                      ) : (
                          <div style={{marginLeft:'20px',marginTop:'10px'}}>
                              {address}
                          </div>
                      )}

                      <div style={{display:'flex'}}>

                          <div style={{marginLeft:'20px',marginTop:'10px',marginRight:'40px'}}>
                              <button style={{
                                      width:'90px',
                                      height:'30px',
                                      borderRadius:'5px',
                                      border:'none',
                                      backgroundColor:'#00aced',
                                      color:'white',
                                      marginTop:'10px'
                                  }}
                                  onClick={() => setShowEditButton(!showEditButton)}>Change Address</button>
                          </div>

                          {showEditButton && (
                              <div>
                                  <button style={{
                                      width:'90px',
                                      height:'30px',
                                      borderRadius:'5px',
                                      border:'none',
                                      backgroundColor:'#00aced',
                                      color:'white',
                                      marginTop:'20px'
                                  }} onClick={handleEditClick}>Edit</button>
                              </div>
                          )}

                      </div>

                  </div>

              </div>

              <div style={{height:'400px',width:'300px',border:'1px solid',borderRadius:'5px'}}>

                  <div style={{padding:'20px'}}>

                      <div style={{display:'flex',marginTop:'10px'}}>
                          <div style={{marginRight:'150px'}}>
                              Item({})
                          </div>
                          <div>
                              $
                          </div>
                      </div>

                      <div style={{display:'flex',marginTop:'10px'}}>
                          <div style={{marginRight:'150px'}}>
                              Shipping
                          </div>
                          <div>
                              Free
                          </div>
                      </div>

                      <div style={{display:'flex',marginTop:'10px'}}>
                          <div style={{marginRight:'150px'}}>
                              Discounts
                          </div>
                          <div>
                              $0
                          </div>
                      </div>
                  </div>

                  <hr style={{border: '1px solid gray',width:'90%',margin:'auto'}} />

                  <div style={{display:'flex',marginTop:'10px',marginLeft:'20px'}}>
                      <div style={{marginRight:'150px',fontWeight:'bold',fontSize:'20px'}}>
                          Subtotal
                      </div>
                      <div>
                          $
                      </div>
                  </div>

                  <div style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display:'flex',
                      marginTop:'20px'
                  }}>
                      <div style={{
                          height:'70px',
                          width:'80%',
                          backgroundColor:'gray',
                          borderRadius:'5px'
                      }}>

                      </div>
                  </div>

                  <div style={{
                      display:'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}>
                      <button style={{
                          height:'40px',
                          width:'80%',
                          borderRadius:'5px',
                          backgroundColor:'#00aced',
                          marginTop:'20px',
                          border:'none',
                          fontWeight:'bold',
                          color:'white',
                      }}><BiSolidLockOpen size={24} style={{marginRight:'10px'}}/>Confirm and Pay</button>
                  </div>

                  <hr style={{border: '1px solid gray',width:'90%',margin:'auto',marginTop:'20px'}} />

                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <PiCurrencyDollarFill size={30} color='#00aced' />
                      <div style={{justifyContent: 'center', alignItems: 'center',padding:'5px'}}>
                          <p>MONEY BACK GUARANTEE</p>
                      </div>
                  </div>

              </div>

          </div>

      </div>
  )
}

export default Checkpage
