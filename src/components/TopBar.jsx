import React from "react";
import { Logout, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../hookes/useAuth";
import { logoutAttempt } from "../store/features/auth";

function TopBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const authUser = useAuth();
  return (
    <>
      <Box className="app-bar bg-light" sx={{ py: 2 }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              <Grid container>
                <Grid item sm={6}>
                  <Link to="/" className="logo">
                    {" "}
                    <Typography
                      variant="h5"
                      className="text-primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      <span style={{ color: "#ffde07" }}>TICKETS</span>-BOOKING
                      {/* <span style={{ color: "#ffde07" }}>A<span className="text-primary">O</span>S</span>-EXPRESS */}
                    </Typography>{" "}
                  </Link>
                </Grid>
                <Grid item sm={6}>
                  <Stack
                    className="navbarRightColumn"
                    direction="row"
                    alignItems="center"
                    justifyContent="right"
                  >
                    <Box className="topbar_link_container">
                      <Link to="/about" className="topbar_link">
                        <Typography
                          variant="body2"
                          className="text-secondary"
                          sx={{
                            fontSize: { xs: "15px", md: "19px" },
                            mx: 1,
                            fontWeight: "bold",
                          }}
                        >
                          about us
                        </Typography>
                      </Link>
                      <center>
                        <Box className="topbar_link_underline"></Box>
                      </center>
                    </Box>

                    <Box className="topbar_link_container">
                      <Link to="/contacts" className="topbar_link">
                        <Typography
                          variant="body2"
                          className="text-secondary"
                          sx={{
                            fontSize: { xs: "15px", md: "19px" },
                            mx: 1,
                            fontWeight: "bold",
                          }}
                        >
                          contacts
                        </Typography>
                      </Link>
                      <center>
                        <Box className="topbar_link_underline"></Box>
                      </center>
                    </Box>

                    {authUser.email ? (
                      <Stack direction="row">
                        <Tooltip
                          sx={{ mx: 1 }}
                          title="logout"
                          placement="top"
                          arrow
                        >
                          <IconButton onClick={()=>{dispatch(logoutAttempt());navigate("/")}}>
                            <Logout sx={{ color: "#29979f" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          sx={{ mx: 1 }}
                          title="account"
                          placement="top"
                          onClick={() => navigate("/admin/dashboard")}
                          arrow
                        >
                          <Avatar
                            sx={{
                              mx: 0,
                              bgcolor: "#29979f",
                              "&:hover": { bgcolor: "#70d2da" },
                            }}
                          >
                            <Person />
                          </Avatar>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Box>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mx: 1 }}
                          className="grd-to-bottom-right"
                          onClick={() =>
                            navigate("/register", {
                              state: { from: location.pathname },
                            })
                          }
                        >
                          register
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            mx: 1,
                            color: "#158a93",
                            borderColor: "#158a93",
                          }}
                          onClick={() =>
                            navigate("/login", {
                              state: { from: location.pathname },
                            })
                          }
                        >
                          Login
                        </Button>
                      </Box>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default TopBar;
