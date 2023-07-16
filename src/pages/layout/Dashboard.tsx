import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Toolbar,
  Box,
  CssBaseline,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "src/components/Copyright";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import BackgroundImage from "../../../public/assets/images/background.jpg";
import Orders from "./Orders";
import BookingTable from "./BookingsTable";
import BookingAnalysis from "./BookingAnalysis";


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

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      SetResources();
    }, 1000);
  }, [])

  const SetResources = async () => {
      const resourceData = await resourcesService.getResources();
      if(resourceData?.status){
          dispatch(enqueueResources(resourceData.data));
      }
  }

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            position: "relative",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 4,
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BookingAnalysis />
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <BookingTable />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>

              <Copyright />
            </Container>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
