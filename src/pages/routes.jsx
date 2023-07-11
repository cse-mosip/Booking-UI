import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from "./layout/Dashboard";
import BookingContainer from "./create-booking/BookingContainer";
import ViewBookingsContainer from './view-bookings/ViewBookingsContainer';
import AddNewResourceContainer from './add-resource/AddNewResourceContainer';
import ViewResourcesContainer from './view-resources/ViewResourcesContainer';

const AppRoutes = () => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/book" element={<BookingContainer/>}/>
                <Route path="/bookings" element={<ViewBookingsContainer/>}/>
                <Route path="/addresource" element={<AddNewResourceContainer/>}/>
                <Route path="/viewresources" element={<ViewResourcesContainer/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
