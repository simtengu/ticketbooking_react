import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Container,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import { Lock } from "@mui/icons-material";
import useAuth from "../../hookes/useAuth";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import { useDispatch } from "react-redux";
import { activateFeedback, deActivateFeedback } from "../../store/features/errorAndFeedback";
import { updateUser } from "../../store/features/auth";
import loader from "../../assets/doublering.gif";
import { secureApi } from "../../api";
import { responsiveness as rsp } from "../../styles/responsiveness";
const UpdateProfile = () => {
  const rxDispatch = useDispatch();
  const user = useAuth();
  let initialUserData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
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

      default:
        return state;
    }
  };

  let [userInfo, dispatch] = useReducer(userReducer, initialUserData);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    //phone number validation.......
    if (Number(userInfo.phone)) {
      if (userInfo.phone.length !== 10) {
        rxDispatch(
          activateFeedback({
            message: "A phone number must contain exactly 10 characters",
            status: "warning",
          })
        );
        return;
      }
    } else {
      rxDispatch(
        activateFeedback({
          message: "A phone field must contain only numbers",
          status: "warning",
        })
      );
      return;
    }
    //checking if all fields are filled........
    let isAnyFieldNotFilled = Object.values(userInfo).includes("");
    if (isAnyFieldNotFilled)
      return rxDispatch(
        activateFeedback({
          message: "Please fill all fields before submitting the form",
          status: "warning",
        })
      );

    //form is complete....submiting it
    try {
      setIsUpdating(true);
      await rxDispatch(updateUser(userInfo));
      rxDispatch(
        activateFeedback({
          message: "You have successfully updated your details",
          status: "success",
        })
      );

      setIsUpdating(false);
    } catch (error) {
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      rxDispatch(
        activateFeedback({
          message: error_message,
          status: "warning",
        })
      );

      setIsUpdating(false);
    }
  };

  //update password section.................
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    c_password: "",
  });
  const handleUpdatePassword = async () => {
    //password validating...........
    if (!passwordInfo.password || !passwordInfo.c_password)
      return rxDispatch(activateFeedback({
        message: "Please fill in all fields before submitting the form",
        status: "warning",
      })) 

    if (passwordInfo.password.length <= 3)
      return rxDispatch(activateFeedback({
        message: "Password should not contain less than four characters",
        status: "warning",
      })) 
    //confirm password//////////
    if (passwordInfo.c_password !== passwordInfo.password)
      return rxDispatch(activateFeedback({
        message: "password doesn't match",
        status: "warning",
      })) 

    //form is complete....submiting it
    try {
      setIsUpdating(true);
      const rs = await secureApi.patch("/user/change_password", {
        password: passwordInfo.password,
      });
      if (rs.statusText === "OK") {
        rxDispatch(
          activateFeedback({
            message: "You have successfully updated your password",
            status: "success",
          })
        );
      }

      setIsUpdating(false);
    } catch (error) {
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      rxDispatch(
        activateFeedback({
          message: error_message,
          status: "warning",
        })
      );

      setIsUpdating(false);
    }
  };

  useEffect(() => {
    return () => {
      rxDispatch(deActivateFeedback())
    };
  }, []);
  return (
    <>
      {/* loader................... */}
      {isUpdating && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: 100,
          }}
        >
          <img width="70" src={loader} alt="loader" />
        </Box>
      )}
      {/* feedback message............................. */}
      <FeedbackMessage />
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={7}>
            <Box sx={{ px: { xs: 1, md: 6 } }}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
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
                    Update your details
                  </Typography>
                </center>
                <Box sx={{ mt: 2 }}>
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
                    }}
                  />

                  <TextField
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
                    }}
                  />

                  <TextField
                    type="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    sx={{ my: 0.5 }}
                    required
                    disabled={user.role === 111 ? true : false}
                    value={userInfo.email}
                    onChange={(e) => {
                      dispatch({
                        type: "setEmail",
                        payload: e.target.value,
                      });
                    }}
                  />

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
                    }}
                  />

                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="radiogrp"
                      value={userInfo.gender}
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

                  <Button
                    fullWidth
                    variant="contained"
                    className="grd-to-bottom-right"
                    sx={{ mt: 2 }}
                    size="large"
                    onClick={handleUpdateProfile}
                  >
                    update profile
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
          {/* disable password change for admin account............ */}
          {user.role !== 111 && (
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <center>
                  <Typography
                    className="text-primaryy signupText"
                    sx={{
                      fontWeight: "bold",
                      my: 1,
                      fontSize: rsp.sectionTitle,
                    }}
                    variant="h5"
                  >
                    Change Password
                  </Typography>
                </center>
                <FormControl sx={{ my: 0.5 }} fullWidth variant="standard">
                  <InputLabel htmlFor="pwd">new password</InputLabel>
                  <Input
                    id="pwd"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    value={passwordInfo.password}
                    onChange={(e) => {
                      setPasswordInfo({
                        ...passwordInfo,
                        password: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl sx={{ my: 0.5 }} fullWidth variant="standard">
                  <InputLabel htmlFor="cpwd">confirm new password</InputLabel>
                  <Input
                    id="cpwd"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    value={passwordInfo.c_password}
                    onChange={(e) => {
                      setPasswordInfo({
                        ...passwordInfo,
                        c_password: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  className="grd-to-bottom-right"
                  sx={{ mt: 2 }}
                  size="large"
                  onClick={handleUpdatePassword}
                >
                  Change
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default UpdateProfile;
