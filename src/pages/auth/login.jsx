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
import { useLocation, useNavigate } from "react-router-dom";
import Row from "../../components/utils/Row";
const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state.from.pathname;

  return (
    <>
      <Box py={4} className="bg-primary" >
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "75vh" }}>
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
                gutterbottom
              >
                Provide your credentials to login
              </Typography>

              <Box sx={{ mt: 2 }}>
                <TextField
                  type="email"
                  label="Your Email"
                  variant="standard"
                  fullWidth
                  sx={{ my: 0.5 }}
                />

                <FormControl sx={{ mt: 3, mb: 1 }} fullWidth variant="standard">
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

                <Button
                  variant="contained"
                  className="grd-to-bottom-right"
                  sx={{ mt: 2,fontWeight:"bold" }}
                  size="large"
                >
                  Login
                </Button>
                <Box>
                  <Row>
                    <Button
                      sx={{ mt: 1, color: "#868686", fontSize: 13 }}
                      variant="text"
                    >
                      go to register
                    </Button>
                    <Button
                      sx={{ mt: 1, color: "#868686", fontSize: 13 }}
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
