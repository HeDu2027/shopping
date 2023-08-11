import React, { useState } from 'react';
import myImage from '/Users/hedu/WebstormProjects/shopping/src/client/components/navbar/asset/截屏2023-08-02 12.52.20.png';

function Navbar() {
    const [activeLink, setActiveLink] = useState(null);
    const [isHoveringPopup, setIsHoveringPopup] = useState(false);

    const links = ['Motors', 'Toys', 'Electronics', 'Sports', 'Refurnish', 'House', 'Beauty', 'Clothing', 'Cars', 'Woods'];

    const MotortopCategories = ['All Parts & Accessories', 'Car & Truck Parts', 'Motorcycle Parts', 'Automotive Tools & Supplies', 'Apparel & Merchandise', 'Motors Deals', 'My Garage'];
    const MotormoreCategories = ['Cars & Trucks', 'Classics', 'Motorcycles', 'Powersports', 'RVs & Campers', 'Trailers & Other Vehicles', 'Boats'];


    const ElectronicstopCategories = ['Computers, Tablets & Network Hardware', 'Cameras & Photo', 'Cell Phones & Smartphones', 'Cell Phone Cases, Covers & Skins', 'TV, Video & Home Audio Electronics', 'Vehicle Electronics & GPS', 'Headphones', 'Surveillance & Smart Home Electronics'];
    const ElectronicsmoreCategories = ['eBay Refurbished', 'Video Games', 'Nintendo Toys to Life', 'Apple iPhone', 'PC Desktops & All-In-One Computers', 'Computer Graphics Cards', 'Tablets & eReaders', 'Laptops & Netbooks'];

    const SportstopCategories = ['Team Sports', 'Outdoor Sports', 'Water Sports', 'Winter Sports', 'Boxing, Martial Arts & MMA', 'Golf', 'Fitness, Running & Yoga', 'Cycling', 'Hunting'];
    const SportsmoreCategories = ['Fishing', 'Tennis & Racquet Sports', 'Horse Riding', 'Climbing & Caving', 'Archery', 'Swimming', 'Skateboarding & Longboarding', 'Gymnastics', 'Cheerleading'];

    const RefurnishtopCategories = ['Furniture', 'Home Decor', 'Kitchen & Dining', 'Bedding', 'Bath', 'Garden & Outdoor', 'Storage & Organization', 'Lighting', 'Home Improvement'];
    const RefurnishmoreCategories = ['Kids Home Store', 'Smart Home', 'Home Audio & Theater', 'Appliances', 'Pet Supplies', 'Crafts & Sewing', 'Vacuums & Floor Care', 'Heating & Cooling', 'Home Safety & Security'];

    const HousetopCategories = ['Living Room', 'Bedroom', 'Kitchen & Dining Room', 'Bathroom', 'Kids Room', 'Office', 'Outdoor', 'Garage', 'Basement'];
    const HousemoreCategories = ['Home Decor', 'Furniture', 'Bed & Bath', 'Kitchen & Dining', 'Patio & Garden', 'Appliances', 'Home Improvement', 'Storage & Organization', 'Electronics'];

    const BeautytopCategories = ['Makeup', 'Skin Care', 'Hair Care', 'Fragrance', 'Nail Polish', 'Beauty Tools & Accessories', 'Men’s Grooming', 'Natural & Organic', 'Health & Personal Care'];
    const BeautymoreCategories = ['Bath & Body', 'Gift Sets', 'Dental Care', 'Shave & Hair Removal', 'Vision Care', 'Vitamins & Dietary Supplements', 'Foot, Hand & Nail Care', 'Wellness & Relaxation', 'Luxury Beauty'];

    const ClothingtopCategories = ['Women', 'Men', 'Girls', 'Boys', 'Baby', 'Luggage', 'Shoes', 'Jewelry', 'Watches'];
    const ClothingmoreCategories = ['Accessories', 'Uniforms, Work & Safety', 'Costumes & Accessories', 'Shoe, Jewelry & Watch Accessories', 'Traditional & Cultural Wear', 'Plus-Size', 'Petite', 'Maternity', 'Big & Tall'];

    const CarstopCategories = ['Sedans', 'SUVs', 'Trucks', 'Sports Cars', 'Electric Cars', 'Compact Cars', 'Convertibles', 'Coupes', 'Wagons'];
    const CarsmoreCategories = ['Vans', 'Hybrids', 'Luxury Cars', 'Offroad', 'Diesel Engines', 'Motorcycles', 'Boats', 'Aircraft', 'Commercial Vehicles'];

    const WoodstopCategories = ['Lumber', 'Veneer', 'Plywood', 'Decking', 'Fencing', 'Siding', 'Flooring', 'Panelling', 'Doors'];
    const WoodsmoreCategories = ['Windows', 'Cabinets', 'Countertops', 'Shelving', 'Furniture', 'Moulding & Trim', 'Poles', 'Posts', 'Beams'];

    const ToystopCategories = ['Action Figures', 'Dolls', 'Puzzles', 'Board Games', 'Video Games', 'Outdoor Play', 'Learning Toys', 'Stuffed Animals', 'Building Blocks'];
    const ToysmoreCategories = ['Arts & Crafts', 'Dress Up & Pretend Play', 'Electronics for Kids', 'Baby & Toddler Toys', 'Sports & Outdoor Play', 'Musical Instruments', 'Kids Furniture, Décor & Storage', 'Vehicles & Remote-Control', 'Tricycles, Scooters & Wagons'];

    const popups = {
        'Motors': () => <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ paddingLeft: '20px'}}>
                <h2 style={{ fontSize: '14px' }}>Top category</h2>
                <hr style={{ width: '200px' }} />
                {MotortopCategories.map(category => (
                    <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                        <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                    </p>
                ))}

            </div>
            <div>
                <h2 style={{ fontSize: '14px' }}>More category</h2>
                <hr style={{ width: '200px' }} />
                {MotormoreCategories.map(category => (
                    <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                        <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                    </p>
                ))}
            </div>
            <div style={{ width: '65%', padding: '8px', overflow: 'hidden' }}>
                <img src={myImage} alt="description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

        </div>,
        'Toys': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {ToystopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {ToysmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Electronics': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {ElectronicstopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {ElectronicsmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Sports': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {SportstopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {SportsmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Refurnish': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {RefurnishtopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {RefurnishmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'House': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {HousetopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {HousemoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Beauty': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {BeautytopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {BeautymoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Clothing': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {ClothingtopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {ClothingmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Cars': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {CarstopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {CarsmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        'Woods': () => {
            return(
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px'}}>
                        <h2 style={{ fontSize: '14px' }}>Top category</h2>
                        <hr style={{ width: '200px' }} />
                        {WoodstopCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '14px' }}>More category</h2>
                        <hr style={{ width: '200px' }} />
                        {WoodsmoreCategories.map(category => (
                            <p style={{ maxHeight: '200px', overflow: 'auto', fontSize: '9px' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href={`#${category.replace(/\s+/g, '-')}`}>{category}</a>
                            </p>
                        ))}
                    </div>
                    <div style={{ width: '65%', padding: '8px' }}>
                        <img src={myImage} alt="description" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            )
        },
        // ... add more popups for each link
    };

    const Popup = () => {
        const popupFunction = popups[links[activeLink]];
        return typeof popupFunction === 'function' ? popupFunction() : null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', height: '50px' }}>
                {links.map((link, index) => (
                    <div
                        onMouseEnter={() => setActiveLink(index)}
                        onMouseLeave={() => {
                            if (!isHoveringPopup) {
                                setActiveLink(null);
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {link}
                    </div>
                ))}
            </div>
            {(activeLink !== null || isHoveringPopup) && (
                <div
                    onMouseEnter={() => setIsHoveringPopup(true)}
                    onMouseLeave={() => {
                        setIsHoveringPopup(true);
                        setActiveLink(null);
                    }}
                    style={{ width: '80%', height: '300px', backgroundColor: 'white', display: 'flex'}}
                >
                    <Popup />
                </div>
            )}
        </div>

    );
}

export default Navbar;
