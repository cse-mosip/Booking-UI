import React from "react";
import {
  Toolbar,
  IconButton,
  Divider,
  List,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Book,
  ViewList,
  AddBox,
  PieChart,
  ExitToApp,
} from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function DrawerComponent({open, toggleDrawer}) {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleAddBooking = () => {
    navigate("/book");
  };

  const handleViewBookings = () => {
    navigate("/bookings");
  };

  const handleAddNewResource = () => {
    navigate("/addresource");
  };

  const handleViewResource = () => {
    navigate("/viewresources");
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <React.Fragment>
          <ListItemButton onClick={handleHomeClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={handleAddBooking}>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary="Add New Booking" />
          </ListItemButton>
          <ListItemButton onClick={handleViewBookings}>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItemButton>
          <ListItemButton onClick={handleAddNewResource}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Add New Resource" />
          </ListItemButton>
          <ListItemButton onClick={handleViewResource}>
            <ListItemIcon>
              <PieChart />
            </ListItemIcon>
            <ListItemText primary="Resources" />
          </ListItemButton>
        </React.Fragment>
      </List>
    </Drawer>
  );
}
