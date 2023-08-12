import { Box, Container, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppbarComponent from "../../components/AppbarComponent";
import Copyright from "../../components/Copyright";
import DrawerComponent from "../../components/DrawerComponent";
import { socket } from "../../helpers/socket";
import { AppState } from "../../redux/reducer";
import FingerprintAuthServices from "../../services/FingerprintAuthServices";
import ResourcesServices from "../../services/ResourcesServices";
import {FingerPrintDetails, Resource, User} from "../../types";
import FingerprintUi from "./FingerprintUI";
import {FingerPrintResults} from "../../components/FingerPrintResults";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'


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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [access, setAccess] = useState(false);
  const [booking, setBooking] = useState<FingerPrintDetails|null>(null);

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

  useEffect(() => {
    if (resource === null) return;
    socket.on("fingerprintData", async (fingerprintData) => {
      const authenticationData: any =
        await FingerprintAuthServices.fpAuthenticate(
          parseInt(resource.id),
          fingerprintData,
          user.token
        );
      if(authenticationData){
        const { username,startTime,endTime,count } = authenticationData.data;

        dayjs.extend(localizedFormat);
        const booking:FingerPrintDetails = {
          username,
          count,
          timeslot:dayjs(startTime).format('L LT')+'-'+dayjs(endTime).format('LT')
        }
        setBooking(booking);

        setAccess(true);
        setScannerActive(false);
        setDialogOpen(true);
      }else {
        setAccess(false);
        setDialogOpen(true);
      }

      setTimeout(
        ()=>{
          setBooking(null);
          setAccess(false)
          setDialogOpen(false)
        },5000
      )


    });
  }, [resource]);

  const [scannerActive, setScannerActive] = useState(false);

  function requestFingerprint() {
    setScannerActive(true);
    socket.emit("fingerprint", 3);
  }




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
              <>
              <FingerprintUi
                resourceName={resource.name}
                scannerActive={scannerActive}
                requestFingerprint={requestFingerprint}
              />
                <FingerPrintResults
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  access={access}
                  booking={booking}
                />

              </>

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
