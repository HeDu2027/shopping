import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize user from local storage or session storage
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const [user, setUser] = useState(storedUser);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    // Whenever the user state changes, update local storage
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, updateUser,setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
