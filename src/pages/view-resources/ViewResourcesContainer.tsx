import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, TextField, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import Copyright from "src/components/Copyright";

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
import resourcesServices from "src/services/ResourcesServices";
import {Resource} from "../../types";
import {number} from "yup";

function FutureBookingsTable({ bookings }: any) {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Booker</th>
          <th style={{ textAlign: "center" }}>User Count</th>
          <th style={{ textAlign: "center" }}>Date</th>
          <th style={{ textAlign: "center" }}>Time</th>
          <th style={{ textAlign: "center" }}>Duration</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking: any) => (
          <tr key={booking.id}>
            <td style={{ textAlign: "left" }}>{booking.booker}</td>
            <td style={{ textAlign: "center" }}>{booking.users}</td>
            <td style={{ textAlign: "center" }}>{booking.date}</td>
            <td style={{ textAlign: "center" }}>{booking.time}</td>
            <td style={{ textAlign: "center" }}>{booking.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function ResourceCard({ resource } : { resource:Resource }) {
  const [expanded, setExpanded] = useState(false);
  const [editStarted, setEditStarted] = useState(false);
  const [name, setName] = useState<String>('');
  const [nameError, setNameError] = useState(false);
  const [count, setCount] = useState<Number>(0);
  const [countError, setCountError] = useState(false);
  const navigate = useNavigate();

  const futureBookings= [
    { id: 3, booker: "Emily Wilson", date: "2023-07-19", users: 4, time: "9:30 AM",  duration: "2hrs" },
    { id: 4, booker: "John Smith", date: "2023-07-20", users: 6, time: "11:00 AM",  duration: "2hrs" },
  ];

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditStart = (e) => {
    // Handle edit resource action
    setExpanded(false);
    setName(resource.name);
    setCount(resource.count)
    setEditStarted(true);
  };

  const handleUpdate = (e) =>{
    if(!nameError && !countError){
      //send update request
    }
  }

  return (
    <Card sx={{ mt: 2 }}  style={{ cursor: "pointer" }}>
      <CardContent>
        {
          !editStarted?(
            <Typography variant="subtitle1" >
              Resource Name: {resource.name}
            </Typography>
          ):(
            <>
            <Typography variant="subtitle1" >
              Resource Name:
            </Typography>
            <TextField size={"small"} error={nameError} helperText={nameError?'Invalid name':''} aria-errormessage={'text'} value={name} fullWidth={true} onChange={
              (e)=>{
                setName(e.target.value)
                if(e.target.value.length===0){
                  setNameError(true);
                }
              }
            }  />
            </>
          )
        }

        <Typography variant="body2" color='textSecondary'>Resource ID: {resource.id}</Typography>

        {
          !editStarted?(
            <Typography variant="body2" color="textSecondary">
              Count: {resource.count}
            </Typography>
          ):(
            <>
            <Typography variant="body2" color="textSecondary">
              Count: {resource.count}
            </Typography>
              <TextField size={"small"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  error={countError} helperText={countError?'Invalid count':''} value={count} fullWidth={true}
                onChange={
                  (e)=>{
                    const temp = e.target.value;
                    if(temp!==''){
                      setCount(parseInt(temp))
                    }else{
                      setCount(0);
                    }
                    if(temp===''||parseInt(temp)===0){
                      setCountError(true)
                    }else{
                      setCountError(false);
                    }
                  }
                }
              />
            </>
          )
        }


        <CardActions disableSpacing>
        <IconButton onClick={handleExpand} aria-expanded={expanded}>
          <ExpandMoreIcon
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </IconButton>
      </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FutureBookingsTable bookings={futureBookings} />
        </Collapse>


        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {
            !editStarted?(
              <Button
                variant="contained"
                onClick={handleEditStart}
                sx={{ backgroundColor: "green", color: "white" }}
              >
                Edit Resource
              </Button>
            ):(
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{ backgroundColor: "blue", color: "white" }}
              >
                Update
              </Button>
            )
          }

          {
            editStarted&&(
              <Button onClick={
                (e)=>{
                  setEditStarted(false);
                }
              } >Cancel</Button>
            )
          }
        </Box>


      </CardContent>
    </Card>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ViewResourcesContainer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resourceData, setResourceData] = useState<Resource[]>([]);

  useEffect(
    ()=>{

      const fetch = async ()=>{
        setLoading(true);
        const response = await resourcesServices.getResources();
        setResourceData(response.data);
        setLoading(false);
      }
      fetch();

    },[]
  )
  const handleHomeClick = () => {
    navigate("/dashboard");
  };


  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            VIEW RESOURCES LIST
          </Typography>
          <Box sx={{ mt: 2 }}>
            {resourceData.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </Box>
        </Paper>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleHomeClick}
            sx={{ width: "100%" }}
          >
            Go Back
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} MOSIP
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
