import React from "react";
import { Typography, TextField, Grid } from "@mui/material";

export default function TextInput(props) {
  return (
    <Grid style={{ padding: "2%" }} item xs={4}>
      <TextField
        id="standard-basic"
        label={props.name}
        name={props.name}
        variant="standard"
        style={{ width: "100%" }}
        multiline={Boolean(props.multiline)}
        maxRows={props.multiline}
        onChange={props.handleEventData}
      />
    </Grid>
  );
}
