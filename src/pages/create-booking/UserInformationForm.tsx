import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function UserInformationForm() {
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            required
            id="userType"
            name="userType"
            label="User Type"
            fullWidth
            value={userType}
            onChange={handleChange}
            variant="standard"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </Grid>
        {userType === "student" && (
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="userId"
              name="userId"
              label="Registration ID"
              fullWidth
              value={userId}
              onChange={handleChange}
              variant="standard"
            />
          </Grid>
        )}
        {userType === "teacher" && (
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="teacherId"
              name="teacherId"
              label="Teacher's ID"
              fullWidth
              value={teacherId}
              onChange={handleChange}
              variant="standard"
            />
          </Grid>
        )}
        {userType === "admin" && (
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="adminId"
              name="adminId"
              label="Admin ID"
              fullWidth
              value={adminId}
              onChange={handleChange}
              variant="standard"
            />
          </Grid>
        )}
        <Grid item xs={6}>
        <TextField
            required
            id="occupants"
            name="occupants"
            label="Number of Occupants"
            fullWidth
            value={occupants}
            onChange={handleChange}
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
            value={additionalInfo}
            onChange={handleChange}
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
