import React from 'react';
import { supabase } from '../../supabase';

const DashboardPage = () => {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            // Redirect to the landing page or login page after logout.
            window.location.href = '/';
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the monitoring dashboard. You can add your app monitoring components here.</p>
            <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                Logout
            </button>
        </div>
    );
};

export default DashboardPage;
