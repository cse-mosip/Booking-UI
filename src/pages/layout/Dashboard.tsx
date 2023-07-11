import React from 'react';
import {Button, Grid, Container} from '@mui/material';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeResources, enqueueResources } from 'src/redux/resource/actions';



const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddBooking = () => {
        navigate('/book');
    };
    const handleViewBookings = () => {
        navigate('/bookings');
    };
    const handleAddNewResource = () => {
        navigate('/addresource');
    };

    const handleViewResource = () => {
        navigate('/viewresources');
    }

    const resources = [
        {
            id: '1',
            name: 'Lab2',
            category: 'cse',
            description: 'resource for exams'
        },
        {
            id: '2',
            name: 'Lab1',
            category: 'cse',
            description: 'resource for exams'
        }
    ]

    dispatch(enqueueResources(resources));

    return (
        <Container style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddBooking}
                        style={{width: '100%'}}
                        title="Click to add a new booking"
                    >
                        Add a New Booking
                    </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewBookings}
                        style={{width: '100%'}}
                        title="Click to view the list of bookings"
                    >
                        View the List of Bookings
                    </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewResource}
                        style={{width: '100%'}}
                        title="Click to add a new resource"
                    >
                        Add a New Resource
                    </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewResource}
                        style={{width: '100%'}}
                        title="Click to view and edit existing resources list"
                    >
                        View and Edit Existing Resources List
                    </Button>
                </Grid>
            </Grid>
        </Container>

    )
        ;
};

export default Dashboard;
