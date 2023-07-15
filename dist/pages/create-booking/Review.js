import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { bookingTerms } from "src/pages/create-booking/terms";
export default function Review(props) {
    const date1 = new Date(props.BookingForm.bookingDate.$d);
    const date2 = new Date(props.BookingForm.bookingStartTime.$d);
    const date3 = new Date(props.BookingForm.bookingEndTime.$d);
    const year = date1.getFullYear();
    const month = String(date1.getMonth() + 1).padStart(2, '0');
    const day = String(date1.getDate()).padStart(2, '0');
    const bookingDate = `${year}-${month}-${day}`;
    const bookingStartTime = date2.toLocaleTimeString('en-US');
    const bookingEndTime = date3.toLocaleTimeString('en-US');
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Booking summary"),
        React.createElement(Typography, { gutterBottom: true },
            "Booking Title: ",
            props.BookingForm.bookingTitle),
        React.createElement(Typography, { gutterBottom: true },
            "Resource Selected: ",
            props.BookingForm.ResourceName),
        React.createElement(Typography, { gutterBottom: true },
            "Date: ",
            bookingDate),
        React.createElement(Typography, { gutterBottom: true },
            "Booking start time: ",
            bookingStartTime),
        React.createElement(Typography, { gutterBottom: true },
            "Booking end time: ",
            bookingEndTime),
        React.createElement(Typography, { gutterBottom: true },
            "Reason: ",
            props.BookingForm.reason),
        React.createElement(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 } }, "User Info"),
        React.createElement(Typography, { gutterBottom: true }, "Name: Nethum Lamahewage"),
        React.createElement(Typography, { gutterBottom: true }, "Index: 190123A"),
        React.createElement(Typography, { gutterBottom: true }, "Department of Computer Science and Engineering, Faculty of Engineering"),
        React.createElement(Typography, { gutterBottom: true }, "Mobile Number: 0712203412"),
        React.createElement(Typography, { gutterBottom: true }, "Address: 324/B, Amal road, Baracuda, Gallface"),
        React.createElement(Typography, { variant: "h6", gutterBottom: true, sx: { mt: 2 } }, "Terms and Conditions"),
        React.createElement(Grid, { container: true, spacing: 2 },
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { fullWidth: true, multiline: true, rows: 6, variant: "outlined", InputProps: {
                        readOnly: true,
                    }, value: bookingTerms })))));
}
//# sourceMappingURL=Review.js.map