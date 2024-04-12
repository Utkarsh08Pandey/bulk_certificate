import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Grid } from "@mui/material";

export default function SelectVariants(props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    props.handleEventData(event)
  };

  return (
    <Grid style={{ padding: "2%", width: "100%" }} item xs={4}>
      <FormControl variant="standard" sx={{ m: 1 }} style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          name={props.name}
          onChange={handleChange}
          label={props.name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Course"}>Course</MenuItem>
          <MenuItem value={"Seminar"}>Seminar</MenuItem>
          <MenuItem value={"Workshop"}>Workshop</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
