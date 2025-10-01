// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login');
        }

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <div className="container mt-5">
            <h1>Welcome, {user.name || user.email}!</h1>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            {/* ... rest of your dashboard content */}
        </div>
    );
};

export default Dashboard;