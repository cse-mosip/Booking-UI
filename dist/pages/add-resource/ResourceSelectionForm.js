import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
export default function ResourceSelectionForm() {
    const [valueOfSelectionBox, setValueOfSelectionBox] = useState('');
    const [acceptResourceBooking, setAcceptResourceBooking] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    // const [options, setOptions] = useState([]);
    const options = [
        { id: 1, value: 'option1', label: 'Option 1' },
        { id: 2, value: 'option2', label: 'Option 2' },
        { id: 3, value: 'option3', label: 'Option 3' },
        { id: 4, value: 'option4', label: 'Option 4' },
    ];
    // useEffect(() => {
    //     fetch('API_ENDPOINT')
    //         .then(response => response.json())
    //         .then(data => setOptions(data))
    //         .catch(error => console.log(error));
    // }, []);
    const handleAddressChange = (event) => {
        setValueOfSelectionBox(event.target.value);
    };
    const handleAttachmentUpload = () => {
        // Implement attachment upload logic here
        if (attachment) {
            // Save attachment to internal storage
            console.log(`Attachment: ${attachment.name}`);
        }
    };
    const handleBookingDateChange = (date) => {
        setBookingDate(date);
    };
    const handleCheckboxChange = (event) => {
        setAcceptResourceBooking(event.target.checked);
    };
    const handleAttachmentChange = (event) => {
        const file = event.target.files[0];
        setAttachment(file);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Booking Details"),
        React.createElement(Grid, { container: true, spacing: 3 },
            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                React.createElement(TextField, { required: true, id: "bookingItemName", name: "bookingItemName", label: "Booking Item Name", fullWidth: true, autoComplete: "booking-name", variant: "standard" })),
            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                React.createElement(TextField, { required: true, id: "category", name: "category", label: "Category", fullWidth: true, autoComplete: "Random", variant: "standard", select: true, value: valueOfSelectionBox, onChange: handleAddressChange }, options.map(option => (React.createElement(MenuItem, { key: option.id, value: option.value }, option.label))))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { required: true, id: "selectResource", name: "selectResource", label: "Select the Resource you want to book", fullWidth: true, autoComplete: "shipping address-line1", variant: "standard", select: true, value: valueOfSelectionBox, onChange: handleAddressChange }, options.map(option => (React.createElement(MenuItem, { key: option.id, value: option.value }, option.label))))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { id: "statement", name: "statement", label: "State the reason for the booking", fullWidth: true, autoComplete: "None", variant: "standard" })),
            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                React.createElement(LocalizationProvider, { dateAdapter: AdapterDayjs },
                    React.createElement(DateTimePicker, { defaultValue: dayjs('2022-04-17T15:30') }))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { color: "secondary", name: "acceptResourceBooking", value: "yes", checked: acceptResourceBooking, onChange: handleCheckboxChange }), label: "I have an attachment to upload" }),
                acceptResourceBooking && (React.createElement(React.Fragment, null,
                    React.createElement("input", { accept: "*", id: "attachment", name: "attachment", type: "file", style: { display: 'none' }, onChange: handleAttachmentChange }),
                    React.createElement("label", { htmlFor: "attachment", style: { display: 'flex', flexDirection: 'column' } },
                        React.createElement(Button, { variant: "contained", component: "span", color: "warning", sx: { mt: 2 } }, "Upload Attachment"),
                        attachment && React.createElement("p", null, attachment.name))))))));
}
//# sourceMappingURL=ResourceSelectionForm.js.map