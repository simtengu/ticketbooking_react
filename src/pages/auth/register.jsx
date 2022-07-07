import { Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
const Register = () => {
  return (
    <>
      <Box py={4} className="bg-primary" sx={{ minHeight: "100vh" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={4} lg={5} sx={{p:{xs:2,md:0}}}>
            <Paper sx={{ p: 2, borderRadius: 4 }}>
              <center>
                <Typography
                  className="text-primary"
                  sx={{ fontWeight: "bold", mt: 1 }}
                  variant="h4"
                >
                  Create Account
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#797979", fontWeight: "bold" }}
                  gutterbottom
                >
                  Fill and submit the form below to register
                </Typography>
              </center>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="filled-basic"
                      label="First Name"
                      variant="filled"
                      fullWidth
                      required
                      sx={{ my: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="filled-basic"
                      label="Last Name"
                      variant="filled"
                      fullWidth
                      required
                      sx={{ my: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="filled"
                      fullWidth
                      sx={{ my: 0.5 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone number"
                      variant="filled"
                      fullWidth
                      sx={{ my: 0.5 }}
                      required
                    />
                  </Grid>
                </Grid>

                <FormControl sx={{ mt: 2 }}>
                  <FormLabel id="radiogrp">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="radiogrp"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          sx={{
                            color: "#22929b",
                            "&.Mui-checked": {
                              color: "#22929b",
                            },
                          }}
                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          sx={{
                            color: "#22929b",
                            "&.Mui-checked": {
                              color: "#22929b",
                            },
                          }}
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio
                          sx={{
                            color: "#22929b",
                            "&.Mui-checked": {
                              color: "#22929b",
                            },
                          }}
                        />
                      }
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ my: 0.5 }} fullWidth variant="standard">
                  <InputLabel htmlFor="pwd">Your password</InputLabel>
                  <Input
                    id="pwd"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ my: 0.5 }} fullWidth variant="standard">
                  <InputLabel htmlFor="pwd">Confirm password</InputLabel>
                  <Input
                    id="pwd"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  className="grd-to-bottom-right"
                  sx={{ mt: 2 }}
                  size="large"
                >
                  register
                </Button>
                <Button
                  sx={{ mt: 1, color: "#868686", fontSize: 13 }}
                  variant="text"
                >
                  go to login
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
