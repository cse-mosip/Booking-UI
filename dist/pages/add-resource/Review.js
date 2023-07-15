var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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
        const readTerms = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(termsText);
                const data = yield response.text();
                setTermsAndConditions(data);
            }
            catch (error) {
                console.error("Error reading terms.txt:", error);
            }
        });
        readTerms();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Booking summary"),
        React.createElement(Typography, { gutterBottom: true }, "Reource Selected: Level 1 Lab, Department of Computer Science"),
        React.createElement(Typography, { gutterBottom: true }, "Date: 20/08/2023"),
        React.createElement(Typography, { gutterBottom: true }, "I would like to book the CS department's level 1 lab for the semester 1 students' practical session on module CS1012."),
        React.createElement(Typography, { gutterBottom: true }, "Duration: 2 hrs"),
        React.createElement(Typography, { gutterBottom: true }, "Attachments:"),
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
                    }, value: termsAndConditions })))));
}
//# sourceMappingURL=Review.js.map