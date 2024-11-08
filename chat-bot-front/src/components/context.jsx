import { useState, createContext } from "react";

const context = createContext();

function ContextProvider({ children }) {
    const [movie, setMovie] = useState('');

    return (
        <context.Provider value={{ movie, setMovie }}>
            {children}
        </context.Provider>
    );
}

export { context, ContextProvider };