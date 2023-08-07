import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppbarComponent from "src/components/AppbarComponent";
import Copyright from "src/components/Copyright";
import DrawerComponent from "src/components/DrawerComponent";
import ResourceServices from "src/services/ResourcesServices";
import * as yup from "yup";
import ResourceSelectionForm from "./ResourceSelectionForm";
import Review from "./Review";
import { User } from "../../types";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";

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

const steps = ["Add new Resource", "Review"];

const resourceNameValidationSchema = yup.object({
  resourceName: yup
    .string()
    .required("Resource Name is required")
    .label("Resource Name"),
});

const resourceCountValidationSchema = yup.object({
  resourceCount: yup
    .number()
    .min(1)
    .required("Resource Count is required")
    .label("Resource Count"),
});

export default function AddNewResourceContainer() {
  const navigate = useNavigate();
  const user: User | null = useSelector(
    (state: AppState) => state.user.user
  );


  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  
    if (user.role === "RESOURCE_USER") {
      navigate("/dashboard");
    }
  }, [])
  

  
  const [activeStep, setActiveStep] = React.useState(0);
  const [resourceName, setResourceName] = useState("");
  const [resourceCount, setResourceCount] = useState(1);
  const [resourceNameError, setResourceNameError] = useState("");
  const [resourceCountError, setResourceCountError] = useState("");
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <ResourceSelectionForm
            resourceName={resourceName}
            resourceCount={resourceCount}
            setResourceName={setResourceName}
            setResourceCount={setResourceCount}
            resourceNameError={resourceNameError}
            resourceCountError={resourceCountError}
          />
        );
      case 1:
        return (
          <Review resourceName={resourceName} resourceCount={resourceCount} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const validateResourceName = async () => {
    try {
      await resourceNameValidationSchema.validate(
        { resourceName },
        { abortEarly: false }
      );
      setResourceNameError("");
      return true;
    } catch (err: any) {
      setResourceNameError(err.errors[0]);
      return false;
    }
  };

  const validateResourceCount = async () => {
    try {
      await resourceCountValidationSchema.validate(
        { resourceCount },
        { abortEarly: false }
      );
      setResourceCountError("");
      return true;
    } catch (err: any) {
      setResourceCountError(err.errors[0]);
      return false;
    }
  };

  const validate = async () => {
    const resourceNameValid = await validateResourceName();
    const resourceCountValid = await validateResourceCount();
    return resourceNameValid && resourceCountValid;
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        const valid = await validate();
        if (valid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        const response = await ResourceServices.createResource(
          resourceName,
          resourceCount,
          user.token
        );
        if (response) {
          setActiveStep(activeStep + 1);
        }
        break;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppbarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Toolbar />

          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              ADD A RESOURCE
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
                  The resource was successfully created.
                </Typography>
                <Typography variant="subtitle1">
                  Resource Name: {resourceName}
                </Typography>
                <Typography variant="subtitle1">
                  Resource Count: {resourceCount}
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
                {getStepContent(activeStep)}
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
                    >
                      Create Resource
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
      </Box>
    </ThemeProvider>
  );
}
