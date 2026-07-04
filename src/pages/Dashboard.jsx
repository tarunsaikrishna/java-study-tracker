import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { user, fetchUserItems, logout } = useAuth();
    const [myItems, setMyItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadItems = async () => {
            if (user) {
                const items = await fetchUserItems(user.username);
                setMyItems(items);
            }
        };
        loadItems();
    }, [user, fetchUserItems]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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

                <div className="items-list">
                    <h3>Your Added Items</h3>
                    {myItems.length === 0 ? (
                        <p>You haven't added any items yet!</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
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

export default Dashboard;
