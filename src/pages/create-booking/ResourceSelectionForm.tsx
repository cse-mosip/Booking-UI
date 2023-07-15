import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {MenuItem} from '@mui/material';
import dayjs from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import bookingService from "src/services/BookingServices";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Resource } from 'src/types';
import { AppState } from 'src/redux/reducer';

type ResourceSelectionFormProps = {
    formik: any;
};
interface Option {
    id: number;
    value: string;
    label: string;
  }

export default function ResourceSelectionForm(props :ResourceSelectionFormProps) {
    const [loader, setLoader] = useState(false);
    const [flagForBookingDate, setFlagForBookingDate] = useState(false);
    const [bookingEndTimeError, setBookingEndTimeError] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const resources: Resource[] | null = useSelector((state: AppState) => state.resources.resources);
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const options: Option[] = [];
    resources.forEach((resource) => {
      const option: Option = {
        id: parseInt(resource.id),
        value: resource.name,
        label: resource.name,
      };
      options.push(option);
    });

    const handleBookingStartTime = (time :any) => {
        props.formik.values.bookingStartTime = time;
    };

    const handleBookingEndTime = (time :any) => {
        const date1 = new Date(time.$d);
        const date2 = new Date(props.formik.values.bookingStartTime.$d);
        if(date1 > date2){
            props.formik.values.bookingEndTime = time;
            setBookingEndTimeError(null);
        }else{
            setBookingEndTimeError('End time should be greater than the start time');
        }
    };

    const checkAvailability = async (date: any) => {
        props.formik.values.bookingDate = date;
        setFlagForBookingDate(true);
        setLoader(true);
        const response = await bookingService.getBookedTimeSlots(props.formik.values);
        setTimeout(() => {
          setLoader(false);
        }, 200);
        if(response){
            setTimeSlots(response)
        }
    }
    

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Booking Details
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="bookingTitle"
                        name="bookingTitle"
                        label="Booking Title"
                        fullWidth
                        autoComplete="booking-title"
                        variant="standard"
                        value={props.formik.values.bookingTitle}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.bookingTitle && Boolean(props.formik.errors.bookingTitle)}
                        helperText={props.formik.touched.bookingTitle && props.formik.errors.bookingTitle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="category"
                        name="category"
                        label="Category"
                        fullWidth
                        autoComplete="Random"
                        variant="standard"
                        select
                        value={props.formik.values.category}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.category && Boolean(props.formik.errors.category)}
                        helperText={props.formik.touched.category && props.formik.errors.category}
                    >
                        {options.map(option => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="ResourceName"
                        name="ResourceName"
                        label="Select the Resource you want to book"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        select
                        value={props.formik.values.ResourceName}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.ResourceName && Boolean(props.formik.errors.ResourceName)}
                        helperText={props.formik.touched.ResourceName && props.formik.errors.ResourceName}
                    >
                        {options.map(option => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="reason"
                        name="reason"
                        label="State the reason for the booking"
                        fullWidth
                        autoComplete="None"
                        variant="standard"
                        value={props.formik.values.reason}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.reason && Boolean(props.formik.errors.reason)}
                        helperText={props.formik.touched.reason && props.formik.errors.reason}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select the booking date" 
                            renderLoading = {
                                () => (
                                    <TextField
                                    id="bookingDate"
                                    name="bookingDate"
                                    error={props.formik.touched.bookingDate && Boolean(props.formik.errors.bookingDate)}
                                    helperText={props.formik.touched.bookingDate && props.formik.errors.bookingDate}
                                  />   
                                )
                            }
                            value={props.formik.values.bookingDate}
                            onChange={(newValue) => checkAvailability(newValue)}
                            defaultValue={dayjs()} 
                            disablePast
                        />
                    </LocalizationProvider>
                </Grid>
                {flagForBookingDate ? 
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Booked slots for your selected date:
                        </Typography>
                        <Stack direction="column" spacing={1}>
                            {
                            loader ?
                            <CircularProgress color="inherit" size={30} /> 
                            : 
                            timeSlots.map((slot)=>(
                                <Chip label={slot} />
                            )) 
                            }
                        </Stack>
                    </Grid>
                    : null
                }
                <Grid item xs={12}>
                    <TextField
                        id="occupants"
                        name="occupants"
                        label="Number of Occupants"
                        value={props.formik.values.occupants}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.occupants && Boolean(props.formik.errors.occupants)}
                        helperText={props.formik.touched.occupants && props.formik.errors.occupants}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker 
                            label="Select the booking start time"
                            maxTime={dayjs(`${formattedDate}T22:30`)}
                            minTime={dayjs(`${formattedDate}T07:30`)}
                            value={props.formik.values.bookingStartTime}
                            onChange={handleBookingStartTime}
                            defaultValue={dayjs(`${formattedDate}T08:00`)} 
                        />
                        {':'}
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {':'}
                        <MobileTimePicker 
                            label="Select the booking end time"
                            maxTime={dayjs(`${formattedDate}T22:30`)}
                            minTime={dayjs(`${formattedDate}T07:30`)}
                            value={props.formik.values.bookingEndTime}
                            onChange={handleBookingEndTime}
                            defaultValue={dayjs(`${formattedDate}T10:00`)} 
                         />
                    </LocalizationProvider>
                    {bookingEndTimeError ? <Alert severity="error">{bookingEndTimeError}</Alert> : null }
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
