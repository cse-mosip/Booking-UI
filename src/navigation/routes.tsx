import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/layout/Dashboard";
import BookingContainer from "src/pages/create-booking/BookingContainer";
import ViewBookingsContainer from "src/pages/view-bookings/ViewBookingsContainer";
import AddNewResourceContainer from "src/pages/add-resource/AddNewResourceContainer";
import ViewResourcesContainer from "src/pages/view-resources/ViewResourcesContainer";
import LoginContainer from "src/pages/auth/LoginContainer";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter basename={"/frontend-service/booking"}>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute permissions={null}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute permissions={null}>
              <BookingContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute permissions={null}>
              <ViewBookingsContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresource"
          element={
            <ProtectedRoute permissions={["RESOURCE_MANAGER", "ADMIN"]}>
              <AddNewResourceContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewresources"
          element={
            <ProtectedRoute permissions={null}>
              <ViewResourcesContainer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
