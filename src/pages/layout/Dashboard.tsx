import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Toolbar,
  Box,
  CssBaseline,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useDispatch} from 'react-redux';
import Copyright from "src/components/Copyright";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import BackgroundImage from "../../../public/assets/images/background.jpg";
import BookingTable from "./BookingsTable";
import BookingAnalysis from "./BookingAnalysis";
import resourcesService from "src/services/ResourcesServices";    
import {enqueueResources} from 'src/redux/resource/actions';
import { User } from 'src/types';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/reducer';

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
  const user: User | null = useSelector((state: AppState) => state.user.user);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    SetResources();
  }, [])

  const SetResources = async () => {
      const token = user.token;
      const resourceData = await resourcesService.getResources(token);
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
