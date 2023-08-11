import React from 'react';
import { GoFileMedia } from 'react-icons/go';

const Create = () => {
    return (
        <div style={styles.createContainer}>
            <h1 style={styles.h1}>Create new post</h1>
            <hr style={styles.hr} />
            <GoFileMedia style={styles.icon} size={50} />
            <button style={styles.button}>Choose from your PC</button>
        </div>
    );
};

const styles = {
    createContainer: {
        width: 400,
        height: 400,
        borderRadius: 5,
        border: '1px solid gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    h1: {
        marginBottom: 20,
    },
    hr: {
        width: '100%',
        marginBottom: 20,
    },
    icon: {
        marginBottom: 20,
    },
    button: {
        width: 100,
        height: 25,
        borderRadius: 5,
        border: 'none',
        backgroundColor: 'blue',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Create;
