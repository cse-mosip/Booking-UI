import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { bookingTerms } from "src/pages/create-booking/terms";
import { Booking } from 'src/types';

type ReviewProps = {
  BookingForm: Booking;
};

export default function Review(props :ReviewProps) {
  const date1 = new Date(props.BookingForm.bookingDate.$d);
  const date2 = new Date(props.BookingForm.bookingStartTime.$d);
  const date3 = new Date(props.BookingForm.bookingEndTime.$d);
  const year = date1.getFullYear();
  const month = String(date1.getMonth() + 1).padStart(2, '0');
  const day = String(date1.getDate()).padStart(2, '0');
  const bookingDate = `${year}-${month}-${day}`;
  const bookingStartTime = date2.toLocaleTimeString('en-US');
  const bookingEndTime = date3.toLocaleTimeString('en-US');

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking summary
      </Typography>
      <Typography gutterBottom>Resource Selected: {props.BookingForm.ResourceName}</Typography>
      <Typography gutterBottom>Date: {bookingDate}</Typography>
      <Typography gutterBottom>Booking start time: {bookingStartTime}</Typography>
      <Typography gutterBottom>Booking end time: {bookingEndTime}</Typography>
      <Typography gutterBottom>Reason: {props.BookingForm.reason}</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Terms and Conditions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={bookingTerms}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
