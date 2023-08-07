import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import { useBookings } from "src/hooks/use-booking/useBookings";
import { useResources } from "src/hooks/use-resource/useResources";
import { User } from "src/types";
import { useSelector } from "react-redux";
import { AppState } from "src/redux/reducer";

import {
  getPendingBookingsCount,
  getMostAskedTimes,
  getMostActiveUsers,
  getMostUsedResources,
  getAverageBookingDuration,
  getBookingStatusDistribution,
  getCompletedBookingsCount,
  getCanceledBookingsCount,
  getTotalResourceUtilization,
  getAverageResourceUtilization,
} from "src/utils/bookingUtils";

import MostAskedTimesChart from "./MostAskedTimesChart";
import MostActiveUsersPieChart from "./MostActiveUsersPieChart";
import MostUsedResourcesBarChart from "./MostUsedResourcesBarChart";
import { BookingCountsCard } from "./BookingCountsCard";

const BookingAnalysis: React.FC = () => {
  const bookingsData = useBookings();
  const resources = useResources();
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const user: User | null = useSelector((state: AppState) => state.user.user);
  const token = user.token;
  const role = user.role;

  const pendingBookingsCount = getPendingBookingsCount(bookingsData);
  const mostAskedTimes = getMostAskedTimes(bookingsData);
  const mostActiveUsers = getMostActiveUsers(bookingsData);
  const mostUsedResources = getMostUsedResources(bookingsData, resources);
  const averageBookingDuration = getAverageBookingDuration(bookingsData);
  const approvedBookingsCount = getCompletedBookingsCount(bookingsData);
  const rejectedBookingsCount = getCanceledBookingsCount(bookingsData);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Bookings Analysis
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader avatar={<AccessTimeIcon />} title="Most Asked Times" />
          <CardContent>
            <MostAskedTimesChart data={mostAskedTimes} />
          </CardContent>
        </Card>
        {role !== "RESOURCE_USER" ? (
          <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
            <CardHeader avatar={<PersonIcon />} title="Most Active Users" />
            <CardContent>
              <MostActiveUsersPieChart data={mostActiveUsers} />
            </CardContent>
          </Card>
        ) : null}

        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader avatar={<BusinessIcon />} title="Most Used Resources" />
          <CardContent>
            <MostUsedResourcesBarChart data={mostUsedResources} />
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={isLgScreen ? 4 : 12}>
            <BookingCountsCard
              title="Pending Booking Count"
              count={pendingBookingsCount}
            />
          </Grid>
          <Grid item xs={12} lg={isLgScreen ? 4 : 12}>
            <BookingCountsCard
              title="Approved Booking Count"
              count={approvedBookingsCount}
            />
          </Grid>
          <Grid item xs={12} lg={isLgScreen ? 4 : 12}>
            <BookingCountsCard
              title="Rejected Booking Count"
              count={rejectedBookingsCount}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookingAnalysis;
