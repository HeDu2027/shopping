import React, {useState} from "react";
import {BiGridAlt} from "react-icons/bi";
import {AiOutlineUnorderedList} from "react-icons/ai";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./products/products";


const Productcontainer = () => {

    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Featured Items'); // 添加这一行
    const [layout, setLayout] = useState('grid');

    const styles={
        mainContainer: {
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto', // 添加这一行
            maxWidth: '120%',
        },
        container:{
            flexGrow: 3,
            height: '140vh',
            width: '95%',
            border: '1px solid gray',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box', // Add this line
        },
        sidecontainer: {
            flexGrow: 1,
            width: '25%',
            height: '140vh', // 这将使其与container具有相同的高度
            border: '1px solid gray',
            boxSizing: 'border-box',
        },
        searchcontainer:{
            flex: 0.5,
            padding: '15px',
            borderBottom: '1px solid gray',
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
            borderTop: '1px solid transparent',
            boxSizing: 'border-box', // Add this line
            width: '100%', // Add this line
        },
        contentcontainer:{
            flex: layout === 'grid' ? 9 : 15,
            borderBottom: '1px solid gray',
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
            borderTop: '1px solid transparent',
            width: '100%',
            display: 'flex', // Add this line
            justifyContent: 'center', // Add this line
            alignItems: 'center', // Add this line
        },
        productcontainer:{
            height:'25%', // Change this line
            width:'25%', // Change this line
        },
        footercontainer:{
            flex: 0.5,
            borderBottom: '1px solid transparent',
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
            borderTop: '1px solid gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', // Add this line
        },
        searchlabel:{
            height:'30px',
            marginRight:'330px',
            marginLeft:'330px',
        },
        ItemSelect:{
            height:'40px',
            width: '160px',
            borderRadius:'5px'
        },
        gridContentContainer: {
            flex: 9,
            // ... your existing styles here ...
        },
        listContentContainer: {
            flex: 15,
            // ... your existing styles here ...
        },
        // Other styles remain the same
    }
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

    return(
        <div style={styles.mainContainer}>
            <div className='container' style={styles.container}>
                <div className='searchcontainer' style={styles.searchcontainer}> {/* 设置内边距为5px */}
                    <div  style={{display: 'flex', alignItems: 'center', margin: 0, padding: 0}}>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Search your favorite..."
                            onChange={handleSearchChange} // 添加这一行
                            style={{width: '260px', height: '40px'}} // 设置输入框的宽度为220px，高度为30px
                        />
                        <label className='searchlabel' style={styles.searchlabel}>label</label>
                        <select className='ItemSelect' onChange={handleSortChange} style={styles.ItemSelect}>
                            <option>Featured Items</option>
                            <option>Lowest Prices</option>
                            <option>Highest Prices</option>
                        </select>
                        <div style={{width: '20px'}}></div> {/* 添加的空白div */}
                        {/*<select className='iconselect' style={styles.iconselect}>*/}
                        {/*    <option><BiGridAlt/>Grid</option>*/}
                        {/*    <option><AiOutlineUnorderedList/>List</option>*/}
                        {/*</select>*/}
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
                <div className='contentcontainer' style={layout === 'grid' ? styles.gridContentContainer : styles.listContentContainer}>
                    <Products layout={layout} currentPage={currentPage} sortOption={sortOption} searchTerm={searchTerm} /> {/* 修改这一行 */}
                </div>
                <div className='footercontainer' style={styles.footercontainer}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(1)}>1</a>
                            </li>
                            <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(2)}>2</a>
                            </li>
                            <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
                                <a className="page-link" onClick={() => handlePageChange(3)}>3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Productcontainer
