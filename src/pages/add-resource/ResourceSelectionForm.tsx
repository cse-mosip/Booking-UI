import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ResourceSelectionForm(
  props: React.PropsWithChildren<any>
) {
  const resourceName: string = props.resourceName;
  const resourceCount: number = props.resourceCount;
  const setResourceName: React.Dispatch<React.SetStateAction<string>> =
    props.setResourceName;
  const setResourceCount: React.Dispatch<React.SetStateAction<number>> =
    props.setResourceCount;
  const resourceNameError: string = props.resourceNameError;
  const resourceCountError: string = props.resourceCountError;

  const handleResourceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResourceName(event.target.value);
  };

  const handleResourceCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResourceCount(+event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resource Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="resourceName"
            name="resourceName"
            label="Resource Name"
            fullWidth
            autoComplete="resource-name"
            variant="standard"
            onChange={handleResourceNameChange}
            value={resourceName}
            error={resourceNameError !== ""}
            helperText={resourceNameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="resourceCount"
            name="resourceCount"
            label="Resource Count"
            fullWidth
            autoComplete="resource-count"
            variant="standard"
            type="number"
            onChange={handleResourceCountChange}
            value={resourceCount}
            error={resourceCountError !== ""}
            helperText={resourceCountError}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
