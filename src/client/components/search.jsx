import React from 'react';

const Search = () => {
    return (
        <div style={{ ...styles.searchContainer }}>
            <h1 style={styles.h1}>Search</h1>
            <input type="text" placeholder="Search..." style={styles.input} />
            <p style={styles.p}>late search</p>
        </div>
    );
};

export default Search

const styles = {
    searchContainer: {
        width: 300,
        height: '100vh',
        margin: 0,
        padding: '0 10px',
        borderLeft: '1px solid gray',
        borderRight:'1px solid gray',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        marginTop: 0,
    },
    input: {
        width: '100%',
        padding: '10px 0',
        textAlign: 'left',
    },
    p: {
        marginTop: 10,
    },
};

