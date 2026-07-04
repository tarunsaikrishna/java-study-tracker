import { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

    const register = useCallback(async (username, password) => {
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
    }, []);

    const login = useCallback(async (username, password) => {
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
    }, []);

    const resetPassword = useCallback(async (username, newPassword) => {
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
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    const fetchAllItems = useCallback(async () => {
        const response = await fetch(`${API_BASE_URL}/items`);
        const data = await response.json();
        setItems(data);
        return data;
    }, []);

    const fetchUserItems = useCallback(async (username) => {
        const response = await fetch(`${API_BASE_URL}/items/author/${username}`);
        return await response.json();
    }, []);

    const fetchUserItemsGrouped = useCallback(async (username) => {
        const response = await fetch(`${API_BASE_URL}/items/author/${username}/grouped`);
        return await response.json();
    }, []);

    const fetchUserItemsToday = useCallback(async (username) => {
        const response = await fetch(`${API_BASE_URL}/items/author/${username}/today`);
        return await response.json();
    }, []);

    const fetchAllCategories = useCallback(async () => {
        const response = await fetch(`${API_BASE_URL}/items/categories`);
        return await response.json();
    }, []);

    const fetchItemsByCategory = useCallback(async (category) => {
        const response = await fetch(`${API_BASE_URL}/items/category/${encodeURIComponent(category)}`);
        return await response.json();
    }, []);

    const searchItems = useCallback(async (query) => {
        const response = await fetch(`${API_BASE_URL}/items/search?q=${encodeURIComponent(query)}`);
        return await response.json();
    }, []);

    const addItem = useCallback(async (item) => {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: item.title,
                note: item.note,
                author: user.username,
                photos: item.photos ? item.photos.join(',') : '',
                category: item.category
            })
        });
        const data = await response.json();
        setItems(prevItems => [...prevItems, data]);
        return data;
    }, [user]);

    const deleteItem = useCallback(async (itemId, author) => {
        const response = await fetch(`${API_BASE_URL}/items/${itemId}?author=${encodeURIComponent(author)}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        return data;
    }, []);

    const fetchItemById = useCallback(async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);
        return await response.json();
    }, []);

    const fetchUserDetails = useCallback(async (username) => {
        const response = await fetch(`${API_BASE_URL}/auth/user/${username}`);
        const data = await response.json();
        if (response.ok) {
            setUser(prev => prev ? { ...prev, streak: data.streak, lastActiveDate: data.lastActiveDate } : data);
        }
        return data;
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            items, 
            login, 
            register,
            resetPassword,
            logout, 
            addItem,
            deleteItem,
            fetchAllItems,
            fetchUserItems,
            fetchUserItemsGrouped,
            fetchUserItemsToday,
            fetchAllCategories,
            fetchItemsByCategory,
            searchItems,
            fetchItemById,
            fetchUserDetails
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
