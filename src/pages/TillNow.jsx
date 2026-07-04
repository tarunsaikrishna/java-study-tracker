import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TillNow = () => {
    const { 
        fetchAllItems, 
        searchItems, 
        fetchAllCategories,
        fetchItemsByCategory,
        user, 
        logout 
    } = useAuth();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadAllItems = async () => {
        try {
            setLoading(true);
            const data = await fetchAllItems();
            setItems(data);
        } catch (error) {
            console.error("Error loading items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllItems();
        fetchAllCategories().then(setCategories).catch(console.error);
    }, [fetchAllItems, fetchAllCategories]);

    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            if (searchTerm.trim()) {
                try {
                    setLoading(true);
                    const results = await searchItems(searchTerm);
                    setItems(results);
                } catch (error) {
                    console.error("Error searching items:", error);
                } finally {
                    setLoading(false);
                }
            } else if (selectedCategory) {
                try {
                    setLoading(true);
                    const results = await fetchItemsByCategory(selectedCategory);
                    setItems(results);
                } catch (error) {
                    console.error("Error loading category items:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                await loadAllItems();
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, selectedCategory, searchItems, fetchItemsByCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSearchTerm('');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="till-now-container">
            <nav className="navbar">
                <h1>Java Study Tracker</h1>
                <div className="nav-links">
                    <Link to="/dashboard">My Dashboard</Link>
                    <Link to="/till-now">Till Now</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>
            
            <div className="till-now-content">
                <h2>All Items Added Till Now</h2>
                
                <div className="filters-container">
                    <div className="search-form">
                        <input
                            type="text"
                            placeholder="Search items by title, note, or author (case-insensitive)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="category-filter">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="items-list">
                    {loading ? (
                        <p>Loading items...</p>
                    ) : items.length === 0 ? (
                        <p>No items found!</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Added by</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.category || "-"}</td>
                                        <td>{item.author}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <Link to={`/note/${item.id}`} className="view-btn">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TillNow;
