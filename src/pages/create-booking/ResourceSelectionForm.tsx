import { MenuItem } from '@mui/material';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate, getTimeSlots } from 'src/helpers/utils';
import { AppState } from 'src/redux/reducer';
import bookingService from 'src/services/BookingServices';
import { Resource } from 'src/types';

type ResourceSelectionFormProps = {
  formik: any;
};
interface Option {
  id: number;
  value: string;
  label: string;
}

// const bookedSlots = [
//     {
//       "id": 12,
//       "resourceId": 14,
//       "username": 168,
//       "reason": "HCI Lecture",
//       "count": 40,
//       "startDateTime": "2023-07-11T09:00:00",
//       "endDateTime": "2023-07-11T10:30:00",
//       "status": "APPROVED"
//     },
//     {
//       "id": 12,
//       "resourceId": 14,
//       "username": 168,
//       "reason": "HCI Lecture",
//       "count": 40,
//       "startDateTime": "2023-07-11T12:00:00",
//       "endDateTime": "2023-07-11T13:40:00",
//       "status": "APPROVED"
//     },
//     {
//       "id": 12,
//       "resourceId": 14,
//       "username": 168,
//       "reason": "HCI Lecture",
//       "count": 40,
//       "startDateTime": "2023-07-11T18:27:00",
//       "endDateTime": "2023-07-11T19:56:34",
//       "status": "APPROVED"
//     }
//   ];

export default function ResourceSelectionForm(
  props: ResourceSelectionFormProps
) {
  const [loader, setLoader] = useState(false);
  const [flagForBookingDate, setFlagForBookingDate] = useState(false);
  const [errorInBookedSlots, setErrorInBookedSlots] = useState(null);
  const [bookingEndTimeError, setBookingEndTimeError] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const resources: Resource[] | null = useSelector(
    (state: AppState) => state.resources.resources
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const options: Option[] = [];
  if (resources) {
    resources.forEach((resource) => {
      const option: Option = {
        id: parseInt(resource.id),
        value: resource.name,
        label: resource.name,
      };
      options.push(option);
    });
  }

  const handleBookingStartTime = (time: any) => {
    props.formik.values.bookingStartTime = time;
  };

  const handleBookingEndTime = (time: any) => {
    const date1 = new Date(time.$d);
    const date2 = new Date(props.formik.values.bookingStartTime.$d);
    if (date1 > date2) {
      props.formik.values.bookingEndTime = time;
      setBookingEndTimeError(null);
    } else {
      setBookingEndTimeError('End time should be greater than the start time');
    }
  };

  const checkAvailability = async (date: any) => {
    setFlagForBookingDate(true);
    setLoader(true);
    if (props.formik.values.ResourceName && date) {
      props.formik.values.bookingDate = date;
      const resourceId = resources.find(
        (item) => item.name === props.formik.values.ResourceName
      ).id;
      const dateString = formatDate(date);
      setErrorInBookedSlots(null);
      const response = await bookingService.getBookedTimeSlots(
        resourceId,
        dateString
      );
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      if (response.status === 'OK') {
        setErrorInBookedSlots(null);
        setTimeSlots(getTimeSlots(response.data));
      } else {
        setErrorInBookedSlots('Could not get time slots!');
      }
    } else {
      setErrorInBookedSlots(
        'You have to select a resource before booking a date'
      );
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking Details
      </Typography>

      <Grid container spacing={3}>
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
            error={
              props.formik.touched.ResourceName &&
              Boolean(props.formik.errors.ResourceName)
            }
            helperText={
              props.formik.touched.ResourceName &&
              props.formik.errors.ResourceName
            }
          >
            {options.map((option) => (
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
            error={
              props.formik.touched.reason && Boolean(props.formik.errors.reason)
            }
            helperText={
              props.formik.touched.reason && props.formik.errors.reason
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select the booking date"
              renderLoading={() => (
                <TextField
                  id="bookingDate"
                  name="bookingDate"
                  error={
                    props.formik.touched.bookingDate &&
                    Boolean(props.formik.errors.bookingDate)
                  }
                  helperText={
                    props.formik.touched.bookingDate &&
                    props.formik.errors.bookingDate
                  }
                />
              )}
              value={props.formik.values.bookingDate}
              onChange={(newValue) => checkAvailability(newValue)}
              defaultValue={dayjs()}
              disablePast
            />
          </LocalizationProvider>
        </Grid>
        {flagForBookingDate ? (
          <Grid item xs={12} sm={12}>
            {timeSlots.length > 0 || errorInBookedSlots ? (
              <Typography variant="h6" gutterBottom>
                Booked slots for your selected date:
              </Typography>
            ) : null}

            <Stack direction="column" spacing={1}>
              {loader ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                timeSlots.map((slot, index) => (
                  <Chip key={index} label={slot} />
                ))
              )}

              {errorInBookedSlots ? (
                <Alert severity="error">{errorInBookedSlots}</Alert>
              ) : null}
            </Stack>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TextField
            id="occupants"
            name="occupants"
            label="Number of Occupants"
            value={props.formik.values.occupants}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.occupants &&
              Boolean(props.formik.errors.occupants)
            }
            helperText={
              props.formik.touched.occupants && props.formik.errors.occupants
            }
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
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              label="Select the booking end time"
              maxTime={dayjs(`${formattedDate}T22:30`)}
              minTime={dayjs(`${formattedDate}T07:30`)}
              value={props.formik.values.bookingEndTime}
              onChange={handleBookingEndTime}
              defaultValue={dayjs(`${formattedDate}T10:00`)}
            />
          </LocalizationProvider>
          {bookingEndTimeError ? (
            <Alert severity="error">{bookingEndTimeError}</Alert>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
