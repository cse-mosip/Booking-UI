var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResourceSelectionForm from "./ResourceSelectionForm";
import Review from "./Review";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import dayjs from "dayjs";
import bookingService from "src/services/BookingServices";
import CircularProgress from '@mui/material/CircularProgress';
function Copyright() {
    return (React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
        "Copyright © ",
        React.createElement(Link, { color: "inherit", href: "https://mosip.io/" }, "MOSIP"),
        " ",
        new Date().getFullYear(),
        "."));
}
const steps = ["Select Resource", "Review your booking"];
const form1ValidationSchema = yup.object({
    bookingTitle: yup
        .string()
        .required('Booking item name is required'),
    category: yup
        .string()
        .required('Resource category is required'),
    ResourceName: yup
        .string()
        .required('Resource is required'),
    reason: yup
        .string()
        .notRequired(),
    occupants: yup
        .number()
        .required('Occupants count is required')
        .positive()
        .max(300)
});
function getStepContent(step, formikForm1, formValues) {
    switch (step) {
        case 0:
            return React.createElement(ResourceSelectionForm, { formik: formikForm1 });
        case 1:
            return React.createElement(Review, { BookingForm: formValues });
        default:
            throw new Error("Unknown step");
    }
}
const defaultTheme = createTheme();
export default function BookingContainer() {
    const [activeStep, setActiveStep] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [loader, setLoader] = useState(false);
    const resources = useSelector((state) => state.resources.resources);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const formikForm1 = useFormik({
        initialValues: {
            bookingTitle: '',
            category: '',
            ResourceName: '',
            reason: '',
            occupants: '',
            attachment: '',
            bookingDate: dayjs(dayjs()),
            bookingStartTime: dayjs(dayjs(`${formattedDate}T08:00`)),
            bookingEndTime: dayjs(dayjs(`${formattedDate}T10:00`)),
        },
        validateOnChange: true,
        validationSchema: form1ValidationSchema,
        onSubmit: (values) => {
            setFormValues(Object.assign(Object.assign({}, formValues), values));
            setActiveStep(1);
        },
    });
    const handleNext = () => __awaiter(this, void 0, void 0, function* () {
        if (activeStep === 0 && formikForm1.dirty && !(Object.keys(formikForm1.errors).length > 0)) {
            formikForm1.handleSubmit();
        }
        else if (activeStep === 1) {
            setLoader(true);
            const response = yield bookingService.bookingResource(formValues);
            setTimeout(() => {
                setLoader(false);
            }, 200);
            if (response) {
                setActiveStep(activeStep + 1);
            }
        }
    });
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    };
    const handleTermsCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "absolute", color: "default", elevation: 0, sx: {
                position: "relative",
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
            } },
            React.createElement(Toolbar, { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement(Button, { color: "inherit", onClick: handleHomeClick }, "Booking System"),
                React.createElement("a", { href: "#" },
                    React.createElement(IconButton, { edge: "end", color: "inherit", "aria-label": "User Profile" },
                        React.createElement(Avatar, { alt: "User Image", src: "/assets/images/21104.png" }))))),
        React.createElement(Container, { component: "main", maxWidth: "sm", sx: { mb: 4 } },
            React.createElement(Paper, { variant: "outlined", sx: { my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } } },
                React.createElement(Typography, { component: "h1", variant: "h4", align: "center" }, "ADD A BOOKING"),
                React.createElement(Stepper, { activeStep: activeStep, sx: { pt: 3, pb: 5 } }, steps.map((label) => (React.createElement(Step, { key: label },
                    React.createElement(StepLabel, null, label))))),
                activeStep === steps.length ? (React.createElement(React.Fragment, null,
                    React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Thank you for your booking."),
                    React.createElement(Typography, { variant: "subtitle1" }, "Your booking number is #2001539. We have recorded your booking confirmation, and will send you an update when your booking is ready."),
                    React.createElement(Box, { sx: { display: "flex", justifyContent: "center", marginTop: 2 } },
                        React.createElement(Button, { component: RouterLink, to: "/", variant: "contained", color: "primary" }, "Back Home")))) : (React.createElement(React.Fragment, null,
                    React.createElement("form", { onSubmit: (activeStep === 0) ? formikForm1.handleSubmit : null },
                        getStepContent(activeStep, formikForm1, formValues),
                        activeStep === steps.length - 1 && (React.createElement(Grid, { container: true, spacing: 2 },
                            React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: termsAccepted, onChange: handleTermsCheckboxChange }), label: "I have read and accepted the terms and conditions" })))),
                        React.createElement(Box, { sx: { display: "flex", justifyContent: "flex-end" } },
                            activeStep !== 0 && (React.createElement(Button, { onClick: handleBack, sx: { mt: 3, ml: 1 } }, "Back")),
                            activeStep === steps.length - 1 ? (React.createElement(Button, { variant: "contained", onClick: handleNext, sx: { mt: 3, ml: 1 }, disabled: !termsAccepted },
                                "Place booking \u00A0\u00A0 ",
                                loader ? React.createElement(CircularProgress, { color: "inherit", size: 30 }) : null)) : (React.createElement(Button, { type: "submit", variant: "contained", onClick: handleNext, sx: { mt: 3, ml: 1 } }, "Next"))))))),
            React.createElement(Copyright, null))));
}
//# sourceMappingURL=BookingContainer.js.map