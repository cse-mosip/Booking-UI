import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Link,
  CssBaseline,
  Divider,
  List,
  Paper,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import UniversityLogo from "../../public/assets/images/University_of_Moratuwa_logo.png";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppbarComponent({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform logout logic here
      navigate("/");
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar
          src={UniversityLogo}
          alt="University of Moratuwa"
          sx={{ width: 40, height: 40 }}
          variant="rounded"
        />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToApp />
          Logout
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
