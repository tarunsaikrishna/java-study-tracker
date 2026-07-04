import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { 
        user, 
        fetchUserItemsGrouped, 
        fetchUserItemsToday,
        fetchUserDetails,
        deleteItem,
        logout 
    } = useAuth();
    const [groupedItems, setGroupedItems] = useState({});
    const [todayItems, setTodayItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            if (user) {
                try {
                    const grouped = await fetchUserItemsGrouped(user.username);
                    const today = await fetchUserItemsToday(user.username);
                    await fetchUserDetails(user.username);
                    setGroupedItems(grouped);
                    setTodayItems(today);
                } catch (error) {
                    console.error("Error loading data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [user, fetchUserItemsGrouped, fetchUserItemsToday, fetchUserDetails]);

    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteItem(itemId, user.username);
                // Refresh data
                const grouped = await fetchUserItemsGrouped(user.username);
                const today = await fetchUserItemsToday(user.username);
                setGroupedItems(grouped);
                setTodayItems(today);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h1>Java Study Tracker</h1>
                <div className="nav-links">
                    <Link to="/dashboard">My Dashboard</Link>
                    <Link to="/till-now">Till Now</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h2>Welcome, {user?.username}!</h2>
                    <Link to="/add-item" className="add-btn">Add New Item</Link>
                </div>

                <div className="stats-container">
                    <div className="stat-card">
                        <h3>🔥 Streak</h3>
                        <p className="stat-value">{user?.streak || 0} days</p>
                    </div>
                    <div className="stat-card">
                        <h3>📅 Today's Goal</h3>
                        <p className="stat-value">{todayItems.length}/2</p>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="day-by-day-container">
                        {sortedDates.map(date => (
                            <div key={date} className="day-section">
                                <h3 className="day-header">{new Date(date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</h3>
                                <div className="items-list">
                                    {groupedItems[date].map((item, index) => (
                                        <div key={item.id} className="item-card">
                                            <div className="item-info">
                                                <h4>{item.title}</h4>
                                                {item.category && <span className="item-category">{item.category}</span>}
                                                <p className="item-note">{item.note}</p>
                                            </div>
                                            <div className="item-actions">
                                                <Link to={`/note/${item.id}`} className="view-btn">View</Link>
                                                <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {sortedDates.length === 0 && (
                            <p>You haven't added any items yet!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
