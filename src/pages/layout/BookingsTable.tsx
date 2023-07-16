import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";

import Title from './Title';
import { bookingsData } from '../view-bookings/examples';

export default function BookingTable() {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate("/bookings");
  };

  return (
    <React.Fragment>
      <Title>Recent Bookings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Resource Name</TableCell>
            <TableCell>Count</TableCell>
            <TableCell align="right">Booking ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsData.slice(0, 10).map((row) => (
            <TableRow key={row.booking_id}>
              <TableCell>{row.datesTimes[0].date}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.resource_name}</TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell align="right">{row.booking_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" onClick={handleViewBookings} sx={{ mt: 3 }}>
        See all
      </Link>
    </React.Fragment>
  );
}
