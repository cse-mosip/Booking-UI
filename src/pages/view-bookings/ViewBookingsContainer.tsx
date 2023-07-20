import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "src/components/Copyright";
import { Toolbar } from "@mui/material";

import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import { useBookings } from "src/hooks/use-booking/useBookings";
import { useResources } from "src/hooks/use-resource/useResources";

import BookingCard from "./BookingCard";

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
  const [open, setOpen] = useState(false);
  const bookingsData = useBookings();
  const resources = useResources();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

        <Container component="main" maxWidth="md">
          <Toolbar />
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 6 },
              p: { xs: 2, md: 10 },
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
              {bookingsData.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    There are no bookings available.
                  </Typography>
                </Box>
              ) : (
                bookingsData.map((booking, index) => {
                  const resource = resources?.find(
                    (res) => res.id === booking.resource
                  );
                  return (
                    <BookingCard
                      key={index}
                      booking={booking}
                      resource={resource}
                    />
                  );
                })
              )}
            </Box>
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
