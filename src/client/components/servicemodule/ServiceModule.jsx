import React from "react";
import './ServiceModule.css';
import ServiceData from "./ServiceData";

const ServiceModule = () => {
    return (
        <div className="service-module-wrapper">
            <div className="service-module-container">
                {ServiceData.map((discount, index) => (
                    <div key={index} className="service-module-item">
                        <div>
                            <div>
                                <p className="service-module-title">{discount.title}</p>
                            </div>
                            <div>
                                <p className="service-module-description">{discount.description}</p>
                            </div>
                        </div>
                        <img src={discount.image} alt={discount.name} className="service-module-image"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceModule;
