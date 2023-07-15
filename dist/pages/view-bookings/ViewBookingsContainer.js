import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookingCard } from "./BookingCard";
import { bookingsData } from "./examples";
const defaultTheme = createTheme();
export default function ViewBookingsContainer() {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    };
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "absolute", color: "default", elevation: 0, sx: {
                position: "relative",
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
            } },
            React.createElement(Toolbar, { sx: { justifyContent: "space-between" } },
                React.createElement(Button, { color: "inherit", onClick: handleHomeClick }, "Booking System"),
                React.createElement(IconButton, { edge: "end", color: "inherit", "aria-label": "User Profile" },
                    React.createElement(Avatar, { alt: "User Image", src: "/assets/images/21104.png" })))),
        React.createElement(Container, { component: "main", maxWidth: "md", sx: { mt: 4, mb: 4 } },
            React.createElement(Paper, { variant: "outlined", sx: {
                    my: { xs: 3, md: 6 },
                    p: { xs: 2, md: 10 },
                    backgroundColor: "#F5F7FA",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                } },
                React.createElement(Typography, { component: "h1", variant: "h4", align: "center", sx: { fontWeight: "bold", mb: 4 } }, "VIEW BOOKINGS LIST"),
                React.createElement(Box, { sx: { mt: 2 } }, bookingsData.map((booking) => (React.createElement(BookingCard, { key: booking.booking_id, booking: booking }))))),
            React.createElement(Box, { sx: { mt: 2 } },
                React.createElement(Button, { variant: "contained", onClick: handleHomeClick, sx: {
                        width: "100%",
                        backgroundColor: "#3F51B5",
                        color: "#FFFFFF",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#303F9F",
                        },
                    } }, "Go Back")),
            React.createElement(Box, { sx: { mt: 4 } },
                React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " MOSIP")))));
}
//# sourceMappingURL=ViewBookingsContainer.js.map