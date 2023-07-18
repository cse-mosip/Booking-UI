import { AddBox, Book, PieChart, ViewList } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Divider, IconButton, List, Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

export default function DrawerComponent({ open, toggleDrawer }) {
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
          <ListItemButton component={RouterLink} to={'/dashboard'}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to={'/book'}>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary="Add New Booking" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to={'/bookings'}>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to={'/addresource'}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Add New Resource" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to={'/viewresources'}>
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
