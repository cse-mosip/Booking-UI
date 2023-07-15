import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Review(props: React.PropsWithChildren<any>) {
  const resourceName: string = props.resourceName;
  const resourceCount: number = props.resourceCount;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Resource Summary
      </Typography>
      <Typography gutterBottom>Resource Name: {resourceName}</Typography>
      <Typography gutterBottom>Resource Count: {resourceCount}</Typography>
    </React.Fragment>
  );
}
