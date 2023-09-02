import React, {useEffect, useState} from "react";
import {BiGridAlt} from "react-icons/bi";
import {AiOutlineUnorderedList} from "react-icons/ai";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./products/products";
import './Productcontainer.css'
import productData from "./products/productData";
import Showbar from "../pagedetail/suggestshow/showbar";
import {ProductData} from "../../data/Clothing/ProductData";
import { useParams } from 'react-router-dom';
import sneakersData from "../../data/sneakersData";
import CosmeticsData from "../../data/CosmeticsData";
import FoodsData from "../../data/FoodsData";
import ClothingsData from "../../data/ClothingsData";
import DrinksData from "../../data/DrinksData";
import ElectronicsData from "../../data/electronicsData";
import TopbarContainer from "../topbar/TopbarContainer";
import {useCart} from "../topbar/CartContext";

function getProductsForCategory(category) {
    // This is just an example. You can fetch data from an API or from a static source.
    switch(category) {
        case 'category1':
            return sneakersData;
        case 'category2':
            return CosmeticsData;
        case 'category3':
            return FoodsData;
        case 'category4':
            return ClothingsData;
        case 'category5':
            return DrinksData;
        default:
            return ElectronicsData;
    }
}

const Productcontainer = () => {

    const { category } = useParams();
    const [productsForCurrentCategory, setProductsForCurrentCategory] = useState(getProductsForCategory(category));

    useEffect(() => {
        setSortedProducts(productsForCurrentCategory);
    }, [productsForCurrentCategory]);


    const productsPerPage = 16; // Define it here
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Featured Items'); // 添加这一行
    const [layout, setLayout] = useState('grid');
    const [ratingFilter, setRatingFilter] = useState(null); // State to hold the selected rating filter
    const [sortedProducts, setSortedProducts] = useState(productsForCurrentCategory);
    const [priceRange, setPriceRange] = useState(null);


    const calculatePercentageForPriceRange = (min, max) => {
        const count = productsForCurrentCategory.filter(product => { // <-- Change here
            const productPrice = product.price;
            if (max) {
                return productPrice >= min && productPrice <= max;
            }
            return productPrice >= min;
        }).length;
        return ((count / productsForCurrentCategory.length) * 100).toFixed(2); // <-- Change here
    };

    const calculatePercentageForRating = (rating) => {
        const count = productsForCurrentCategory.filter(product => product.rating === rating).length; // <-- Change here
        return ((count / productsForCurrentCategory.length) * 100).toFixed(2); // <-- Change here
    };


    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (event) => { // 添加这个函数
        setSortOption(event.target.value);
    };

    const handleSearchChange = (event) => { // 添加这个函数
        setSearchTerm(event.target.value);
    };

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const handleRatingSortChange = (event) => {
        const sortType = event.target.value;
        let newSortedProducts = [...sortedProducts]; // Create a copy of the sortedProducts array

        if (sortType === "highToLow") {
            newSortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortType === "lowToHigh") {
            newSortedProducts.sort((a, b) => a.rating - b.rating);
        }

        setSortedProducts(newSortedProducts); // Update the state with the sorted products
    };

    let filteredProducts = [...sortedProducts]; // Initialize filteredProducts with sortedProducts

    // Filter products based on the search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Adjust the filtering logic for ratingFilter
    if (ratingFilter) {
        filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter && product.rating < ratingFilter + 1);
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (priceRange) {
        const [min, max] = priceRange.split('-').map(price => parseFloat(price));
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            }
            return product.price >= min; // for >3000$ case
        });
    }


    const { cart, addToCart } = useCart();

    return(
        <div className="mainContainer">

            <div className="topbar-container">
                <TopbarContainer cart={cart}/>
            </div>

            <div className='container'>

                <div className='searchcontainer'>
                    <div className="search-inner-container">
                        <input
                            type="text"
                            className="form-control search-input"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Search your favorite..."
                            onChange={handleSearchChange}
                            style={{width:'520px',height:'40px',borderRadius:'15px',backgroundColor:'#F2F2F2'}}
                        />

                        <select className='ItemSelect' onChange={handleSortChange}>
                            <option>Featured Items</option>
                            <option>Lowest Prices</option>
                            <option>Highest Prices</option>
                        </select>

                        <select className='PriceRangeSelect' onChange={(e) => setPriceRange(e.target.value)}>
                            <option value="">All Prices</option>
                            <option value="0-500">
                                $0 - $500 ({calculatePercentageForPriceRange(0, 500)}%)
                            </option>
                            <option value="501-1000">
                                $501 - $1000 ({calculatePercentageForPriceRange(501, 1000)}%)
                            </option>
                            <option value="1001-2000">
                                $1001 - $2000 ({calculatePercentageForPriceRange(1001, 2000)}%)
                            </option>
                            <option value="2001-3000">
                                $2001 - $3000 ({calculatePercentageForPriceRange(2001, 3000)}%)
                            </option>
                            <option value="3001+">
                                >$3000 ({calculatePercentageForPriceRange(3001)}%)
                            </option>
                        </select>


                        <select className='RatingSelect' onChange={(e) => setRatingFilter(parseFloat(e.target.value))}>
                            <option value="">All Ratings</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>
                                    {rating} Star ({calculatePercentageForRating(rating)}%)
                                </option>
                            ))}
                        </select>

                        <div className="spacer"></div>
                        <Dropdown show={show} onToggle={handleToggle}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <BiGridAlt />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleLayoutChange('grid')}><BiGridAlt /> Grid</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLayoutChange('list')}><AiOutlineUnorderedList /> List</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                <div className={`contentcontainer ${layout}`}>
                    <Products
                        layout={layout}
                        currentPage={currentPage}
                        sortOption={sortOption}
                        searchTerm={searchTerm}
                        ratingFilter={ratingFilter}
                        products={filteredProducts}
                        filteredProducts={filteredProducts}  // Pass the filtered products
                        productsPerPage={productsPerPage}
                        addToCart={addToCart}
                    />
                </div>

                <div style={{width:'100%',height:'50px'}}>

                </div>

                <div className='footercontainer'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                    <a className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <Showbar data={ProductData}/>
            </div>

        </div>
    )
}

export default Productcontainer
