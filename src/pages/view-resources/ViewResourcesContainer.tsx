import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box, IconButton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import AppbarComponent from "src/components/AppbarComponent";
import DrawerComponent from "src/components/DrawerComponent";
import resourcesServices from "src/services/ResourcesServices";
import {ADMIN, Booking, RESOURCE_MANAGER, Resource, User} from "../../types";
import {useSelector} from "react-redux";
import {AppState} from "../../redux/reducer";
import Grid from "@mui/material/Grid";

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


function FutureBookingsTable({bookings}: { bookings: Booking[] }) {
  return (
    <table style={{width: "100%"}}>
      <thead>
      <tr>
        <th style={{textAlign: "left"}}>Booker</th>
        <th style={{textAlign: "center"}}>User Count</th>
        <th style={{textAlign: "center"}}>Date</th>
        <th style={{textAlign: "center"}}>Time</th>
        <th style={{textAlign: "center"}}>Duration</th>
      </tr>
      </thead>
      <tbody>
      {bookings.map((booking: Booking, index) => {
          const startTime = dayjs(booking.bookingStartTime);
          const endTime = dayjs(booking.bookingEndTime);

          const duration = endTime.diff(startTime) / (1000 * 3600);
          return (<tr key={index}>
            <td style={{textAlign: "left"}}>{booking.booker}</td>
            <td style={{textAlign: "center"}}>{booking.occupants}</td>
            <td style={{textAlign: "center"}}>{dayjs(booking.bookingStartTime).format("YYYY-MM-DD")}</td>
            <td style={{textAlign: "center"}}>{dayjs(booking.bookingStartTime).format('HH:mm')}</td>
            <td style={{textAlign: "center"}}>{duration}h</td>
          </tr>);
        }
      )
      }
      </tbody>
    </table>
  );
}


function ResourceCard({resource}: { resource: Resource }) {
  const [expanded, setExpanded] = useState(false);
  const [editStarted, setEditStarted] = useState(false);
  const [name, setName] = useState<String>('');
  const [nameError, setNameError] = useState(false);
  const [count, setCount] = useState<Number>(0);
  const [countError, setCountError] = useState(false);

  const user:User|null = useSelector((state:AppState)=>state.user.user);
  const token = user.token;
  const role = user.role;

  useEffect(() => {
    setName(resource.name);
    setCount(resource.count);
  }, []);


  const futureBookings = resource.bookings;

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditStart = () => {
    setExpanded(false);
    setName(resource.name);
    setCount(resource.count)
    setEditStarted(true);
  };

  const handleUpdate = async () => {
    if (!nameError && !countError) {
      await resourcesServices.updateResource(parseInt(resource.id), name, count,token);
      setEditStarted(false);
    }
  }

  return (
    <Card sx={{mt: 2}} style={{cursor: "pointer"}}>
      <CardContent>
        {
          !editStarted ? (
            <Typography variant="subtitle1">
              Resource Name: {name}
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle1">
                Resource Name:
              </Typography>
              <TextField size={"small"} error={nameError} helperText={nameError ? 'Invalid name' : ''}
                         aria-errormessage={'text'} value={name} fullWidth={true} onChange={
                (e) => {
                  setName(e.target.value)
                  if (e.target.value.length === 0) {
                    setNameError(true);
                  }
                }
              }/>
            </>
          )
        }

        <Typography variant="body2" color='textSecondary'>Resource ID: {resource.id}</Typography>

        {
          !editStarted ? (
            <Typography variant="body2" color="textSecondary">
              Count: {`${count}`}
            </Typography>
          ) : (
            <>
              <Typography variant="body2" color="textSecondary">
                Count: {resource.count}
              </Typography>
              <TextField size={"small"} inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} error={countError}
                         helperText={countError ? 'Invalid count' : ''} value={count} fullWidth={true}
                         onChange={
                           (e) => {
                             const temp = e.target.value;
                             if (temp !== '') {
                               setCount(parseInt(temp))
                             } else {
                               setCount(0);
                             }
                             if (temp === '' || parseInt(temp) === 0) {
                               setCountError(true)
                             } else {
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
          <FutureBookingsTable bookings={futureBookings}/>
        </Collapse>


        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {
            !editStarted ? (
              <Grid container direction={'row'} spacing={1} justifyContent={'end'}>
                <Grid item>
                  <Button
                    disabled={role !== ADMIN && role !== RESOURCE_MANAGER}
                    variant="contained"
                    sx={{backgroundColor: "primary", color: "white"}}
                  >
                    <RouterLink style={{textDecoration:"none", color:"white"}} to={`/resources/${resource.id}/check-in-out`}>
                      Check-ins
                    </RouterLink>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={role!='ADMIN'}
                    variant="contained"
                    onClick={handleEditStart}
                    sx={{backgroundColor: "green", color: "white"}}
                  >
                    Edit Resource
                  </Button>
                </Grid>
              </Grid>

            ) : (
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{backgroundColor: "blue", color: "white"}}
              >
                Update
              </Button>
            )
          }

          {
            editStarted && (
              <Button onClick={
                () => {
                  setEditStarted(false);
                }
              }>Cancel</Button>
            )
          }
        </Box>


      </CardContent>
    </Card>
  );
}


export default function ViewResourcesContainer() {
  const [open, setOpen] = useState(false);
  const user:User|null = useSelector((state:AppState)=>state.user.user);
  const token = user.token;

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resourceData, setResourceData] = useState<Resource[]>([]);


  useEffect(
    () => {

      const fetch = async () => {
        setLoading(true);
        const response = await resourcesServices.getResources(token);
        if (!response) {
          setError(true);
          setLoading(false);
        } else {
          setError(false);
          setLoading(false);
        }
        const resourcesArray = response.data.map(
          (resource) => {
            const temp = resource.bookings.map(
              (booking) => {
                return {
                  ResourceName: resource.name,
                  booker: booking.userId,
                  reason: booking.reason,
                  bookingDate: booking.bookedDate,
                  bookingStartTime: booking.startTime,
                  bookingEndTime: booking.endTime,
                  occupants: booking.count,
                }
              }
            );
            return {
              id: resource.id,
              name: resource.name,
              count: resource.count,
              bookings: temp
            }
          }
        );

        setResourceData(resourcesArray);
        setLoading(false);
      }
      fetch();

    }, []
  )

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <AppbarComponent open={open} toggleDrawer={toggleDrawer}/>
        <DrawerComponent open={open} toggleDrawer={toggleDrawer}/>

        <Container component="main" maxWidth="sm" sx={{mt: 5, mb: 4}}>
          <Paper
            variant="outlined"
            sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}
          >
            <Typography component="h1" variant="h4" align="center">
              VIEW RESOURCES LIST
            </Typography>
            {
              loading && !error && (
                <Box sx={{mt: 2, textAlign: 'center'}}>
                  <CircularProgress/>
                </Box>
              )
            }
            {
              error && !loading && (
                <Box sx={{mt: 2, textAlign: 'center'}}>
                  <Typography color={'red'} variant={'h6'}>Resource Data Fetching Failed</Typography>
                </Box>
              )
            }
            {!loading && !error && (<Box sx={{mt: 2}}>
              {resourceData.map((resource) => (
                <ResourceCard key={resource.id} resource={resource}/>
              ))}
            </Box>)
            }
          </Paper>
          <Box sx={{mt: 2}}>
            <RouterLink to={"/dashboard"} style={{textDecoration: 'none', color: 'inherit'}}>
              <Button
                variant="contained"
                sx={{width: "100%"}}
              >
                Go Back
              </Button>
            </RouterLink>
          </Box>
          <Box sx={{mt: 4}}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} CSE
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
