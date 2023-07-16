import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResourceSelectionForm from "./ResourceSelectionForm";
import Review from "./Review";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import ResourceServices from "src/services/ResourcesServices";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddNewResourceContainer() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [resourceName, setResourceName] = useState("");
  const [resourceCount, setResourceCount] = useState(1);
  const [resourceNameError, setResourceNameError] = useState("");
  const [resourceCountError, setResourceCountError] = useState("");

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
          resourceCount
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

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
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
          <Button color="inherit" onClick={handleHomeClick}>
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
    </ThemeProvider>
  );
}
