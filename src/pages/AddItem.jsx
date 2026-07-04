import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AddItem = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addItem, fetchAllCategories, user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user) {
            fetchAllCategories().then(setCategories).catch(console.error);
        }
    }, [fetchAllCategories, user]);

    const filteredCategories = categories.filter(cat => 
        cat.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const photoUrls = files.map(file => URL.createObjectURL(file));
        setPhotos(photoUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && note.trim()) {
            await addItem({ title, note, category: category.trim(), photos });
            navigate('/dashboard');
        }
    };

    return (
        <div className="add-item-container">
            <nav className="navbar">
                <h1>Java Study Tracker</h1>
                <div className="nav-links">
                    <Link to="/dashboard">My Dashboard</Link>
                    <Link to="/till-now">Till Now</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>
            
            <div className="add-item-content">
                <h2>Add New Java Concept</h2>
                
                <form onSubmit={handleSubmit} className="add-item-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter the Java concept title"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Note</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                            placeholder="Enter detailed notes about this concept"
                            rows={8}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            list="categories"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Select or enter a category"
                        />
                        <datalist id="categories">
                            {filteredCategories.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                    </div>
                    
                    <div className="form-group">
                        <label>Photos (Optional)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        {photos.length > 0 && (
                            <div className="photo-preview">
                                {photos.map((photo, index) => (
                                    <img key={index} src={photo} alt={`Preview ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Add Item</button>
                        <Link to="/dashboard" className="cancel-btn">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
