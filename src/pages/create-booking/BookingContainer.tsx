import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AppbarComponent from "src/components/AppbarComponent";
import Copyright from "src/components/Copyright";
import DrawerComponent from "src/components/DrawerComponent";
import { formatDate } from "src/helpers/utils";
import { AppState } from "src/redux/reducer";
import bookingService from "src/services/BookingServices";
import { Resource, User } from "src/types";
import * as yup from "yup";
import ResourceSelectionForm from "./ResourceSelectionForm";
import Review from "./Review";

const steps = ["Select Resource", "Review your booking"];

const form1ValidationSchema = yup.object({
  ResourceName: yup.string().required("Resource is required"),
  reason: yup.string().notRequired(),
  occupants: yup
    .number()
    .required("Occupants count is required")
    .positive()
    .max(300),
});

function getStepContent(step: any, formikForm1: any, formValues: any) {
  switch (step) {
    case 0:
      return <ResourceSelectionForm formik={formikForm1} />;
    case 1:
      return <Review BookingForm={formValues} />;
    default:
      throw new Error("Unknown step");
  }
}

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function BookingContainer() {
  const [activeStep, setActiveStep] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formValues, setFormValues] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const resources: Resource[] | null = useSelector(
    (state: AppState) => state.resources.resources
  );
  const user: User | null = useSelector((state: AppState) => state.user.user);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const formikForm1 = useFormik({
    initialValues: {
      ResourceName: "",
      resourceId: "",
      reason: "",
      occupants: "",
      bookingDate: dayjs(dayjs()),
      bookingStartTime: dayjs(dayjs(`${formattedDate}T08:00`)),
      bookingEndTime: dayjs(dayjs(`${formattedDate}T10:00`)),
    },
    validateOnChange: true,
    validationSchema: form1ValidationSchema,
    onSubmit: (values) => {
      setFormValues({ ...formValues, ...values });
      setActiveStep(1);
    },
  });

  const handleNext = async () => {
    if (
      activeStep === 0 &&
      formikForm1.dirty &&
      !(Object.keys(formikForm1.errors).length > 0)
    ) {
      formikForm1.handleSubmit();
    }else if(activeStep === 1){
      setLoader(true)
      formValues['startDateTime'] = formatDate(formValues.bookingStartTime);
      formValues['endDateTime'] = formatDate(formValues.bookingEndTime);
      formValues['count'] = formValues.occupants;
      formValues['resourceId'] = String((resources.find((item) => item.name === formValues.ResourceName)).id);
      formValues['username'] = user.username;

      const token = user.token;
      const response = await bookingService.bookResource(formValues,token);
      setTimeout(() => {
        setLoader(false);
      }, 200);
      if (response) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleTermsCheckboxChange = (event: any) => {
    setTermsAccepted(event.target.checked);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

        <Container component="main" maxWidth="sm">
          <Toolbar />
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
                  We have recorded your booking
                  confirmation, and will send you an update when your booking is
                  ready.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    color="primary"
                  >
                    Back Home
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <form
                  onSubmit={activeStep === 0 ? formikForm1.handleSubmit : null}
                >
                  {getStepContent(activeStep, formikForm1, formValues)}

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
                        Place booking &nbsp;&nbsp;{" "}
                        {loader ? (
                          <CircularProgress color="inherit" size={30} />
                        ) : null}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </form>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
