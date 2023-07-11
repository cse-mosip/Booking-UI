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
import UserInformationForm from "./UserInformationForm";
import Review from "./Review";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Resource } from 'src/types';
import { AppState } from 'src/redux/reducer';
import * as yup from 'yup';
import { useFormik } from 'formik';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mosip.io/">
        MOSIP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Select Resource", "User details", "Review your booking"];

const form1ValidationSchema = yup.object({
  bookingItemName: yup
    .string()
    .required('bookingItemName is required'),
  category: yup
    .string()
    .required('category is required'),
  selectResource: yup
    .string()
    .required('selectResource is required'),
  statement: yup
    .string()
    .required('statement is required'),
  duration: yup
    .string()
    .required('duration is required'),
});

const form2ValidationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  name: yup
    .string()
    .required('Name is required'),
  subject: yup
    .string()
    .required('Subject is required'),
});


function getStepContent(step :any, formikForm1 :any, formikForm2 :any) {
  switch (step) {
    case 0:
      return <ResourceSelectionForm formik={formikForm1}/>;
    case 1:
      return <UserInformationForm/>;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function BookingContainer() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const resources: Resource[] | null = useSelector((state: AppState) => state.resources.resources);
  console.log('resources: ',resources);

  const formikForm1 = useFormik({
    initialValues: {
        bookingItemName: '',
        category: '',
        selectResource: '',
        statement: '',
        duration: '',
    },
    validateOnChange: true,
    validationSchema: form1ValidationSchema,
    onSubmit: (values) => {
      console.log('values: ',values)
    },
  });
  
  const formikForm2 = useFormik({
    initialValues: {
        email: '',
        name: '',
        subject: '',
        message: '',
    },
    validateOnChange: true,
    validationSchema: form2ValidationSchema,
    onSubmit: (values) => {
      console.log('values: ',values)
    },
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep === 0){
      formikForm1.handleSubmit
    }else if(activeStep === 1){
      formikForm2.handleSubmit
    }else if(activeStep === 2){
      formikForm2.handleSubmit
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTermsCheckboxChange = (event :any) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="h6" color="inherit" onClick={handleHomeClick}>
            Booking System
          </Button>
          <a href="#">
            <IconButton edge="end" color="inherit" aria-label="User Profile">
              <Avatar alt="User Image" src="/assets/images/21104.png" />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            ADD A BOOKING

          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your booking.
              </Typography>
              <Typography variant="subtitle1">
                Your booking number is #2001539. We have recorded your booking
                confirmation, and will send you an update when your booking is
                ready.
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  color="primary"
                >
                  Back Home
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep,formikForm1,formikForm2)}

              {activeStep === steps.length - 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={termsAccepted}
                          onChange={handleTermsCheckboxChange}
                        />
                      }
                      label="I have read and accepted the terms and conditions"
                    />
                  </Grid>
                </Grid>
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!termsAccepted}
                  >
                    Place booking
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
