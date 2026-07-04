import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:8081/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const register = async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    const login = async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    const resetPassword = async (username, newPassword) => {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, newPassword })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const fetchAllItems = async () => {
        const response = await fetch(`${API_BASE_URL}/items`);
        const data = await response.json();
        setItems(data);
        return data;
    };

    const fetchUserItems = async (username) => {
        const response = await fetch(`${API_BASE_URL}/items/author/${username}`);
        const data = await response.json();
        return data;
    };

    const searchItems = async (query) => {
        const response = await fetch(`${API_BASE_URL}/items/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data;
    };

    const addItem = async (item) => {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: item.title,
                note: item.note,
                author: user.username,
                photos: item.photos ? item.photos.join(',') : ''
            })
        });
        const data = await response.json();
        setItems([...items, data]);
        return data;
    };

    const fetchItemById = async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);
        return await response.json();
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            items, 
            login, 
            register,
            resetPassword,
            logout, 
            addItem,
            fetchAllItems,
            fetchUserItems,
            searchItems,
            fetchItemById
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
