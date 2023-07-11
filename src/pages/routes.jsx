import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from "./layout/Dashboard";
import BookingContainer from "./create-booking/BookingContainer";

const AppRoutes = () => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/booking" element={<BookingContainer/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
