import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import image1 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/4b8f7edec1709daa62580c3bffb6c755-rabatt-tag.jpg'
import image2 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/92-929581_share-this-article-50-discount-logo.png'
import image3 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/467be293e99ed9ef56014a02f4be2308-rabatt-rot-gerundet.png'
import image4 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/2209197f098ab771ab24282e1c0879a8-30-percent-discount-sale-tag.png'
import image5 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/discount-icon-in-trendy-flat-style-isolated-on-background-discount-icon-page-symbol-for-your-web-site-design-discount-icon-logo-app-ui-discount-icon-eps-vector.jpg'
import image6 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/pngtree-40-discount-offer-banner-price-tag-design-png-image_9014448.png'
import image7 from '/Users/hedu/Downloads/app/shopping/src/client/components/discount/asset/up-30-discount-offer-logo-design-discount-badge_526569-722.avif'
function Discount() {
    const products = [
        {image: image1, description: 'Product 1'},
        {image: image2, description: 'Product 2'},
        {image: image3, description: 'Product 3'},
        {image: image4, description: 'Product 4'},
        {image: image5, description: 'Product 5'},
        {image: image6, description: 'Product 6'},
        {image: image7, description: 'Product 7'},
        // Add more products as needed
    ];

    return (
        <div style={{
            width:'80%',
            height:'10%',
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>Get off 70%</h1>
                <div style={{ marginRight: '50px' }}>
                    {/* Your component goes here */}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {products.map((product, index) => (
                    <div key={index} style={{ border: 'none'}} onMouseEnter={e => e.target.style.border = '1px solid black'} onMouseLeave={e => e.target.style.border = '1px solid transparent'}>
                        <img src={product.image} alt={product.description} style={{width:'150px'}} />
                        <a href={`#${product.description.replace(/\s+/g, '-')}`}>{product.description}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Discount;
