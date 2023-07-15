import React from 'react';
import { Button, Grid, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { enqueueResources } from 'src/redux/resource/actions';
const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddBooking = () => {
        navigate('/book');
    };
    const handleViewBookings = () => {
        navigate('/bookings');
    };
    const handleAddNewResource = () => {
        navigate('/addresource');
    };
    const handleViewResource = () => {
        navigate('/viewresources');
    };
    const handleLogin = () => {
        navigate('/login');
    };
    const resources = [
        {
            id: '1',
            name: 'Lab2',
            category: 'cse',
            description: 'resource for exams'
        },
        {
            id: '2',
            name: 'Lab1',
            category: 'cse',
            description: 'resource for exams'
        }
    ];
    dispatch(enqueueResources(resources));
    return (React.createElement(Container, { style: { height: '100vh', display: 'flex', alignItems: 'center' } },
        React.createElement(Grid, { container: true, spacing: 2, justifyContent: "center" },
            React.createElement(Button, { variant: "contained", color: "success", onClick: handleLogin, style: { width: '100%' }, title: "Click to go to the login page" }, "Login"),
            React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                React.createElement(Button, { variant: "contained", color: "primary", onClick: handleAddBooking, style: { width: '100%' }, title: "Click to add a new booking" }, "Add a New Booking")),
            React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                React.createElement(Button, { variant: "contained", color: "primary", onClick: handleViewBookings, style: { width: '100%' }, title: "Click to view the list of bookings" }, "View the List of Bookings")),
            React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                React.createElement(Button, { variant: "contained", color: "primary", onClick: handleAddNewResource, style: { width: '100%' }, title: "Click to add a new resource" }, "Add a New Resource")),
            React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                React.createElement(Button, { variant: "contained", color: "primary", onClick: handleViewResource, style: { width: '100%' }, title: "Click to view and edit existing resources list" }, "View and Edit Existing Resources List")))));
};
export default Dashboard;
//# sourceMappingURL=Dashboard.js.map