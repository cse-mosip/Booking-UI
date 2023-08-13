import { Box, Button, Typography, useTheme } from "@mui/material";
import FingerprintImg from "public/assets/images/fp_3.png";
import React from "react";
import "./fingerprint.css";

export default function FingerprintUi(props: any) {
  const { resourceName, scannerActive, requestFingerprint } = props;
  const isStudent = true;

  const theme = useTheme();
  const containerWidth = theme.breakpoints.down("sm") ? "70%" : "30%";

  return (
    <Box
      style={
        { ...formContainerStyle, width: containerWidth } as React.CSSProperties
      }
    >
      <Typography
        variant="h3"
        sx={
          { ...headingStyle, color: "red", fontSize: 40 } as React.CSSProperties
        }
      >
        {resourceName}
      </Typography>
      <img
        src={FingerprintImg}
        alt="fingerprint image"
        style={{ margin: "10%" }}
        className={scannerActive ? "fingerprint-animation" : ""}
      />
      {isStudent && (
        <Button
          variant="contained"
          color={scannerActive ? "info" : "success"}
          onClick={requestFingerprint}
          disabled={scannerActive}
        >
          {scannerActive ? "Waiting for fingerprint..." : "Check in"}
        </Button>
      )}
    </Box>
  );
}

const headingStyle: React.CSSProperties = {
  marginBottom: "2%",
  fontSize: 28,
  letterSpacing: "1px",
  textAlign: "center",
};

const formContainerStyle: React.CSSProperties = {
  padding: "30px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#FFFFFF",
  borderRadius: "3%",
};
