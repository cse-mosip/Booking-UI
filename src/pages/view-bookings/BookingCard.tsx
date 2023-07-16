import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import BookingServices from 'src/services/BookingServices';


interface Booking {
  booking_id: string;
  booked_resource_id: string;
  username: string;
  resource_name: string;
  reason: string;
  count: number;
  datesTimes: {
    date: string;
    start: string;
    end: string;
  }[];
}

const ExpandIndicator = styled(ExpandMoreIcon)(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: "auto",
}));

export const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
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
    BookingServices.updateBookingStatus(booking.booking_id, "APPROVED");
    console.log(`Accept booking: ${booking.booking_id}`);
  };

  const handleReject = () => {
    BookingServices.updateBookingStatus(booking.booking_id, "APPROVED");
    console.log(`Reject booking: ${booking.booking_id}`);
  };

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" sx={{ mt: 2, backgroundColor: "#F5F7FA" }}>
      <CardContent
        onClick={handleCardClick}
        style={{
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
        sx={{
          "&:hover": {
            backgroundColor: "#E0E6ED",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Booking ID: {booking.booking_id}
          </Typography>
          <IconButton
            onClick={handleExpand}
            aria-expanded={expanded}
            sx={{ marginLeft: "auto" }}
          >
            <ExpandIndicator
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Booked Resource ID:{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={navigateToResource}
          >
            {booking.booked_resource_id}
          </span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Username: {booking.username}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Resource Name: {booking.resource_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Reason: {booking.reason}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Count: {booking.count}
          </Typography>
          <TableContainer
            sx={{
              mt: 2,
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.datesTimes.map((dateTime, index) => (
                  <TableRow key={index}>
                    <TableCell>{dateTime.date}</TableCell>
                    <TableCell>{dateTime.start}</TableCell>
                    <TableCell>{dateTime.end}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <Button
            variant="contained"
            onClick={handleReject}
            sx={{
              backgroundColor: "#E53E3E",
              color: "#FFFFFF",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#C53030",
              },
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={handleAccept}
            sx={{
              ml: 1,
              backgroundColor: "#38A169",
              color: "#FFFFFF",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#2F855A",
              },
            }}
          >
            Accept
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
