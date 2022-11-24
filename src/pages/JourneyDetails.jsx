import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import bus from "../assets/bus3.gif";
import no_result from "../assets/noresults.JPG";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchRouteAndTakenTickets,
  setFrom,
  setTo,
} from "../store/features/ticketbooking";
import { fetchRegions } from "../store/features/profile";
import LeftBarSkeleton from "../components/readability/LeftBarSkeleton";
import MainBodySkeleton from "../components/readability/MainBodySkeleton";
import TicketDetails from "../components/readability/TicketDetails";
import { KeyboardDoubleArrowRightSharp } from "@mui/icons-material";

const JourneyDetails = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const params = useParams();
  //state management...............................................
  const {
    profile: { regions },
    booking: { routeInfo, departingDate },
  } = useSelector((state) => state);

  const [fromRegion, setFromRegion] = useState(
    routeInfo?.from || params.fromRegion
  );
  const [toRegion, setToRegion] = useState(routeInfo?.to || params.toRegion);
  const [loading, setLoading] = useState(true);
  const [mapDisplay, setMapDisplay] = useState("none");

  const fetchRouteAndTickets = async (toRgn) => {
    setLoading(true);
    await dispatch(fetchRouteAndTakenTickets({ fromRegion, toRegion: toRgn }));
    setLoading(false);
  };

  const handleChangeToRegion = (toValue) => {
    setToRegion(toValue);
    dispatch(setFrom(fromRegion));
    dispatch(setTo(toValue));
    fetchRouteAndTickets(toValue);
  };

  useEffect(() => {
    const getRegions = async () => {
      setLoading(true);
      await dispatch(fetchRegions());
      setLoading(false);
    };

    //fetch regions if a user navigated to the page through the browser(manual typing of url)
    if (!regions || regions.length < 1) {
      getRegions();
    }
  }, []);

  useEffect(() => {
    fetchRouteAndTickets(toRegion);
  }, [departingDate]);

  return (
    <>
      <Box sx={{ mt: 10, pb: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={11}>
            <Paper sx={{ p: 0 }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={5}
                  className="bg-dark-primary"
                  sx={{ p: 2 }}
                >
                  <Paper sx={{ mb: 1 }}>
                    {loading ? (
                      <LeftBarSkeleton />
                    ) : (
                      <Box>
                        <Paper className="bg-light-cyan" sx={{ p: 1 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <TextField
                              select
                              label="From"
                              size="small"
                              margin="normal"
                              name="From"
                              value={fromRegion}
                              onChange={(e) => {
                                setFromRegion(e.target.value);
                                setToRegion("no");
                              }}
                            >
                              {regions.map((region, index) => (
                                <MenuItem key={index} value={region}>
                                  {region}
                                </MenuItem>
                              ))}
                            </TextField>
                            <KeyboardDoubleArrowRightSharp className="text-primary" />
                            <TextField
                              select
                              label="To"
                              size="small"
                              margin="normal"
                              name="From"
                              value={toRegion}
                              onChange={(e) =>
                                handleChangeToRegion(e.target.value)
                              }
                            >
                              {regions
                                .filter((region) => region !== fromRegion)
                                .map((option, index) => (
                                  <MenuItem key={index} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </Stack>
                        </Paper>
                        <Box
                          sx={{ p: 1, display: { xs: "block", md: "none" } }}
                        >
                          <Button
                            size="small"
                            className="grd-primary"
                            sx={{
                              mb: 1,
                              width: "100%",
                              fontFamily: "roboto",
                              fontWeight: "bold",
                              color: "white",
                              textTransform: "capitalize",
                              "&:hover": {
                                background:
                                  "linear-gradient(to top, #158a93, #75c8ce)",
                              },
                            }}
                            onClick={() =>
                              setMapDisplay(() => {
                                if (mapDisplay === "none") return "block";
                                return "none";
                              })
                            }
                          >
                            {mapDisplay === "none"
                              ? "show direction map"
                              : "hide direction map"}
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            p: 1,
                            display: { xs: mapDisplay, md: "block" },
                          }}
                        >
                          <iframe
                            src={routeInfo ? routeInfo.routeMap : ""}
                            style={{
                              border: 0,
                              width: "100%",
                              minHeight: "400px",
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={7} className="journey-details-div">
                  <Box sx={{ p: 1.5 }}>
                    {loading && <MainBodySkeleton />}
                    {!loading && routeInfo ? (
                      <TicketDetails />
                    ) : "" }
                    
                      {!loading && !routeInfo  ? (
                      <Stack
                        sx={{ minHeight: "200px" }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img src={no_result} alt="no result" />
                        <center>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            we have not yet established our service for the
                            journey route you provided.
                          </Typography>
                        </center>
                      </Stack>
                    ) : "" }
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default JourneyDetails;
