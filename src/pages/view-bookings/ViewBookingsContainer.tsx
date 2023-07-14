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

export default function ViewBookingsContainer(): JSX.Element {
  const navigate = useNavigate();

  const handleHomeClick = (): void => {
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button color="inherit" onClick={handleHomeClick}>
            Booking System
          </Button>
          <IconButton edge="end" color="inherit" aria-label="User Profile">
            <Avatar alt="User Image" src="/assets/images/21104.png" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 10 },
            backgroundColor: "#F5F7FA",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            VIEW BOOKINGS LIST
          </Typography>
          <Box sx={{ mt: 2 }}>
            {bookingsData.map((booking) => (
              <BookingCard key={booking.booking_id} booking={booking} />
            ))}
          </Box>
        </Paper>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleHomeClick}
            sx={{
              width: "100%",
              backgroundColor: "#3F51B5",
              color: "#FFFFFF",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#303F9F",
              },
            }}
          >
            Go Back
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} MOSIP
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
