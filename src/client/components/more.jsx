import React, { useState } from 'react';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineHistory, AiOutlineUserSwitch } from 'react-icons/ai';
import { MdLabelImportantOutline } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import { GoReport } from 'react-icons/go';

const More = () => {
    const icons = [
        { Icon: IoSettingsOutline, label: 'Setting' },
        { Icon: AiOutlineHistory, label: 'History' },
        { Icon: MdLabelImportantOutline, label: 'Collection' },
        { Icon: FiSun, label: 'Light' },
        { Icon: GoReport, label: 'Report Question' },
        { Icon: AiOutlineUserSwitch, label: 'Change Account' },
        { Icon: IoLogOutOutline, label: 'Logout' },
    ];

    const [selected, setSelected] = useState(null);

    return (
        <div style={{ ...styles.moreContainer }}>
            {icons.map(({ Icon, label }, index) => (
                <button
                    key={index}
                    style={{
                        ...styles.button,
                        backgroundColor: selected === index ? 'gray' : 'transparent',
                    }}
                    onMouseEnter={() => setSelected(index)}
                    onMouseLeave={() => setSelected(null)}
                    onClick={() => setSelected(index)}
                >
                    <Icon
                        size={25}
                        color={selected === index ? 'white' : 'black'}
                    />
                    <span
                        style={{
                            ...styles.span,
                            fontWeight: selected === index ? 'bold' : 'normal',
                            color: selected === index ? 'white' : 'black',
                        }}
                    >
            {label}
          </span>
                </button>
            ))}
        </div>
    );
};

const styles = {
    moreContainer: {
        width: 250,
        border: '1px solid gray',
        borderRadius: 5,
        position: 'absolute',
        left: 15,
        bottom: 50,
        backgroundColor: 'white',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 48,
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    span: {
        marginLeft: 10,
        fontSize: 20,
    },
};

export default More;
