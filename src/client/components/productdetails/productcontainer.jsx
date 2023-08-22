import React, {useState} from "react";
import {BiGridAlt} from "react-icons/bi";
import {AiOutlineUnorderedList} from "react-icons/ai";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./products/products";
import './Productcontainer.css'
import productData from "./products/productData";
import Showbar from "../pagedetail/suggestshow/showbar";
import {ProductData} from "../../data/ProductData";
const Productcontainer = () => {
    const productsPerPage = 16; // Define it here
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Featured Items'); // 添加这一行
    const [layout, setLayout] = useState('grid');
    const [ratingFilter, setRatingFilter] = useState(null); // State to hold the selected rating filter
    const [sortedProducts, setSortedProducts] = useState(productData);
    const [priceRange, setPriceRange] = useState(null);

    const calculatePercentageForPriceRange = (min, max) => {
        const count = productData.filter(product => {
            const productPrice = product.price;
            // Adjusted this line
            if (max) {
                return productPrice >= min && productPrice <= max;
            }
            return productPrice >= min; // for >3000$ case
        }).length;
        return ((count / productData.length) * 100).toFixed(2);
    };


    // Calculate the percentage of products for each rating
    const calculatePercentageForRating = (rating) => {
        const count = productData.filter(product => product.rating === rating).length;
        return ((count / productData.length) * 100).toFixed(2);
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





    return(
        <div className="mainContainer">
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
                        />

                        <label className='searchlabel'>label</label>

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
                        productsPerPage={productsPerPage}  // Add this line
                    />
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
