import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, Users, MenuManagement, BookingManagement, BlogManagement, FAQManagement } from '../pages/admin';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/menu-management" component={MenuManagement} />
        <Route path="/admin/booking-management" component={BookingManagement} />
        <Route path="/admin/blog-management" component={BlogManagement} />
        <Route path="/admin/faq-management" component={FAQManagement} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
