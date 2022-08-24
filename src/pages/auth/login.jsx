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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Row from "../../components/utils/Row";
import { loginAttempt } from "../../store/features/auth";
import { activateFeedback } from "../../store/features/errorAndFeedback";
const Login = () => {
  const {
    feedback: { isLoading },
    auth: { user },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // if(location?.state?.from){
  //   path = location.state.from.pathname
  // }else{
  //   path = "/"
  // }
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.values(userInfo).some((item) => item === "")) {
      dispatch(
        activateFeedback({
          message: "Please provide both email and password",
          status: "warning",
        })
      );
    } else {
      dispatch(loginAttempt(userInfo));
    }
  };

  // useEffect(() => {
  //   if (user.email) {
  //     navigate("/admin/tickets", { replace: true });
  //   }
  // }, [user]);

  return (
    <>
      {/* feedback message............................. */}
      <FeedbackMessage />

      {/* loading spinner................... */}
      {isLoading && <LoadingSpinner />}
      <Box py={4} className="bg-primary">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "75vh" }}
        >
          <Grid item xs={12} md={4} sx={{ p: { xs: 2, md: 0 } }}>
            <Paper sx={{ p: 2, borderRadius: 4 }}>
              <Typography
                className="text-primary"
                sx={{ fontWeight: "bold", mt: 1 }}
                variant="h4"
              >
                Login here
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#797979", fontWeight: "bold" }}
                gutterBottom
              >
                Provide your credentials to login
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form>
                  <TextField
                    type="email"
                    label="Your Email"
                    variant="standard"
                    fullWidth
                    sx={{ my: 0.5 }}
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                  <FormControl
                    sx={{ mt: 3, mb: 1 }}
                    fullWidth
                    variant="standard"
                  >
                    <InputLabel htmlFor="pwd">Your password</InputLabel>
                    <Input
                      id="pwd"
                      type="password"
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    className="grd-to-bottom-right"
                    sx={{ mt: 2, fontWeight: "bold" }}
                    size="large"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </form>

                <Box>
                  <Row>
                    <Button
                      sx={{
                        mt: 1,
                        color: "#797979",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                      variant="text"
                      onClick={() => navigate("/register")}
                    >
                      go to register
                    </Button>
                    <Button
                      sx={{
                        mt: 1,
                        color: "#797979",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                      variant="text"
                    >
                      forgot password ?
                    </Button>
                  </Row>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
