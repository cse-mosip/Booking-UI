import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import { green, red, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "src/redux/reducer";
import { Booking, Resource, User } from "src/types";
import { useBookingStatus } from "src/hooks/use-booking/useBookingStatus";


const ExpandIndicator = styled(ExpandMoreIcon)(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: "auto",
}));

interface Props {
  booking: Booking;
  resource: Resource;
}

const BookingCard: React.FC<Props> = ({ booking, resource }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const user:User|null = useSelector((state:AppState)=>state.user.user);
  const token = user.token;
  const role = user.role;

  //     ADMIN , RESOURCE_MANAGER, RESOURCE_USER

  const { status, loading, handleAccept, handleReject } = useBookingStatus(
    booking.id,
    booking.status
  );
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

  const handleAcceptButtonClick = async () => {
    await handleAccept();
  };

  const handleRejectButtonClick = async () => {
    await handleReject();
  };

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  const getStatusColor = () => {
    switch (status) {
      case "APPROVED":
        return green[500];
      case "REJECTED":
        return red[500];
      default:
        return grey[500];
    }
  };

  const calculatePercentage = (requested, maximum) => {
    return Math.min((requested / maximum) * 100, 100);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const bookedDate = new Date(booking.bookedDate);
  const startTime = new Date(booking.startTime);
  const endTime = new Date(booking.endTime);

  const openResourcePopover = Boolean(anchorEl);
  const resourcePopoverId = openResourcePopover
    ? "resource-popover"
    : undefined;

  return (
    <Card variant="outlined" sx={{ mt: 2, backgroundColor: "#F5F7FA" }}>
      <CardContent
        onClick={handleCardClick}
        style={{
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
        sx={{
          "&:hover": {
            backgroundColor: "#E0E6ED",
          },
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Booking ID: {booking.id}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Tooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">{resource.name}</Typography>
                  <em>{"Maximum of"}</em> <b>{resource.count}</b>
                  <em>{" resources can be used"}</em>
                </React.Fragment>
              }
              placement="top"
            >
              <Typography
                variant="body2"
                color="textSecondary"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onMouseOver={handleResourceIdClick}
                onMouseOut={handleResourcePopoverClose}
              >
                Resource ID: {booking.resource}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={2}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold" }}
            >
              Resource Name: {resource.name}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold" }}
            >
              User: {booking.userId}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold" }}
            >
              Booked on: {bookedDate.toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={2} textAlign="right">
            <IconButton
              onClick={handleExpand}
              aria-expanded={expanded}
              sx={{ marginLeft: "auto" }}
            >
              <ExpandIndicator
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            Reason: {booking.reason}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Requested Resource Count: {booking.count}
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Maximum Count of the Resource: {resource.count}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 20,
                backgroundColor: "#E0E6ED",
                borderRadius: 10,
                mt: 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${calculatePercentage(
                    booking.count,
                    resource.count
                  )}%`,
                  height: "100%",
                  backgroundColor: green[500],
                  borderRadius: "inherit",
                  transition: "width 0.5s ease-in-out",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}
              >
                {`${Math.round(
                  calculatePercentage(booking.count, resource.count)
                )}%`}
              </Box>
              <Tooltip
                title={`Requested: ${formatNumberWithCommas(
                  booking.count
                )} / Maximum: ${formatNumberWithCommas(resource.count)}`}
              >
                <Box
                  sx={{
                    width: `${calculatePercentage(
                      booking.count,
                      resource.count
                    )}%`,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                    transition: "width 0.3s ease-in-out",
                    "&:hover": {
                      width: `${
                        calculatePercentage(booking.count, resource.count) + 5
                      }%`,
                      backgroundColor: green[600],
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <TableContainer
            sx={{
              mt: 2,
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
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
                  <TableCell>{bookedDate.toLocaleString()}</TableCell>
                  <TableCell>{startTime.toLocaleString()}</TableCell>
                  <TableCell>{endTime.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: 1 }}>
        {loading ? (
          <div>Loading...</div>
        ) : status === "PENDING" ? (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={handleRejectButtonClick}
              disabled={role=='RESOURCE_USER'}
              sx={{
                backgroundColor: "#E53E3E",
                color: "#FFFFFF",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#C53030",
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              onClick={handleAcceptButtonClick}
              disabled={role=='RESOURCE_USER'}

              sx={{
                ml: 1,
                backgroundColor: "#38A169",
                color: "#FFFFFF",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#2F855A",
                },
              }}
            >
              Accept
            </Button>
          </Box>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Chip
              label={status}
              variant="outlined"
              style={{ color: getStatusColor(), borderColor: getStatusColor() }}
            />
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default BookingCard;
