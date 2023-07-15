import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
export default function UserInformationForm(props) {
    const [userType, setUserType] = useState("student");
    const [userId, setUserId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [adminId, setAdminId] = useState("");
    const [occupants, setOccupants] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "userType":
                setUserType(value);
                break;
            case "userId":
                setUserId(value);
                break;
            case "teacherId":
                setTeacherId(value);
                break;
            case "adminId":
                setAdminId(value);
                break;
            case "occupants":
                setOccupants(value);
                break;
            case "additionalInfo":
                setAdditionalInfo(value);
                break;
            default:
                break;
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "User Information"),
        React.createElement(Grid, { container: true, spacing: 3 },
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { select: true, id: "userType", name: "userType", label: "User Type", fullWidth: true, value: props.formik.values.userType, onChange: props.formik.handleChange, error: props.formik.touched.userType && Boolean(props.formik.errors.userType), helperText: props.formik.touched.userType && props.formik.errors.userType, variant: "standard" },
                    React.createElement(MenuItem, { value: "student" }, "Student"),
                    React.createElement(MenuItem, { value: "teacher" }, "Teacher"),
                    React.createElement(MenuItem, { value: "admin" }, "Admin"))),
            React.createElement(Grid, { item: true, xs: 12, md: 6 },
                React.createElement(TextField, { id: "userId", name: "userId", label: "Registration ID", fullWidth: true, value: props.formik.values.userId, onChange: props.formik.handleChange, error: props.formik.touched.userId && Boolean(props.formik.errors.userId), helperText: props.formik.touched.userId && props.formik.errors.userId, variant: "standard" })),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { id: "additionalInfo", name: "additionalInfo", label: "Additional Information", fullWidth: true, multiline: true, rows: 4, value: props.formik.values.additionalInfo, onChange: props.formik.handleChange, error: props.formik.touched.additionalInfo && Boolean(props.formik.errors.additionalInfo), helperText: props.formik.touched.additionalInfo && props.formik.errors.additionalInfo, variant: "standard" })))));
}
//# sourceMappingURL=UserInformationForm.js.map