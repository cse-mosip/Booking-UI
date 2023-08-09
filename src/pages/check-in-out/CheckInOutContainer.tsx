import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Resource, User } from "../../types";
import ResourcesServices from "../../services/ResourcesServices";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";
import FingerprintUi from "./FingerprintUI";
import CssBaseline from "@mui/material/CssBaseline";
import AppbarComponent from "../../components/AppbarComponent";
import DrawerComponent from "../../components/DrawerComponent";
import { Box, Container, Paper, Toolbar, Typography } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import Copyright from "../../components/Copyright";
import FingerprintService from "../../services/fingerprintService/FingerprintService";
import FingerprintAuthServices from "../../services/FingerprintAuthServices";

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function CheckInOutContainer() {
  const [resource, setResource] = useState<Resource | null>(null);
  const user: User | null = useSelector((state: AppState) => state.user.user);
  const { resourceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user.role !== "RESOURCE_MANAGER" && user.role !== "ADMIN") {
      navigate("/dashboard");
    }
  }, []);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchResource = async () => {
      const id = parseInt(resourceId);
      if (isNaN(id)) {
        setResource(null);
        return;
      }

      const res = await ResourcesServices.getResourceById(id, user.token);

      if (res.data && res.data.id) setResource(res.data);
      else setResource(null);
    };

    fetchResource();
  }, [resourceId]);

  const authenticateFp = async () => {
    const id = parseInt(resourceId);
    if (isNaN(id)) {
      return;
    }

    const fingerprintData = await FingerprintService.getFingerprint();
    const authenticationData = FingerprintAuthServices.fpAuthenticate(
      id,
      fingerprintData
    );

    // TODO: Display the result
  };

  const [sendingRequests, setSendingRequests] = useState(true);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (sendingRequests && resource) {
      intervalId = setInterval(authenticateFp, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sendingRequests]);

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
        <Container component="main" sx={{ mb: 4 }}>
          <Toolbar />
          <Box sx={{ my: 5 }}>
            {resource && (
              <FingerprintUi
                resourceName={resource.name}
                requests={setSendingRequests}
              />
            )}
            {!resource && (
              <Typography variant="h4">Resource not found.</Typography>
            )}
          </Box>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
