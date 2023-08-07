import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookingCard from "./BookingCard";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import Copyright from "src/components/Copyright";
import { Toolbar, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/reducer";
import { Booking, Resource, User } from "src/types";
import { useBookings } from "src/hooks/use-booking/useBookings";

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
  const resources: Resource[] | null = useSelector(
    (state: AppState) => state.resources.resources
  );
  const [open, setOpen] = useState(false);
  const bookingsData = useBookings();
  const [tabValue, setTabValue] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const pendingBookings = bookingsData.filter(
    (booking) => booking.status === "PENDING"
  );
  const approvedBookings = bookingsData.filter(
    (booking) => booking.status === "APPROVED"
  );
  const rejectedBookings = bookingsData.filter(
    (booking) => booking.status === "REJECTED"
  );

  // Sort bookings by date in descending order
  const sortByDateDesc = (a: Booking, b: Booking) =>
  new Date(b.bookedDate).getTime() - new Date(a.bookedDate).getTime();
  pendingBookings.sort(sortByDateDesc);
  approvedBookings.sort(sortByDateDesc);
  rejectedBookings.sort(sortByDateDesc);

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

        <Container component="main" maxWidth="lg">
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
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="Pending" />
              <Tab label="Approved" />
              <Tab label="Rejected" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && pendingBookings.length === 0 && (
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
                    There are no pending bookings.
                  </Typography>
                </Box>
              )}
              {tabValue === 1 && approvedBookings.length === 0 && (
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
                    There are no approved bookings.
                  </Typography>
                </Box>
              )}
              {tabValue === 2 && rejectedBookings.length === 0 && (
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
                    There are no rejected bookings.
                  </Typography>
                </Box>
              )}
              {tabValue === 0 &&
                pendingBookings.map((booking, index) => {
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
                })}
              {tabValue === 1 &&
                approvedBookings.map((booking, index) => {
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
                })}
              {tabValue === 2 &&
                rejectedBookings.map((booking, index) => {
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
                })}
            </Box>
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}