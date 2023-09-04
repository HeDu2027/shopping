import React, {useState} from 'react';
import "./Footer.css"
const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('🇺🇸 United States');
    const countries = [
        '🇦🇷 Argentina',
        '🇦🇺 Australia',
        '🇦🇹 Austria',
        '🇧🇾 Belarus',
        '🇧🇪 Belgium',
        '🇧🇴 Bolivia',
        '🇧🇷 Brazil',
        '🇨🇦 Canada',
        '🇨🇱 Chile',
        '🇨🇳 China',
        '🇨🇴 Colombia',
        '🇨🇷 Costa Rica',
        '🇩🇴 Dominican',
        '🇪🇨 Ecuador',
        '🇸🇻 El Salvador',
        '🇫🇷 France',
        '🇩🇪 Germany',
        '🇬🇹 Guatemala',
        '🇭🇳 Honduras',
        '🇭🇰 Hong Kong',
        '🇮🇳 India',
        '🇮🇪 Ireland',
        '🇮🇱 Israel',
        '🇮🇹 Italy',
        '🇯🇵 Japan',
        '🇰🇿 Kazakhstan',
        '🇰🇷 Korea',
        '🇲🇾 Malaysia',
        '🇲🇽 Mexico',
        '🇳🇱 Netherlands',
        '🇳🇿 New Zealand',
        '🇳🇮 Nicaragua',
        '🇵🇦 Panama',
        '🇵🇾 Paraguay',
        '🇵🇪 Peru',
        '🇵🇭 Philippines',
        '🇵🇱 Poland',
        '🇵🇹 Portugal',
        '🇵🇷 Puerto Rico',
        '🇸🇬 Singapore',
        '🇪🇸 Spain',
        '🇨🇭 Switzerland',
        '🇹🇼 Taiwan',
        '🇹🇷 Turkey'
    ];

    return (
        <div className='footer-container'>

            <footer style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop:'10px',
                marginBottom:'10px',
                padding:'10px'
            }}>
                <div style={{marginRight:'40px'}}>
                    <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Buy</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Registration</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Bidding & buying help</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Stores</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Selling for Charity</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Charity Shop</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Seasonal Sales and events</p>
                </div>
                <div style={{marginRight:'40px'}}>
                    <div>
                        <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Sell</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Start selling</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>How to sell</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Business sellers</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Affiliates</p>
                    </div>
                    <div>
                        <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Tools & apps</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Developers</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Security center</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Site map</p>
                    </div>
                </div>
                <div style={{marginRight:'40px'}}>
                    <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>About Selling</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Company info</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>News</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Investors</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Careers</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Diversity & Inclusion</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Global Impact</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Government relations</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Advertise with us</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>Policies</p>
                    <p style={{color: 'gray', fontSize: '5px'}}>eCI Licenses</p>
                </div>
                <div style={{marginRight:'40px'}}>
                    <div>
                        <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Help & Contact</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Seller Center</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Contact Us</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Selling Returns</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Selling Money Back Guarantee</p>
                    </div>
                    <div>
                        <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Community</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Announcements</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Selling Community</p>
                        <p style={{color: 'gray', fontSize: '5px'}}>Selling for Business Podcast</p>
                    </div>
                    <div>
                        <p style={{color: '#707070', fontSize: '14px', fontWeight: 'bold'}}>Selling Sites</p>
                        <div>
                            <button style={{width: '160px', height: '35px', border: 'none'}}
                                    onClick={() => setIsOpen(!isOpen)}>{selectedCountry}</button>
                            {isOpen && (
                                <div style={{
                                    width: '550px',
                                    height: '240px',
                                    overflow: 'auto',
                                    position: 'absolute',
                                    border: 'none',
                                    backgroundColor: 'white',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                    gridGap: '0px 5px', // 上下间距为3px，左右间距为10px
                                    bottom: '15%',
                                    left: '70%',
                                    transform: 'translateX(-30%)',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // 添加阴影
                                    padding: '5px' // 添加2px的内边距
                                }}>
                                    {countries.map(country => (
                                        <p key={country}
                                           className="country-item" // 添加country-item类
                                           style={{fontSize: '5px'}} // 设置字体大小为5px
                                           onClick={() => {
                                               setSelectedCountry(country);
                                               setIsOpen(false);
                                           }}>
                                            {country}
                                        </p>
                                    ))}
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default Footer;
