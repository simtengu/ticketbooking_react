import {
  BookOnline,
  Close,
  Construction,
  Dashboard,
  Directions,
  DirectionsBus,
  LockReset,
  Logout,
  Message,
  People,
  Person,
} from "@mui/icons-material";
import { useEffect } from "react";
import { Box, Divider, Grid, Stack, ToggleButton } from "@mui/material";
import NavlinkItem from "./NavlinkItem";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAttempt } from "../../store/features/auth";
import { closeAdminLeftBar } from "../../store/features/errorAndFeedback";
import useAuth from "../../hookes/useAuth";
const Admin = () => {
  const authUser = useAuth();
  //checking if a user is an admin...admin layout has been used also for normal users profiles.
  const isAdmin = authUser.role === 111 ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { isAdminLeftBarOpen } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(closeAdminLeftBar());
  }, [path]);
  return (
    <>
      <Box sx={{minHeight:"65vh"}} className="admin-panel bg-light-cyan">
        <Grid container>
          <Grid item xs={9} md={4} lg={3}>
            <Box
              sx={{ height: "100%", display: { xs: "none", md: "block" } }}
              className="bg-primary admin-leftbar"
            >
              <ul>
                {!isAdmin && (
                  <NavlinkItem
                    title="My Account"
                    link="/user/account"
                    icon={<Person />}
                  />
                )}

                {isAdmin && (
                  <>
                    {" "}
                    <NavlinkItem
                      title="Dashboard"
                      link="/dashboard"
                      icon={<Dashboard />}
                    />
                    <NavlinkItem
                      title="Users"
                      link="/users"
                      icon={<People />}
                    />
                    <NavlinkItem
                      title="Tickets"
                      link="/tickets"
                      icon={<BookOnline />}
                    />
                    <NavlinkItem
                      title="Regions & Routes"
                      link="/routes"
                      icon={<Directions />}
                    />
                    <NavlinkItem
                      title="Messages"
                      link="/admin_messages"
                      icon={<Message />}
                    />
                  </>
                )}

                <NavlinkItem
                  title="Buses"
                  link="/buses"
                  icon={<DirectionsBus />}
                />
                <NavlinkItem
                  title="Update Profile"
                  link="/update_details"
                  icon={<Construction />}
                />
                <NavlinkItem
                  title="Change Password"
                  link="/update_details"
                  icon={<LockReset />}
                />

                <li className="">
                  <div
                    onClick={() => {
                      dispatch(logoutAttempt());
                      navigate("/");
                    }}
                    className="admin-link"
                  >
                    <Grid container>
                      <Grid item xs={2}>
                        <Logout />
                      </Grid>
                      <Grid item xs={10}>
                        logout
                      </Grid>
                    </Grid>
                  </div>
                </li>
                <Divider />
              </ul>
            </Box>

            {isAdminLeftBarOpen && (
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  className=" admin-leftbar"
                  style={{
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    zIndex: 111,
                  }}
                >
                  <ul className="bg-primary" style={{ height: "100vh" }}>
                    <li className="">
                      <div style={{ backgroundColor: "white" }}>
                        <Stack
                          flexDirection="row"
                          justifyContent={{ xs: "flex-end", sm: "flex-start" }}
                        >
                          <ToggleButton
                            sx={{
                              px: "10px",
                              pt: "10px",
                              mr: { xs: 1, sm: 0 },
                              ml: { xs: 0, sm: 1 },
                              my: 0.5,
                            }}
                            size="small"
                            onClick={() => dispatch(closeAdminLeftBar())}
                          >
                            <Close />
                          </ToggleButton>
                        </Stack>
                      </div>
                    </li>

                    {!isAdmin && (
                      <NavlinkItem
                        title="My Account"
                        link="/user/account"
                        icon={<Person />}
                      />
                    )}
                    {isAdmin && (
                      <>
                        {" "}
                        <NavlinkItem
                          title="Dashboard"
                          link="/dashboard"
                          icon={<Dashboard />}
                        />
                        <NavlinkItem
                          title="Users"
                          link="/users"
                          icon={<People />}
                        />
                        <NavlinkItem
                          title="Tickets"
                          link="/tickets"
                          icon={<BookOnline />}
                        />
                        <NavlinkItem
                          title="Regions & Routes"
                          link="/routes"
                          icon={<Directions />}
                        />
                        <NavlinkItem
                          title="Messages"
                          link="/admin_messages"
                          icon={<Message />}
                        />
                      </>
                    )}

                    <NavlinkItem
                      title="Buses"
                      link="/buses"
                      icon={<DirectionsBus />}
                    />

                    <NavlinkItem
                      title="Update Profile"
                      link="/update_details"
                      icon={<Construction />}
                    />
                    <NavlinkItem
                      title="Change Password"
                      link="/update_details"
                      icon={<LockReset />}
                    />

                    <li>
                      <div
                        onClick={() => {
                          dispatch(logoutAttempt());
                          navigate("/");
                        }}
                        className="admin-link"
                        style={{ cursor: "pointer" }}
                      >
                        <Grid container>
                          <Grid item xs={2}>
                            <Logout />
                          </Grid>
                          <Grid item xs={10}>
                            logout
                          </Grid>
                        </Grid>
                      </div>
                    </li>
                    <Divider />
                  </ul>
                </motion.div>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ p: 2, minHeight: "60vh" }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
