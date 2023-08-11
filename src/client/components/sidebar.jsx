import React, { useState } from 'react';
import { AiOutlineInstagram, AiOutlineHome, AiFillHeart } from 'react-icons/ai';
import {BsPerson, BsSearch} from 'react-icons/bs';
import { FaCompass, FaTelegramPlane } from 'react-icons/fa';
import { FiPlusSquare } from 'react-icons/fi';
import {VscThreeBars} from "react-icons/vsc";
import Search from "./search";
import More from './more';
import Create from "./create";
import { useNavigate } from 'react-router-dom';


function Sidebar({ isSearchOpen, onSearchClick }) {
    const [selected, setSelected] = useState(null);
    const [isMoreOpen, setMoreOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const icons = [
        { Icon: AiOutlineInstagram, label: 'Instagram' },
        { Icon: AiOutlineHome, label: 'Home' },
        { Icon: BsSearch, label: 'Search' },
        { Icon: FaCompass, label: 'Safari' },
        { Icon: FaTelegramPlane, label: 'Infos' },
        { Icon: AiFillHeart, label: 'Like' },
        { Icon: FiPlusSquare, label: 'Create' },
        {Icon:BsPerson,label: 'Account'},
        {Icon:VscThreeBars,label: 'More'}
    ];

    const handleMoreClick = () => {
        setMoreOpen(!isMoreOpen);
    };

    const handleClick = (index) => {
        setSelected(index);
        if (index === 1) {
            onSearchClick();
        } else if (index === 6) {
            setIsCreateOpen(!isCreateOpen);
        }
    };


    return (
        <div style={{ width: isSearchOpen ? 60 : 200, height: '100vh', borderRight: '1px solid gray' }}>
            <div style={{ marginBottom: 100 }}>
                <AiOutlineInstagram size={30} style={{ cursor: 'pointer' }} />
            </div>
            {icons.slice(1, 8).map(({ Icon, label,onClick }, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: selected === index ? 'gray' : 'transparent',
                        cursor: 'pointer',
                        fontSize:22
                    }}
                    onMouseEnter={() => setSelected(index)}
                    onMouseLeave={() => setSelected(null)}
                    onClick={() => handleClick(index, onClick)}
                >
                    <Icon size={24} color={selected === index ? 'white' : 'black'} />
                    {!isSearchOpen && <span
                        style={{
                            marginLeft: 10,
                            fontWeight: selected === index ? 'bold' : 'normal',
                            color: selected === index ? 'white' : 'black',
                        }}
                    >
                        {label}
                    </span>}
                </div>
            ))}
            <div style={{ height: 230 }} />
            {icons.slice(8).map(({ Icon, label }, index) => (
                <div
                    key={index + 8}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: selected === index + 8 ? 'gray' : 'transparent',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setSelected(index + 8)}
                    onMouseLeave={() => setSelected(null)}
                    onClick={() => handleMoreClick(index + 8)}
                >
                    <Icon size={24} color={selected === index + 8 ? 'white' : 'black'} />
                    {!isSearchOpen && <span
                        style={{
                            marginLeft: 10,
                            fontWeight: selected === index + 8 ? 'bold' : 'normal',
                            color: selected === index + 8 ? 'white' : 'black',
                        }}
                    >
                        {label}
                    </span>}
                </div>
            ))}
            {isMoreOpen && <More />}
            {isCreateOpen && <Create />}
        </div>
    );
}

export default Sidebar;
