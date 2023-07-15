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


export default function ResourceSelectionForm() {
    const [valueOfSelectionBox, setValueOfSelectionBox] = useState('');
    const [acceptResourceBooking, setAcceptResourceBooking] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);

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


    const handleCheckboxChange = (event :any) => {
        setAcceptResourceBooking(event.target.checked);
    };

    const handleAttachmentChange = (event :any) => {
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
                        value={valueOfSelectionBox}
                        onChange={handleAddressChange}
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
                        value={valueOfSelectionBox}
                        onChange={handleAddressChange}
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')}/>

                    </LocalizationProvider>
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
