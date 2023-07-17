import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Popover,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { Resource } from 'src/types';
import BookingServices from 'src/services/BookingServices';

interface Booking {
  id: string;
  resource: string;
  userId: string;
  reason: string;
  count: number;
  bookedDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

const ExpandIndicator = styled(ExpandMoreIcon)(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: 'auto',
}));

interface Props {
  booking: Booking;
  resource: Resource;
}

const BookingCard: React.FC<Props> = ({ booking, resource }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [status, setStatus] = useState(booking.status);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleResourceIdClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResourcePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async () => {
    const updatedBooking = await BookingServices.updateBookingStatus(
      booking.id,
      'APPROVED'
    );
    setStatus(updatedBooking.data.status);
  };

  const handleReject = async () => {
    const updatedBooking = await BookingServices.updateBookingStatus(
      booking.id,
      'REJECTED'
    );
    setStatus(updatedBooking.data.status);
  };

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  const openResourcePopover = Boolean(anchorEl);
  const resourcePopoverId = openResourcePopover
    ? 'resource-popover'
    : undefined;

  return (
    <Card variant="outlined" sx={{ mt: 2, backgroundColor: '#F5F7FA' }}>
      <CardContent
        onClick={handleCardClick}
        style={{
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
        }}
        sx={{
          '&:hover': {
            backgroundColor: '#E0E6ED',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Booking ID: {booking.id}
          </Typography>
          <IconButton
            onClick={handleExpand}
            aria-expanded={expanded}
            sx={{ marginLeft: 'auto' }}
          >
            <ExpandIndicator
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </IconButton>
        </Box>
        <Tooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{resource.name}</Typography>
              <em>{'Maximum of'}</em> <b>{resource.count}</b>
              <em>{' resources can be used'}</em>
            </React.Fragment>
          }
          placement="top"
        >
          <Button
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseOver={handleResourceIdClick}
            onMouseOut={handleResourcePopoverClose}
          >
            <Typography variant="body2" color="textSecondary">
              Booked Resource ID: {booking.resource}
            </Typography>
          </Button>
        </Tooltip>

        <Typography variant="body2" color="textSecondary">
          Username: {booking.userId}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 2, fontWeight: 'bold' }}
          >
            Resource Name: {resource.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Reason: {booking.reason}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Requested Resouce Count: {booking.count}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Maximum Count of the Resource: {resource.count}
          </Typography>
          <TableContainer
            sx={{
              mt: 2,
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{booking.bookedDate}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: 1 }}>
        {status === 'PENDING' ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <Button
              variant="contained"
              onClick={handleReject}
              sx={{
                backgroundColor: '#E53E3E',
                color: '#FFFFFF',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#C53030',
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                ml: 1,
                backgroundColor: '#38A169',
                color: '#FFFFFF',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#2F855A',
                },
              }}
            >
              Accept
            </Button>
          </Box>
        ) : (
          <div>{status}</div>
        )}
      </CardActions>
    </Card>
  );
};

export default BookingCard;
