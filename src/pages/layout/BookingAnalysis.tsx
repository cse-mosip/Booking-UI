import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { bookingsData } from "../view-bookings/examples";

interface Booking {
  booking_id: string;
  booked_resource_id: string;
  resource_name: string;
  username: string;
  count: number;
  datesTimes: { date: string; start: string; end: string }[];
  reason: string;
}

const getBookingsCount = (): number => {
  return bookingsData.length;
};

const getMostAskedDatetimes = (): { datetime: string; count: number }[] => {
  // Calculate the most asked datetimes
  const datetimeCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    booking.datesTimes.forEach((datetime) => {
      const datetimeString = `${datetime.date} ${datetime.start}-${datetime.end}`;
      if (datetimeCounts[datetimeString]) {
        datetimeCounts[datetimeString]++;
      } else {
        datetimeCounts[datetimeString] = 1;
      }
    });
  });
  const sortedDatetimes = Object.entries(datetimeCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedDatetimes.slice(0, 3).map(([datetime, count]) => ({
    datetime,
    count,
  }));
};

const getMostActiveUsers = (): { user: string; count: number }[] => {
  // Calculate the most active users
  const userCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const username = booking.username;
    if (userCounts[username]) {
      userCounts[username]++;
    } else {
      userCounts[username] = 1;
    }
  });
  const sortedUsers = Object.entries(userCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedUsers.slice(0, 3).map(([user, count]) => ({ user, count }));
};

const getMostUsedResources = (): { resource: string; count: number }[] => {
  // Calculate the most used resources
  const resourceCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const resourceName = booking.resource_name;
    if (resourceCounts[resourceName]) {
      resourceCounts[resourceName]++;
    } else {
      resourceCounts[resourceName] = 1;
    }
  });
  const sortedResources = Object.entries(resourceCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedResources.slice(0, 3).map(([resource, count]) => ({
    resource,
    count,
  }));
};

const BookingAnalysis: React.FC = () => {
  const bookingsCount = getBookingsCount();
  const mostAskedDatetimes = getMostAskedDatetimes();
  const mostActiveUsers = getMostActiveUsers();
  const mostUsedResources = getMostUsedResources();

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    const xPos = x + width / 2;
    return (
      <text
        x={xPos}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Bookings Analysis
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader
            avatar={<AccessTimeIcon />}
            title="Most Asked Datetimes"
          />
          <CardContent>
            <BarChart width={300} height={200} data={mostAskedDatetimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#2196f3"
                label={renderCustomBarLabel}
              />
            </BarChart>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader avatar={<PersonIcon />} title="Most Active Users" />
          <CardContent>
            <PieChart width={300} height={200}>
              <Tooltip />
              <Pie
                dataKey="count"
                data={mostActiveUsers}
                outerRadius={80}
                innerRadius={50}
              >
                {mostActiveUsers.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={`#${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}`}
                  />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader
            avatar={<BusinessIcon />}
            title="Most Used Resources"
          />
          <CardContent>
            <BarChart width={300} height={200} data={mostUsedResources}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="resource" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#e91e63"
                label={renderCustomBarLabel}
              />
            </BarChart>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader
            avatar={<AccessTimeIcon />}
            title="Pending Bookings"
            subheader={`Count: ${bookingsCount}`}
          />
        </Card>
      </Box>
    </Paper>
  );
};

export default BookingAnalysis;
