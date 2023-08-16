import React, { createContext, useContext, useState, useEffect } from 'react';

export default interface User {
    email: string;
    password: string;
    authToken: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    getUser: () => User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Check local storage for a logged-in user on initial load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const getUser = (): User => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser) {
            setUser(storedUser);
        }
        return storedUser
    }
    const login = (userData: User) => {
        console.log(userData)
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}
