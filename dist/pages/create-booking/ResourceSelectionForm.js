var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import bookingService from "src/services/BookingServices";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
export default function ResourceSelectionForm(props) {
    const [loader, setLoader] = useState(false);
    const [flagForBookingDate, setFlagForBookingDate] = useState(false);
    const [bookingEndTimeError, setBookingEndTimeError] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const resources = useSelector((state) => state.resources.resources);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const options = [];
    resources.forEach((resource) => {
        const option = {
            id: parseInt(resource.id),
            value: resource.name,
            label: resource.name,
        };
        options.push(option);
    });
    const handleBookingStartTime = (time) => {
        props.formik.values.bookingStartTime = time;
    };
    const handleBookingEndTime = (time) => {
        const date1 = new Date(time.$d);
        const date2 = new Date(props.formik.values.bookingStartTime.$d);
        if (date1 > date2) {
            props.formik.values.bookingEndTime = time;
            setBookingEndTimeError(null);
        }
        else {
            setBookingEndTimeError('End time should be greater than the start time');
        }
    };
    const checkAvailability = (date) => __awaiter(this, void 0, void 0, function* () {
        props.formik.values.bookingDate = date;
        setFlagForBookingDate(true);
        setLoader(true);
        const response = yield bookingService.getBookedTimeSlots(props.formik.values);
        setTimeout(() => {
            setLoader(false);
        }, 200);
        if (response) {
            setTimeSlots(response);
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Booking Details"),
        React.createElement(Grid, { container: true, spacing: 3 },
            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                React.createElement(TextField, { id: "bookingTitle", name: "bookingTitle", label: "Booking Title", fullWidth: true, autoComplete: "booking-title", variant: "standard", value: props.formik.values.bookingTitle, onChange: props.formik.handleChange, error: props.formik.touched.bookingTitle && Boolean(props.formik.errors.bookingTitle), helperText: props.formik.touched.bookingTitle && props.formik.errors.bookingTitle })),
            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                React.createElement(TextField, { id: "category", name: "category", label: "Category", fullWidth: true, autoComplete: "Random", variant: "standard", select: true, value: props.formik.values.category, onChange: props.formik.handleChange, error: props.formik.touched.category && Boolean(props.formik.errors.category), helperText: props.formik.touched.category && props.formik.errors.category }, options.map(option => (React.createElement(MenuItem, { key: option.id, value: option.value }, option.label))))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { id: "ResourceName", name: "ResourceName", label: "Select the Resource you want to book", fullWidth: true, autoComplete: "shipping address-line1", variant: "standard", select: true, value: props.formik.values.ResourceName, onChange: props.formik.handleChange, error: props.formik.touched.ResourceName && Boolean(props.formik.errors.ResourceName), helperText: props.formik.touched.ResourceName && props.formik.errors.ResourceName }, options.map(option => (React.createElement(MenuItem, { key: option.id, value: option.value }, option.label))))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { id: "reason", name: "reason", label: "State the reason for the booking", fullWidth: true, autoComplete: "None", variant: "standard", value: props.formik.values.reason, onChange: props.formik.handleChange, error: props.formik.touched.reason && Boolean(props.formik.errors.reason), helperText: props.formik.touched.reason && props.formik.errors.reason })),
            React.createElement(Grid, { item: true, xs: 12, sm: 12 },
                React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
                    React.createElement(DatePicker, { label: "Select the booking date", renderLoading: () => (React.createElement(TextField, { id: "bookingDate", name: "bookingDate", error: props.formik.touched.bookingDate && Boolean(props.formik.errors.bookingDate), helperText: props.formik.touched.bookingDate && props.formik.errors.bookingDate })), value: props.formik.values.bookingDate, onChange: (newValue) => checkAvailability(newValue), defaultValue: dayjs(), disablePast: true }))),
            flagForBookingDate ?
                React.createElement(Grid, { item: true, xs: 12, sm: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Booked slots for your selected date:"),
                    React.createElement(Stack, { direction: "column", spacing: 1 }, loader ?
                        React.createElement(CircularProgress, { color: "inherit", size: 30 })
                        :
                            timeSlots.map((slot) => (React.createElement(Chip, { label: slot })))))
                : null,
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { id: "occupants", name: "occupants", label: "Number of Occupants", value: props.formik.values.occupants, onChange: props.formik.handleChange, error: props.formik.touched.occupants && Boolean(props.formik.errors.occupants), helperText: props.formik.touched.occupants && props.formik.errors.occupants, variant: "standard" })),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
                    React.createElement(MobileTimePicker, { label: "Select the booking start time", maxTime: dayjs(`${formattedDate}T22:30`), minTime: dayjs(`${formattedDate}T07:30`), value: props.formik.values.bookingStartTime, onChange: handleBookingStartTime, defaultValue: dayjs(`${formattedDate}T08:00`) }),
                    ':')),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
                    ':',
                    React.createElement(MobileTimePicker, { label: "Select the booking end time", maxTime: dayjs(`${formattedDate}T22:30`), minTime: dayjs(`${formattedDate}T07:30`), value: props.formik.values.bookingEndTime, onChange: handleBookingEndTime, defaultValue: dayjs(`${formattedDate}T10:00`) })),
                bookingEndTimeError ? React.createElement(Alert, { severity: "error" }, bookingEndTimeError) : null))));
}
//# sourceMappingURL=ResourceSelectionForm.js.map