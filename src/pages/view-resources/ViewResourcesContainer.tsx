import { useState } from "react";
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
import { IconButton, Toolbar } from "@mui/material";
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

function ResourceCard({ resource }: any) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditResource = () => {
    // Handle edit resource action
    console.log(`Edit resource with id: ${resource.resource_id}`);
  };

  return (
    <Card sx={{ mt: 2 }} onClick={handleExpand} style={{ cursor: "pointer" }}>
      <CardContent>
        <Typography variant="subtitle1">
          Resource ID: {resource.resource_id}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Resource Name: {resource.resource_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Faculty: {resource.faculty}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Department: {resource.department}
        </Typography>
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
          <FutureBookingsTable bookings={resource.futureBookings} />
        </Collapse>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleEditResource}
            sx={{ backgroundColor: "green", color: "white" }}
          >
            Edit Resource
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

const resourcesData = [
  {
    resource_id: 1,
    resource_name: "Conference Room C",
    faculty: "Faculty A",
    department: "Department X",
    futureBookings: [
      {
        id: 1,
        booker: "Sarah Johnson",
        date: "2023-07-17",
        users: 8,
        time: "10:00 AM",
        duration: "2hrs",
      },
      {
        id: 2,
        booker: "Michael Brown",
        date: "2023-07-18",
        users: 10,
        time: "2:00 PM",
        duration: "2hrs",
      },
    ],
  },
  {
    resource_id: 2,
    resource_name: "Studio D",
    faculty: "Faculty B",
    department: "Department Y",
    futureBookings: [
      {
        id: 3,
        booker: "Emily Wilson",
        date: "2023-07-19",
        users: 4,
        time: "9:30 AM",
        duration: "2hrs",
      },
      {
        id: 4,
        booker: "John Smith",
        date: "2023-07-20",
        users: 6,
        time: "11:00 AM",
        duration: "2hrs",
      },
    ],
  },
  {
    resource_id: 3,
    resource_name: "Lab E",
    faculty: "Faculty C",
    department: "Department Z",
    futureBookings: [
      {
        id: 5,
        booker: "Jane Doe",
        date: "2023-07-21",
        users: 5,
        time: "3:00 PM",
        duration: "2hrs",
      },
      {
        id: 6,
        booker: "Alex Johnson",
        date: "2023-07-22",
        users: 3,
        time: "1:30 PM",
        duration: "2hrs",
      },
    ],
  },
];

export default function ViewResourcesContainer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

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
          <Toolbar />
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              VIEW RESOURCES LIST
            </Typography>
            <Box sx={{ mt: 2 }}>
              {resourcesData.map((resource) => (
                <ResourceCard key={resource.resource_id} resource={resource} />
              ))}
            </Box>
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
