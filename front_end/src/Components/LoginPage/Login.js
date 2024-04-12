import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import loginImg from "../../images/login.webp";

function LoginPage() {
  const [dataLogin, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setLoginData({ ...dataLogin, [e.target.name]: e.target.value });

    // Clear error message when input is filled
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!dataLogin.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataLogin.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!dataLogin.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form data:", dataLogin);
      setLoginData({
        email: "",
        password: "",
      });
    }
  };
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container style={{ marginTop: "5%" }}>
        <Grid
          item
          xs={6}
          sx={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                py: 5,
                px: 4,
                maxWidth: "550px",
                mx: "auto",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "700", mb: 1 }}>
                Login in to Account
              </Typography>
              <Box sx={{ mb: 3 }}>
                Doesn't have an account yet ?
                <Link
                  sx={{ color: "info.main", textDecoration: "none" }}
                  onClick={() => navigate("/Register")}
                >
                  {" "}
                  Sign Up
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={dataLogin.email}
                      onChange={handleChange}
                      variant="standard"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={dataLogin.password}
                      onChange={handleChange}
                      variant="standard"
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <Link
                        sx={{ color: "info.main", textDecoration: "none" }}
                        onClick={() => {alert("under Development")}}
                      >
                        Forgot Password
                      </Link>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => {
                        let data = {
                          Email: dataLogin.email,
                          Password: dataLogin.password,
                        };
                        axios
                          .post(
                            "http://localhost:5000/company/loginCompany",
                            data
                          )
                          .then((res) => {
                            console.log(res.data);
                            if (res.data.isSuccess) {
                              localStorage.setItem('token',res.data.token)
                              localStorage.setItem('isLogin',true)


                              navigate('/events')
                            } else {
                              alert("Error");
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Box
            sx={{
              backgroundColor: "#e9eaeb",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={loginImg} alt="LoginImg" /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;
