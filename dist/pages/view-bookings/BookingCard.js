import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
const ExpandIndicator = styled(ExpandMoreIcon)(({ theme }) => ({
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
}));
export const BookingCard = ({ booking }) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    const navigateToResource = () => {
        navigate(`/resource/${booking.booked_resource_id}`);
        setExpanded(true);
    };
    const handleAccept = () => {
        // Handle accept action for the booking
        console.log(`Accept booking: ${booking.booking_id}`);
    };
    const handleReject = () => {
        // Handle reject action for the booking
        console.log(`Reject booking: ${booking.booking_id}`);
    };
    const handleCardClick = () => {
        setExpanded(!expanded);
    };
    return (React.createElement(Card, { variant: "outlined", sx: { mt: 2, backgroundColor: "#F5F7FA" } },
        React.createElement(CardContent, { onClick: handleCardClick, style: {
                cursor: "pointer",
                transition: "background-color 0.3s ease-in-out",
            }, sx: {
                "&:hover": {
                    backgroundColor: "#E0E6ED",
                },
            } },
            React.createElement(Box, { sx: { display: "flex", alignItems: "center" } },
                React.createElement(Typography, { variant: "subtitle1", fontWeight: "bold" },
                    "Booking ID: ",
                    booking.booking_id),
                React.createElement(IconButton, { onClick: handleExpand, "aria-expanded": expanded, sx: { marginLeft: "auto" } },
                    React.createElement(ExpandIndicator, { style: {
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                        } }))),
            React.createElement(Typography, { variant: "body2", color: "textSecondary" },
                "Booked Resource ID:",
                " ",
                React.createElement("span", { style: {
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }, onClick: navigateToResource }, booking.booked_resource_id)),
            React.createElement(Typography, { variant: "body2", color: "textSecondary" },
                "Username: ",
                booking.username),
            React.createElement(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
                React.createElement(Typography, { variant: "body2", color: "textSecondary", sx: { mt: 2, fontWeight: "bold" } },
                    "Resource Name: ",
                    booking.resource_name),
                React.createElement(Typography, { variant: "body2", color: "textSecondary", fontWeight: "bold" },
                    "Reason: ",
                    booking.reason),
                React.createElement(Typography, { variant: "body2", color: "textSecondary", fontWeight: "bold" },
                    "Count: ",
                    booking.count),
                React.createElement(TableContainer, { sx: {
                        mt: 2,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                    } },
                    React.createElement(Table, null,
                        React.createElement(TableHead, null,
                            React.createElement(TableRow, null,
                                React.createElement(TableCell, null, "Date"),
                                React.createElement(TableCell, null, "Start Time"),
                                React.createElement(TableCell, null, "End Time"))),
                        React.createElement(TableBody, null, booking.datesTimes.map((dateTime, index) => (React.createElement(TableRow, { key: index },
                            React.createElement(TableCell, null, dateTime.date),
                            React.createElement(TableCell, null, dateTime.start),
                            React.createElement(TableCell, null, dateTime.end))))))))),
        React.createElement(CardActions, { disableSpacing: true, sx: { paddingTop: 1 } },
            React.createElement(Box, { sx: { display: "flex", justifyContent: "flex-end", width: "100%" } },
                React.createElement(Button, { variant: "contained", onClick: handleReject, sx: {
                        backgroundColor: "#E53E3E",
                        color: "#FFFFFF",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#C53030",
                        },
                    } }, "Reject"),
                React.createElement(Button, { variant: "contained", onClick: handleAccept, sx: {
                        ml: 1,
                        backgroundColor: "#38A169",
                        color: "#FFFFFF",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#2F855A",
                        },
                    } }, "Accept")))));
};
//# sourceMappingURL=BookingCard.js.map