import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
function FutureBookingsTable({ bookings }) {
    return (React.createElement("table", { style: { width: "100%" } },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", { style: { textAlign: "left" } }, "Booker"),
                React.createElement("th", { style: { textAlign: "center" } }, "User Count"),
                React.createElement("th", { style: { textAlign: "center" } }, "Date"),
                React.createElement("th", { style: { textAlign: "center" } }, "Time"),
                React.createElement("th", { style: { textAlign: "center" } }, "Duration"))),
        React.createElement("tbody", null, bookings.map((booking) => (React.createElement("tr", { key: booking.id },
            React.createElement("td", { style: { textAlign: "left" } }, booking.booker),
            React.createElement("td", { style: { textAlign: "center" } }, booking.users),
            React.createElement("td", { style: { textAlign: "center" } }, booking.date),
            React.createElement("td", { style: { textAlign: "center" } }, booking.time),
            React.createElement("td", { style: { textAlign: "center" } }, booking.duration)))))));
}
function ResourceCard({ resource }) {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    const handleEditResource = () => {
        // Handle edit resource action
        console.log(`Edit resource with id: ${resource.resource_id}`);
    };
    return (React.createElement(Card, { sx: { mt: 2 }, onClick: handleExpand, style: { cursor: "pointer" } },
        React.createElement(CardContent, null,
            React.createElement(Typography, { variant: "subtitle1" },
                "Resource ID: ",
                resource.resource_id),
            React.createElement(Typography, { variant: "body2", color: "textSecondary" },
                "Resource Name: ",
                resource.resource_name),
            React.createElement(Typography, { variant: "body2", color: "textSecondary" },
                "Faculty: ",
                resource.faculty),
            React.createElement(Typography, { variant: "body2", color: "textSecondary" },
                "Department: ",
                resource.department),
            React.createElement(CardActions, { disableSpacing: true },
                React.createElement(IconButton, { onClick: handleExpand, "aria-expanded": expanded },
                    React.createElement(ExpandMoreIcon, { style: {
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        } }))),
            React.createElement(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
                React.createElement(FutureBookingsTable, { bookings: resource.futureBookings })),
            React.createElement(Box, { sx: {
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                } },
                React.createElement(Button, { variant: "contained", onClick: handleEditResource, sx: { backgroundColor: "green", color: "white" } }, "Edit Resource")))));
}
const resourcesData = [
    {
        resource_id: 1,
        resource_name: "Conference Room C",
        faculty: "Faculty A",
        department: "Department X",
        futureBookings: [
            { id: 1, booker: "Sarah Johnson", date: "2023-07-17", users: 8, time: "10:00 AM", duration: "2hrs" },
            { id: 2, booker: "Michael Brown", date: "2023-07-18", users: 10, time: "2:00 PM", duration: "2hrs" },
        ],
    },
    {
        resource_id: 2,
        resource_name: "Studio D",
        faculty: "Faculty B",
        department: "Department Y",
        futureBookings: [
            { id: 3, booker: "Emily Wilson", date: "2023-07-19", users: 4, time: "9:30 AM", duration: "2hrs" },
            { id: 4, booker: "John Smith", date: "2023-07-20", users: 6, time: "11:00 AM", duration: "2hrs" },
        ],
    },
    {
        resource_id: 3,
        resource_name: "Lab E",
        faculty: "Faculty C",
        department: "Department Z",
        futureBookings: [
            { id: 5, booker: "Jane Doe", date: "2023-07-21", users: 5, time: "3:00 PM", duration: "2hrs" },
            { id: 6, booker: "Alex Johnson", date: "2023-07-22", users: 3, time: "1:30 PM", duration: "2hrs" },
        ],
    },
];
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function ViewResourcesContainer() {
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
            React.createElement(Toolbar, { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement(Button, { color: "inherit", onClick: handleHomeClick }, "Booking System"),
                React.createElement("a", { href: "#" },
                    React.createElement(IconButton, { edge: "end", color: "inherit", "aria-label": "User Profile" },
                        React.createElement(Avatar, { alt: "User Image", src: "/assets/images/21104.png" }))))),
        React.createElement(Container, { component: "main", maxWidth: "sm", sx: { mb: 4 } },
            React.createElement(Paper, { variant: "outlined", sx: { my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } } },
                React.createElement(Typography, { component: "h1", variant: "h4", align: "center" }, "VIEW RESOURCES LIST"),
                React.createElement(Box, { sx: { mt: 2 } }, resourcesData.map((resource) => (React.createElement(ResourceCard, { key: resource.resource_id, resource: resource }))))),
            React.createElement(Box, { sx: { mt: 2 } },
                React.createElement(Button, { variant: "contained", onClick: handleHomeClick, sx: { width: "100%" } }, "Go Back")),
            React.createElement(Box, { sx: { mt: 4 } },
                React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " MOSIP")))));
}
//# sourceMappingURL=ViewResourcesContainer.js.map