
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("connecthub-user")) || null
    );

    const signup = (userData) => {
        localStorage.setItem(
            "connecthub-user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const login = (userData) => {
        localStorage.setItem(
            "connecthub-user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("connecthub-user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
