import { Typography, TextField, Grid } from "@mui/material";
import TextInput from "../FormFields/TextInput";
import Select from "../FormFields/Select";
import { useState } from "react";

export default function FormOne({handleEventData}) {
  const [data, setData] = useState({})
  return (
    <>
   
      <Grid container spacing={2}>
        <TextInput label="Event Title" name="EventName" handleEventData={handleEventData}/>
        <Select label="Event Type" name="EventType" handleEventData={handleEventData}/>
        <TextInput label="Date Of Issue" name="CreationDate" handleEventData={handleEventData}/>
        <TextInput label="Event Description" name="Description" multiline={4} handleEventData={handleEventData}/>
      </Grid>
    </>
  );
}
