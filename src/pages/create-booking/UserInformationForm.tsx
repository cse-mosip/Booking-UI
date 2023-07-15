import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type UserInformationFormProps = {
  formik: any;
};

export default function UserInformationForm(props :UserInformationFormProps) {
  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [occupants, setOccupants] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleChange = (event: any) => {
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            id="userType"
            name="userType"
            label="User Type"
            fullWidth
            value={props.formik.values.userType}
            onChange={props.formik.handleChange}
            error={props.formik.touched.userType && Boolean(props.formik.errors.userType)}
            helperText={props.formik.touched.userType && props.formik.errors.userType}
            variant="standard"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="userId"
            name="userId"
            label="Registration ID"
            fullWidth
            value={props.formik.values.userId}
            onChange={props.formik.handleChange}
            error={props.formik.touched.userId && Boolean(props.formik.errors.userId)}
            helperText={props.formik.touched.userId && props.formik.errors.userId}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          
          <TextField
            id="additionalInfo"
            name="additionalInfo"
            label="Additional Information"
            fullWidth
            multiline
            rows={4}
            value={props.formik.values.additionalInfo}
            onChange={props.formik.handleChange}
            error={props.formik.touched.additionalInfo && Boolean(props.formik.errors.additionalInfo)}
            helperText={props.formik.touched.additionalInfo && props.formik.errors.additionalInfo}
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
