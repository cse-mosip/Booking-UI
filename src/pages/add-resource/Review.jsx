import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import termsText from "./terms.txt";

export default function Review() {
  const [termsAndConditions, setTermsAndConditions] = useState("");

  // useEffect(() => {
  //   fetch("/terms")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       setTermsAndConditions(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error reading terms.txt:", error);
  //     });
  // }, []);

  useEffect(() => {
    // Read the terms.txt file
    const readTerms = async () => {
      try {
        const response = await fetch(termsText);
        const data = await response.text();
        setTermsAndConditions(data);
      } catch (error) {
        console.error("Error reading terms.txt:", error);
      }
    };

    readTerms();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking summary
      </Typography>
      <Typography gutterBottom>
        Reource Selected: Level 1 Lab, Department of Computer Science
      </Typography>
      <Typography gutterBottom>Date: 20/08/2023</Typography>
      <Typography gutterBottom>
        I would like to book the CS department's level 1 lab for the semester 1
        students' practical session on module CS1012.
      </Typography>
      <Typography gutterBottom>Duration: 2 hrs</Typography>
      <Typography gutterBottom>Attachments:</Typography>
      {/* <List disablePadding>
        {userDetails.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List> */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        User Info
      </Typography>
      <Typography gutterBottom>Name: Nethum Lamahewage</Typography>
      <Typography gutterBottom>Index: 190123A</Typography>
      <Typography gutterBottom>
        Department of Computer Science and Engineering, Faculty of Engineering
      </Typography>
      <Typography gutterBottom>Mobile Number: 0712203412</Typography>
      <Typography gutterBottom>
        Address: 324/B, Amal road, Baracuda, Gallface
      </Typography>
      {/* <Typography gutterBottom>{resourceDetails.join(", ")}</Typography> */}

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Terms and Conditions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={termsAndConditions}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
