import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mosip.io/">
        MOSIP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ExpandButton = styled((props) => (
  <IconButton {...props}>
    <ExpandMoreIcon />
  </IconButton>
))(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const bookingsData = [
  {
    id: 1,
    resource: "Conference Room C",
    booker: "Sarah Johnson",
    date: "2023-07-17",
    reason:
      "Team brainstorming session to discuss new project ideas and strategies.",
    users: 8,
    attachments: ["attachment3.pdf", "attachment4.jpg"],
  },
  {
    id: 2,
    resource: "Studio D",
    booker: "Michael Brown",
    date: "2023-07-18",
    reason:
      "Photography workshop for beginners to learn essential techniques and improve their skills.",
    users: 10,
    attachments: ["attachment5.docx"],
  },
  {
    id: 3,
    resource: "Lab E",
    booker: "Emily Wilson",
    date: "2023-07-19",
    reason:
      "Science fair project experimentation to analyze the effects of different environmental factors on plant growth and development.",
    users: 4,
    attachments: ["attachment6.jpg", "attachment7.png"],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ViewBookingsContainer() {
  const [expandedId, setExpandedId] = React.useState(null);
  const navigate = useNavigate();

  const handleExpand = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleAccept = (id) => {
    // Handle accept action for the booking with the given id
    console.log(`Accept booking with id: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action for the booking with the given id
    console.log(`Reject booking with id: ${id}`);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="h6" color="inherit" onClick={handleHomeClick}>
            Booking System
          </Button>
          <a href="#">
            <IconButton edge="end" color="inherit" aria-label="User Profile">
              <Avatar alt="User Image" src="/assets/images/21104.png" />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            VIEW BOOKINGS LIST
          </Typography>
          <React.Fragment>
            {bookingsData.map((booking) => (
              <Card
                key={booking.id}
                sx={{ mt: 2 }}
                onClick={() => handleExpand(booking.id)}
                style={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="subtitle1">
                    Resource: {booking.resource}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Booker: {booking.booker}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {booking.date}
                  </Typography>
                  <Collapse
                    in={booking.id === expandedId}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      Reason: {booking.reason}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Users: {booking.users}
                    </Typography>
                    {booking.attachments.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Attachments:
                        </Typography>
                        <ul>
                          {booking.attachments.map((attachment, index) => (
                            <li key={index}>{attachment}</li>
                          ))}
                        </ul>
                      </Box>
                    )}
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleReject(booking.id)}
                        sx={{ mr: 1, backgroundColor: "red", color: "white" }}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleAccept(booking.id)}
                        sx={{ backgroundColor: "green", color: "white" }}
                      >
                        Accept
                      </Button>
                    </Box>
                  </Collapse>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      visibility:
                        booking.id !== expandedId ? "visible" : "hidden",
                    }}
                  >
                    <ExpandButton
                      onClick={() => handleExpand(booking.id)}
                      aria-expanded={booking.id === expandedId}
                      aria-label="show more"
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
