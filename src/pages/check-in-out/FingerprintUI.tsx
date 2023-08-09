import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FingerprintImg from "public/assets/images/fp_3.png";
import "./fingerprint.css";

export default function FingerprintUi(props: any) {
  const { resourceName } = props;
  const navigate = useNavigate();
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
      <Typography
        variant="h3"
        sx={{ ...headingStyle, color: "#0170D6" } as React.CSSProperties}
      >
        Please place your finger on the scanner
      </Typography>
      <img
        src={FingerprintImg}
        alt="fingerprint image"
        style={{ margin: "10%" }}
        className="fingerprint-animation"
      />
      {isStudent && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            navigate("/viewresources");
          }}
        >
          STOP ATTENDING
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
