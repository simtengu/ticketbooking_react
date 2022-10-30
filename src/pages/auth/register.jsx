import React, { useEffect, useReducer, useState } from "react";
import { Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import { motion } from "framer-motion";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../../store/features/auth";
import { useNavigate } from "react-router-dom";
import { responsiveness as rsp } from "../../styles/responsiveness";

const Register = () => {
  const navigate = useNavigate();
  const redux_dispatch = useDispatch();
  const {
    feedback: { isLoading },
    auth: { user },
  } = useSelector((state) => state);

  let initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    phone: "",
    password: "",
    confirm_password: "",
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case "setFirstName":
        return { ...state, firstName: action.payload };
      case "setLastName":
        return { ...state, lastName: action.payload };
      case "setEmail":
        return { ...state, email: action.payload };
      case "setGender":
        return { ...state, gender: action.payload };
      case "setPhone":
        return { ...state, phone: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      case "setConfirmPassword":
        return { ...state, confirm_password: action.payload };

      default:
        return state;
    }
  };

  let [userInfo, dispatch] = useReducer(userReducer, initialUserData);
  let [formErrors, setFormErrors] = useState([]);

  //handle remove error.............
  const handleRemoveError = (value, fieldTitle) => {
    if (value) {
      let newErrorsList = formErrors.filter((err) => err.title !== fieldTitle);
      setFormErrors(newErrorsList);
    }
  };
  //submit user...............

  const handleSaveUser = (event) => {
    event.preventDefault();
    //validating inputs.............
    let errors0 = [];
    let errors1 = [];
    //phone...
    if (Number(userInfo.phone)) {
      if (userInfo.phone.length !== 10) {
        errors0.push({
          title: "phone",
          value: "A phone number must contain exactly 10 characters",
        });
      }
    } else {
      errors0.push({
        title: "phone",
        value: "A phone number must contain only numbers",
      });
    }
    //password.........
    if (userInfo.password.length <= 3) {
      errors0.push({
        title: "password",
        value: "A password  must contain atleast 4 characters",
      });
    }
    //confirm password//////////
    if (userInfo.confirm_password !== userInfo.password) {
      errors0.push({
        title: "confirm_password",
        value: "password doesn't match",
      });
    }

    //checking for all fields if they are filled
    Object.entries(userInfo).forEach((formField) => {
      let fieldTitle = formField[0];
      let fieldValue = formField[1];
      if (!fieldValue) {
        errors1.push({
          title: fieldTitle,
          value: "This field can't be empty",
        });
      }
    });
    //combining errors..............
    errors0.forEach((err) => {
      let isInErrors1 = errors1.some((er) => er.title === err.title);
      if (!isInErrors1) {
        //mergin to errors1 to make final errors list
        errors1.push({ title: err.title, value: err.value });
      }
    });
    setFormErrors(errors1);

    if (errors1.length === 0) {
      //no error found...submiting user info
      redux_dispatch(registerNewUser(userInfo));
    }
  };

  useEffect(() => {
    if (user.email) {
      navigate("/", { replace: true });
    }
  }, [user,navigate]);

  const registerVariant = {
    zoomIn: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 26 },
    },
  };

  return (
    <>
      {/* feedback message............................. */}
      <FeedbackMessage />

      {/* loading spinner................... */}
      {isLoading && <LoadingSpinner />}
      <Box py={4} className="grd-to-bottom" sx={{ minHeight: "80vh" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={5} sx={{ p: { xs: 2, md: 0 } }}>
            <motion.div
              animate="zoomIn"
              variants={registerVariant}
              initial={{ opacity: 0.1, scale: 0.5 }}
            >
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <center>
                  <Typography
                    className="text-primaryy signupText"
                    sx={{
                      fontWeight: "bold",
                      mt: 1,
                      fontSize: rsp.sectionTitle,
                    }}
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
                <form>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="filled-basic"
                          label="First Name"
                          variant="standard"
                          fullWidth
                          sx={{ my: 0.5 }}
                          value={userInfo.firstName}
                          onChange={(e) => {
                            dispatch({
                              type: "setFirstName",
                              payload: e.target.value,
                            });
                            handleRemoveError(e.target.value, "firstName");
                          }}
                          {...(formErrors.some(
                            (err) => err.title === "firstName"
                          )
                            ? {
                                error: true,
                                helperText: formErrors.find(
                                  (err) => err.title === "firstName"
                                ).value,
                              }
                            : {})}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          {...(formErrors.some(
                            (err) => err.title === "lastName"
                          )
                            ? {
                                error: true,
                                helperText: formErrors.find(
                                  (err) => err.title === "lastName"
                                ).value,
                              }
                            : {})}
                          id="filled-basic"
                          label="Last Name"
                          variant="standard"
                          fullWidth
                          required
                          sx={{ my: 0.5 }}
                          value={userInfo.lastName}
                          onChange={(e) => {
                            dispatch({
                              type: "setLastName",
                              payload: e.target.value,
                            });

                            handleRemoveError(e.target.value, "lastName");
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="email"
                          label="Email"
                          variant="standard"
                          fullWidth
                          sx={{ my: 0.5 }}
                          required
                          value={userInfo.email}
                          onChange={(e) => {
                            dispatch({
                              type: "setEmail",
                              payload: e.target.value,
                            });
                            handleRemoveError(e.target.value, "email");
                          }}
                          {...(formErrors.some((err) => err.title === "email")
                            ? {
                                error: true,
                                helperText: formErrors.find(
                                  (err) => err.title === "email"
                                ).value,
                              }
                            : {})}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number"
                          variant="standard"
                          fullWidth
                          sx={{ my: 0.5 }}
                          required
                          value={userInfo.phone}
                          onChange={(e) => {
                            dispatch({
                              type: "setPhone",
                              payload: e.target.value,
                            });
                            handleRemoveError(e.target.value, "phone");
                          }}
                          {...(formErrors.some((err) => err.title === "phone")
                            ? {
                                error: true,
                                helperText: formErrors.find(
                                  (err) => err.title === "phone"
                                ).value,
                              }
                            : {})}
                        />
                      </Grid>
                    </Grid>

                    <FormControl sx={{ mt: 2 }}>
                      <FormLabel id="radiogrp">Gender</FormLabel>
                      <RadioGroup
                        aria-labelledby="radiogrp"
                        defaultValue="male"
                        name="radio-buttons-group"
                        onChange={(e) =>
                          dispatch({
                            type: "setGender",
                            payload: e.target.value,
                          })
                        }
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
                        value={userInfo.password}
                        onChange={(e) => {
                          dispatch({
                            type: "setPassword",
                            payload: e.target.value,
                          });
                          handleRemoveError(e.target.value, "password");
                        }}
                        {...(formErrors.some((err) => err.title === "password")
                          ? {
                              error: true,
                            }
                          : {})}
                      />
                      {formErrors.some((err) => err.title === "password") && (
                        <FormHelperText error>
                          {
                            formErrors.find((err) => err.title === "password")
                              .value
                          }
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ my: 0.5 }} fullWidth variant="standard">
                      <InputLabel htmlFor="cpwd">Confirm password</InputLabel>
                      <Input
                        id="cpwd"
                        type="password"
                        startAdornment={
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        }
                        value={userInfo.confirm_password}
                        onChange={(e) => {
                          dispatch({
                            type: "setConfirmPassword",
                            payload: e.target.value,
                          });
                          handleRemoveError(e.target.value, "confirm_password");
                        }}
                        {...(formErrors.some(
                          (err) => err.title === "confirm_password"
                        )
                          ? {
                              error: true,
                            }
                          : {})}
                      />

                      {formErrors.some(
                        (err) => err.title === "confirm_password"
                      ) && (
                        <FormHelperText error>
                          {
                            formErrors.find(
                              (err) => err.title === "confirm_password"
                            ).value
                          }
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="grd-to-bottom-right"
                      sx={{ mt: 2 }}
                      size="large"
                      onClick={handleSaveUser}
                    >
                      register
                    </Button>
                    <Button
                      sx={{
                        mt: 1,
                        color: "#797979",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                      variant="text"
                      onClick={() => navigate("/login")}
                    >
                      go to login
                    </Button>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
