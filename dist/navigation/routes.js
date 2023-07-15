import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "../pages/layout/Dashboard";
import BookingContainer from "src/pages/create-booking/BookingContainer";
import ViewBookingsContainer from 'src/pages/view-bookings/ViewBookingsContainer';
import AddNewResourceContainer from 'src/pages/add-resource/AddNewResourceContainer';
import ViewResourcesContainer from 'src/pages/view-resources/ViewResourcesContainer';
import LoginContainer from 'src/pages/auth/LoginContainer';
const AppRoutes = () => {
    return (React.createElement(BrowserRouter, { basename: process.env.PUBLIC_URL },
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) }),
            React.createElement(Route, { path: "/login", element: React.createElement(LoginContainer, null) }),
            React.createElement(Route, { path: "/book", element: React.createElement(BookingContainer, null) }),
            React.createElement(Route, { path: "/bookings", element: React.createElement(ViewBookingsContainer, null) }),
            React.createElement(Route, { path: "/addresource", element: React.createElement(AddNewResourceContainer, null) }),
            React.createElement(Route, { path: "/viewresources", element: React.createElement(ViewResourcesContainer, null) }))));
};
export default AppRoutes;
//# sourceMappingURL=routes.js.map