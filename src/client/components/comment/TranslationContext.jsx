import React, { createContext, useState } from 'react';

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // default language

    return (
        <TranslationContext.Provider value={{ language, setLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};
