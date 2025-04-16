import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/menu-management">Manage Menu</Link>
        <Link to="/admin/booking-management">Manage Bookings</Link>
        <Link to="/admin/blog-management">Manage Blogs</Link>
        <Link to="/admin/faq-management">Manage FAQs</Link>
      </div>
    </div>
  );
};

export default Dashboard;
