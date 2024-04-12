import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const [data, setData] = useState({
    CompanyName: "",
    Password: "",
    ConfirmPassword: "",
    Email: "",
    PhoneNo: "",
    Address: "",
    GST: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }

    setErrors({ ...errors, [e.target.name]: "" });
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "700", mb: 3 }}
        >
          Registration
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="CompanyName"
                value={data.CompanyName}
                onChange={handleChange}
              />
              {errors.CompanyName && (
                <p className="error">{errors.CompanyName}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="Password"
                value={data.Password}
                onChange={handleChange}
              />
              {errors.Password && <p className="error">{errors.Password}</p>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="ConfirmPassword"
                value={data.ConfirmPassword}
                onChange={handleChange}
              />
              {errors.ConfirmPassword && (
                <p className="error">{errors.ConfirmPassword}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="Email"
                label="Email"
                name="Email"
                value={data.Email}
                onChange={handleChange}
              />
              {errors.Email && <p className="error">{errors.Email}</p>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="PhoneNo"
                name="PhoneNo"
                value={data.PhoneNo}
                onChange={handleChange}
              />
              {errors.PhoneNo && <p className="error">{errors.PhoneNo}</p>}
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                value={data.Address}
                onChange={handleChange}
              />
              {errors.Address && <p className="error">{errors.Address}</p>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="GST"
                name="GST"
                value={data.GST}
                onChange={handleChange}
              />
              {errors.GST && <p className="error">{errors.GST}</p>}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  let obj = data
                  delete obj["ConfirmPassword"]
                  console.log("---", data)
                  axios
                  .post(
                    "http://localhost:5000/company/registerCompany",
                    data
                  )
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.isSuccess) {
                      navigate('/')
                    } else {
                      alert("Error");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                }}
              >
                Submit
              </Button>
              <Button variant="contained"
                size="large" className="m-1" onClick={()=>{navigate('/')}}>Login</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Registration;
