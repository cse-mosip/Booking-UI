import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {MenuItem} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type ResourceSelectionFormProps = {
    formik: any;
};

export default function ResourceSelectionForm(props :ResourceSelectionFormProps) {
    const [valueOfSelectionBox, setValueOfSelectionBox] = useState('');
    const [acceptResourceBooking, setAcceptResourceBooking] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    console.log('props',props.formik)


    // const [options, setOptions] = useState([]);
    const options = [
        {id: 1, value: 'option1', label: 'Option 1'},
        {id: 2, value: 'option2', label: 'Option 2'},
        {id: 3, value: 'option3', label: 'Option 3'},
        {id: 4, value: 'option4', label: 'Option 4'},
    ];

    // useEffect(() => {
    //     fetch('API_ENDPOINT')
    //         .then(response => response.json())
    //         .then(data => setOptions(data))
    //         .catch(error => console.log(error));
    // }, []);

    const handleAddressChange = (event :any) => {
        setValueOfSelectionBox(event.target.value);
    };

    const handleAttachmentUpload = () => {
        // Implement attachment upload logic here
        if (attachment) {
            // Save attachment to internal storage
            console.log(`Attachment: ${attachment.name}`);
        }
    };

    const handleBookingDateChange = (date :any) => {
        setBookingDate(date);
    };


    const handleCheckboxChange = (event) => {
        setAcceptResourceBooking(event.target.checked);
    };

    const handleAttachmentChange = (event) => {
        const file = event.target.files[0];
        setAttachment(file);
    };


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Booking Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="bookingItemName"
                        name="bookingItemName"
                        label="Booking Item Name"
                        fullWidth
                        autoComplete="booking-name"
                        variant="standard"
                        value={props.formik.values.bookingItemName}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.bookingItemName && Boolean(props.formik.errors.bookingItemName)}
                        helperText={props.formik.touched.bookingItemName && props.formik.errors.bookingItemName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
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
                        required
                        id="selectResource"
                        name="selectResource"
                        label="Select the Resource you want to book"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        select
                        value={props.formik.values.selectResource}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.selectResource && Boolean(props.formik.errors.selectResource)}
                        helperText={props.formik.touched.selectResource && props.formik.errors.selectResource}
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
                        id="statement"
                        name="statement"
                        label="State the reason for the booking"
                        fullWidth
                        autoComplete="None"
                        variant="standard"
                        value={props.formik.values.statement}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.statement && Boolean(props.formik.errors.statement)}
                        helperText={props.formik.touched.statement && props.formik.errors.statement}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Select the booking date" 
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h8" gutterBottom>
                        Booked slots for you selected date:
                    </Typography>
                    <Stack direction="column" spacing={1}>
                        <Chip label="1.00p.m. - 2.00p.m." />
                        <Chip label="2.30p.m. - 3.00p.m." />
                        <Chip label="4.00p.m. - 6.00p.m." />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker 
                            label="Pick a time"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        type="number"
                        id="duration"
                        name="duration"
                        label="time duration"
                        fullWidth
                        autoComplete="None"
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">h</InputAdornment>
                        }}
                        value={props.formik.values.duration}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched.duration && Boolean(props.formik.errors.duration)}
                        helperText={props.formik.touched.duration && props.formik.errors.duration}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                name="acceptResourceBooking"
                                value="yes"
                                checked={acceptResourceBooking}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="I have an attachment to upload"
                    />
                    {acceptResourceBooking && (
                        <>
                            <input
                                accept="*"
                                id="attachment"
                                name="attachment"
                                type="file"
                                style={{display: 'none'}}
                                onChange={handleAttachmentChange}
                            />
                            <label htmlFor="attachment" style={{display: 'flex', flexDirection: 'column'}}>
                                <Button
                                    variant="contained"
                                    component="span"
                                    color="warning"
                                    sx={{mt: 2}}
                                >
                                    Upload Attachment
                                </Button>
                                {attachment && <p>{attachment.name}</p>}
                            </label>
                        </>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
