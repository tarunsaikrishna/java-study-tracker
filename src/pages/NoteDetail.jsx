import { useAuth } from '../context/AuthContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NoteDetail = () => {
    const { id } = useParams();
    const { fetchItemById, user, logout } = useAuth();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const loadItem = async () => {
            try {
                const data = await fetchItemById(id);
                setItem(data);
            } catch (error) {
                console.error("Error loading item:", error);
            } finally {
                setLoading(false);
            }
        };
        loadItem();
    }, [id, fetchItemById]);

    if (loading) {
        return (
            <div className="note-detail-container">
                <nav className="navbar">
                    <h1>Java Study Tracker</h1>
                    <div className="nav-links">
                        <Link to="/dashboard">My Dashboard</Link>
                        <Link to="/till-now">Till Now</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </nav>
                <div className="note-detail-content">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="note-detail-container">
                <nav className="navbar">
                    <h1>Java Study Tracker</h1>
                    <div className="nav-links">
                        <Link to="/dashboard">My Dashboard</Link>
                        <Link to="/till-now">Till Now</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </nav>
                <div className="note-detail-content">
                    <h2>Item not found!</h2>
                    <Link to="/till-now">Go back to Till Now</Link>
                </div>
            </div>
        );
    }

    const photosArray = item.photos ? item.photos.split(',').filter(p => p) : [];

    return (
        <div className="note-detail-container">
            <nav className="navbar">
                <h1>Java Study Tracker</h1>
                <div className="nav-links">
                    <Link to="/dashboard">My Dashboard</Link>
                    <Link to="/till-now">Till Now</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>
            
            <div className="note-detail-content">
                <div className="note-header">
                    <h2>{item.title}</h2>
                    {item.category && <span className="item-category">{item.category}</span>}
                    <div className="note-meta">
                        <span>Added by: {item.author}</span>
                        <span>Date: {item.date}</span>
                    </div>
                </div>
                
                <div className="note-body">
                    <p>{item.note}</p>
                </div>
                
                {photosArray.length > 0 && (
                    <div className="note-photos">
                        <h3>Photos</h3>
                        <div className="photos-grid">
                            {photosArray.map((photo, index) => (
                                <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                )}
                
                <Link to="/till-now" className="back-btn">Back to Till Now</Link>
            </div>
        </div>
    );
};

export default NoteDetail;
