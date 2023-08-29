import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import Image from '/Users/hedu/Downloads/app/shopping/src/client/components/banner/asset/banner.png'

const StyledCarousel = styled(Carousel)`
    .control-arrow {
        box-shadow: none !important;
    }
`;

const Banner = () => {
    return (
        <div className="banner-wrapper" style={{
            width:'100%',
            height:'10%',
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius:'5px',
            marginTop:'20px',
        }}>
            <StyledCarousel
                autoPlay
                infiniteLoop
                interval={3000}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                showArrows={true} // 显示左右箭头
                dynamicHeight={false}
                style={{ width: '80%', height: '100%',borderRadius:'5px' }} // 修改Carousel的高度为100%
            >
                <div>
                    <img src={Image} className="carousel-image" alt="Image" style={{ width: '100%', height: '50%' }} />
                </div>
                <div>
                    <img src={Image} className="carousel-image" alt="Image 1" style={{ width: '100%', height: '50%' }} />
                </div>
                <div>
                    <img src={Image} className="carousel-image" alt="Image 2" style={{ width: '100%', height: '50%' }} />
                </div>
                <div>
                    <img src={Image} className="carousel-image" alt="Image 2" style={{ width: '100%', height: '50%' }} />
                </div>
                <div>
                    <img src={Image} className="carousel-image" alt="Image 3" style={{ width: '100%', height: '50%' }} />
                </div>
            </StyledCarousel>
        </div>
    );
};

export default Banner;
