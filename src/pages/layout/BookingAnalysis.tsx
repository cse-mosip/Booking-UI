import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
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
} from 'recharts';

import BookingServices from 'src/services/BookingServices';
import { Resource } from 'src/types';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/reducer';

interface Booking {
  id: number;
  resource: number;
  userId: string;
  bookedDate: string;
  startTime: string;
  endTime: string;
  count: number;
  reason: string;
  status: string;
}

const BookingAnalysis: React.FC = () => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const resources: Resource[] | null = useSelector(
    (state: AppState) => state.resources.resources
  );

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

  const getPendingBookingsCount = (): number => {
    return bookingsData.filter((booking) => booking.status === 'PENDING')
      .length;
  };

  const getMostAskedTimes = (): { datetime: string; count: number }[] => {
    const timeSlotCounts: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const startTime = (new Date(booking.startTime)).toLocaleTimeString();
      const endTime = (new Date(booking.endTime)).toLocaleTimeString();
      const timeSlotString = `${startTime}-${endTime}`;
      if (timeSlotCounts[timeSlotString]) {
        timeSlotCounts[timeSlotString]++;
      } else {
        timeSlotCounts[timeSlotString] = 1;
      }
    });
    const sortedTimeSlots = Object.entries(timeSlotCounts).sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1]
    );
    return sortedTimeSlots.slice(0, 3).map(([datetime, count]) => ({
      datetime,
      count,
    }));
  };

  const getMostActiveUsers = (): { user: string; count: number }[] => {
    const userCounts: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const username = booking.userId;
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
    const resourceCounts: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const resourceName = booking.resource.toString();
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
      name: resources.find((r) => r.id == resource).name,
    }));
  };

  const getAverageBookingDuration = (): number => {
    if (bookingsData.length === 0) return 0;

    let totalDuration = 0;
    bookingsData.forEach((booking: Booking) => {
      const startDateTime = new Date(
        `${booking.bookedDate} ${booking.startTime}`
      );
      const endDateTime = new Date(`${booking.bookedDate} ${booking.endTime}`);
      const duration = endDateTime.getTime() - startDateTime.getTime();
      totalDuration += duration;
    });

    return totalDuration / bookingsData.length;
  };

  const getBookingStatusDistribution = (): {
    status: string;
    count: number;
  }[] => {
    const statusCounts: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const status = booking.status;
      if (statusCounts[status]) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });
    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));
  };

  const getResourceUtilization = (): {
    resource: string;
    utilization: number;
  }[] => {
    const resourceUtilization: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const resourceName = booking.resource.toString();
      const startDateTime = new Date(
        `${booking.bookedDate} ${booking.startTime}`
      );
      const endDateTime = new Date(`${booking.bookedDate} ${booking.endTime}`);
      const duration = endDateTime.getTime() - startDateTime.getTime();
      if (resourceUtilization[resourceName]) {
        resourceUtilization[resourceName] += duration;
      } else {
        resourceUtilization[resourceName] = duration;
      }
    });

    const availableTime = 24 * 60 * 60 * 1000; // Assuming 24 hours available for each resource
    return Object.entries(resourceUtilization).map(
      ([resource, utilization]) => ({
        resource,
        utilization: (utilization / availableTime) * 100, // Calculate utilization rate as a percentage
      })
    );
  };

  const getPopularBookingReasons = (): { reason: string; count: number }[] => {
    const reasonCounts: { [key: string]: number } = {};
    bookingsData.forEach((booking: Booking) => {
      const reason = booking.reason;
      if (reasonCounts[reason]) {
        reasonCounts[reason]++;
      } else {
        reasonCounts[reason] = 1;
      }
    });
    const sortedReasons = Object.entries(reasonCounts).sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1]
    );
    return sortedReasons
      .slice(0, 3)
      .map(([reason, count]) => ({ reason, count }));
  };

  const bookingsCount = getPendingBookingsCount();
  const mostAskedTimes = getMostAskedTimes();
  const mostActiveUsers = getMostActiveUsers();
  const mostUsedResources = getMostUsedResources();
  const averageBookingDuration = getAverageBookingDuration();
  const bookingStatusDistribution = getBookingStatusDistribution();
  const resourceUtilization = getResourceUtilization();
  const popularBookingReasons = getPopularBookingReasons();

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
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Bookings Analysis
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader
            avatar={<AccessTimeIcon />}
            title="Most Asked Times"
          />
          <CardContent>
            <BarChart width={300} height={200} data={mostAskedTimes}>
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
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 300, margin: 1 }}>
          <CardHeader avatar={<BusinessIcon />} title="Most Used Resources" />
          <CardContent>
            <BarChart width={300} height={200} data={mostUsedResources}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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
