import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import BookingServices from 'src/services/BookingServices';
import Title from './Title';
import { Booking, User } from 'src/types';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/reducer';

export default function BookingTable() {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const user: User | null = useSelector((state: AppState) => state.user.user);
  const token = user.token;

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const data: Booking[] = await BookingServices.getBookings(token);
        setBookingsData(
          data.map((b) => {
            return {
              ...b,
              bookedDate: new Date(b.bookedDate).toLocaleDateString(),
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingsData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Bookings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Booking ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell align="center">Resource ID</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsData.slice(0, 10).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell>{row.bookedDate}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell align="center">{row.resource}</TableCell>
              <TableCell align="center">{row.count}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid item xs={3} sx={{ mt: 3 }}>
        <Link color="primary" component={RouterLink} to={'/bookings'}>
          See all
        </Link>
      </Grid>
    </React.Fragment>
  );
}
