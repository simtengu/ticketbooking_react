import React from "react";
import { FormatAlignLeft, Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../hookes/useAuth";
import { logoutAttempt } from "../store/features/auth";
import { responsiveness as rsp } from "../styles/responsiveness";
import { openAdminLeftBar } from "../store/features/errorAndFeedback";

function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isOnAdmin = path.split("/")[1] === "admin" ? true : false;

  const authUser = useAuth();
  let profile_path = "/admin/user/account";
  if (authUser?.email && authUser?.role === 111) {
    profile_path = "/admin/dashboard";
  }

  return (
    <>
      <Box className="app-bar bg-light" sx={{ py: 2 }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction={{
                      xs: isOnAdmin ? "row-reverse" : "row",
                      sm: "row",
                    }}
                    justifyContent={{ xs: "space-between", sm: "flex-start" }}
                  >
                    {isOnAdmin && (
                      <ToggleButton
                        sx={{
                          px: "10px",
                          pt: "10px",
                          display: { xs: "block", md: "none" },
                        }}
                        onClick={() => dispatch(openAdminLeftBar())}
                        size="small"
                        value="left"
                      >
                        <FormatAlignLeft />
                      </ToggleButton>
                    )}

                    <Link to="/" className="logo">
                      {" "}
                      <Typography
                        variant="h5"
                        className="text-primary"
                        sx={{
                          fontWeight: "bold",
                          fontSize: rsp.heading3,
                          ml: { xs: 0, sm: 1.6, md: 0 },
                        }}
                      >
                        <span style={{ color: "#ffde07" }}>TICKET</span>-BOOKING
                      </Typography>{" "}
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <Stack
                    className="navbarRightColumn"
                    direction="row"
                    alignItems="center"
                    justifyContent={{ xs: "left", md: "right" }}
                    flexWrap="wrap"
                  >
                    <Box className="topbar_link_container">
                      <Link to="/about" className="topbar_link">
                        <Typography
                          variant="body2"
                          className="text-secondary"
                          sx={{
                            fontSize: { xs: "18px", md: "19px" },
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
                            fontSize: { xs: "18px", md: "19px" },
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
                          <IconButton
                            onClick={() => {
                              dispatch(logoutAttempt());
                              navigate("/");
                            }}
                          >
                            <Logout sx={{ color: "#29979f" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          sx={{ mx: 1 }}
                          title="Profile"
                          placement="top"
                          onClick={() => navigate(profile_path)}
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
                          sx={{
                            mx: 1,
                            fontSize: { xs: "0.7rem", md: "0.812rem" },
                          }}
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
                            fontSize: { xs: "0.7rem", md: "0.812rem" },
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
