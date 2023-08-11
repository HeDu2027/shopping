import React, {useState} from "react";
import Topbar from "../topbar/topbar";
import Searchbar from "../searchbar/searchbar";

const Shoppage = () => {

    const [itemCount, setItemCount] = useState(1);

    const handleSelectChange = (event) => {
        setItemCount(event.target.value);
    };

  return(
      <div style={{display:'flex', flexDirection: 'column', alignItems: 'center',height:'1200px'}}>
          <div style={{width: '1200px', margin: '0 auto'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', marginBottom: '0px' }}>
                  <Topbar/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', height: '50px', marginBottom: '0px' }}>
                  <Searchbar/>
              </div>
              <div style={{display:'flex', alignItems: 'center'}}>
                  <div style={{fontWeight:'bold',fontSize:'24px',marginRight:'850px'}}>
                      Shopping cart
                  </div>
                  <div>
                      Send Us Your Comments
                  </div>
              </div>

              <div style={{height:'30px'}}></div>

              <div style={{borderRadius:'5px',height:'50px',width:'1200px',backgroundColor:'#00aced',color:'white',display:'flex',alignItems:'center'}}>
                  You're signed out right now. To save these items or see your previously saved items,
              </div>

              <div style={{height:'20px'}}></div>

              <div style={{display:'flex'}}>

                  <div style={{display:'flex',height:'250px',width:'900px',border:'1px solid gray',borderRadius:'5px',marginRight:'20px'}}>

                      <div style={{padding:'15px'}}>
                          <img style={{height:'220px',width:'220px',border:'1px solid',borderRadius:'5px'}}/>
                      </div>

                      <div style={{padding:'30px',width:'300px',fontWeight:'bold'}}>
                          Anker Triple Display USB C Docking Station 10-in-1 for M1 MacBook Dual HDMI 100W
                      </div>

                      <div style={{marginLeft:'20px',marginTop:'40px',width:'80px',height:'40px'}}>
                          <select value={itemCount}
                                  onChange={handleSelectChange}
                                  style={{width:'70px',height:'40px',
                                  alignItems:'center',
                                  backgroundColor:'transparent',
                                  borderRadius:'5px',
                                  border:'1px solid'
                          }}>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                          </select>

                          <div style={{color:'gray',width:'200px',marginTop:'20px'}}>Standard Shipping</div>
                      </div>

                      <div style={{display:'flex',flexDirection:'column'}}>

                          <div style={{marginTop:'40px',marginLeft:'70px',fontWeight:'bold',fontSize:'24px'}}>
                              $249.99
                          </div>

                          <div style={{marginLeft:'70px',marginTop:'25px',marginBottom:'40px',color:'gray'}}>
                              Free shipping
                          </div>

                      </div>

                  </div>

                  <div style={{height:'250px',width:'380px',border:'1px solid gray',borderRadius:'5px'}}>

                      <div style={{padding:'20px'}}>

                          <button style={{width:'300px',height:'50px',borderRadius:'5px',border:'none',backgroundColor:'#00aced',color:'white',fontWeight:'bold'}}>
                              Go to checkout
                          </button>

                          <div style={{display:'flex',marginTop:'10px'}}>
                              <div style={{marginRight:'210px'}}>
                                  Item({itemCount})
                              </div>
                              <div>
                                  $249.99
                              </div>
                          </div>

                          <div style={{display:'flex',marginTop:'10px'}}>
                              <div style={{marginRight:'210px'}}>
                                  Shipping
                              </div>
                              <div>
                                  Free
                              </div>
                          </div>

                          <div style={{display:'flex',marginTop:'10px'}}>
                              <div style={{marginRight:'210px'}}>
                                  Discounts
                              </div>
                              <div>
                                  $0
                              </div>
                          </div>
                      </div>

                      <hr style={{border: '1px solid gray',width:'90%',margin:'auto'}} />

                      <div style={{display:'flex',marginTop:'10px',marginLeft:'20px'}}>
                          <div style={{marginRight:'210px',fontWeight:'bold',fontSize:'20px'}}>
                              Subtotal
                          </div>
                          <div>
                              $0
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <hr style={{border: '1px solid gray',width:'100%',margin:'auto'}} />
      </div>
  )
}

export default Shoppage
