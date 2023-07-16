import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { BookingCard } from "./BookingCard";
import BookingServices from "src/services/BookingServices";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import Copyright from "src/components/Copyright";
import { Toolbar } from "@mui/material";

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function ViewBookingsContainer(): JSX.Element {
  const navigate = useNavigate();
  const [bookingsData, setBookingsData] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleHomeClick = (): void => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const data = await BookingServices.getBookings();
        setBookingsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingsData();
  }, []);

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

        <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Toolbar />
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
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
