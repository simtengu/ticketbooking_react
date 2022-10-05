import React, { useEffect, useState } from "react";
import { Forward } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api";

import { setRegions } from "../store/features/profile";
import { setFrom, setTo } from "../store/features/ticketbooking";
import LoadingSpinner from "./utils/LoadingSpinner";
import { responsiveness as rsp } from "../styles/responsiveness";
const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [regions, setTheRegions] = useState([]);
  const [fromR, setFromR] = useState("");
  const [toR, setToR] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSetFrom = (frm) => {
    let newRegionsList = regions.filter((rgn) => rgn !== frm);
    let toRgn = newRegionsList[0];
    setFromR(frm);
    setToR(toRgn);
  };

  const handleSubmitRoute = () => {
    if (fromR && toR) {
      dispatch(setFrom(fromR));
      dispatch(setTo(toR));
      navigate(`/journey/${fromR}/${toR}`);
    }
  };
  useEffect(() => {
    const getRegions = async () => {
      try {
        setIsLoading(true);
        const rs = await publicApi.get("/regions");
        const rsData = rs.data;
        let regions = rsData.regions.map((region) => region.name);
        if (rs.status === 200) {
          dispatch(setRegions(regions)); //for other components(globally accessed)...
          setTheRegions(regions); //for this component..........
          setFromR(regions[0]);
          setToR(regions[1]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("something went wrong");
        setIsLoading(false);
      }
    };
    getRegions();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "80vh" }}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ pt: 10, pb: 15 }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={8}>
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.4, opacity: 0.2 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <Box mx={3}>
                <center>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", fontSize: rsp.heading3 }}
                    className="text-light"
                  >
                    We provide the best transport services in Tanzania.
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-light"
                    gutterBottom
                    sx={{ fontSize: rsp.caption }}
                  >
                    For a nice, comfortable, cheap, wonderful and safe journey
                    we are the one and only option for you.
                  </Typography>

                  <Typography
                    variant="h1"
                    className="text-secondary"
                    sx={{ fontWeight: "bold", fontSize: rsp.topHeading }}
                  >
                    Travel with Us
                  </Typography>
                </center>
              </Box>

              <div>
                <Box mt={3}>
                  <Paper sx={{ p: 4, borderRadius: 7 }}>
                    <center>
                      <Typography
                        className="text-primary"
                        variant="button"
                        sx={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        Tell us about your journey
                      </Typography>{" "}
                    </center>
                    <Box sx={{ mt: 2 }}>
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          {regions && regions.length > 0 ? (
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
                                value={fromR}
                                onChange={(e) => handleSetFrom(e.target.value)}
                              >
                                {regions &&
                                  regions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                              </TextField>
                              <Forward className="text-primary" />

                              <TextField
                                select
                                label="To"
                                size="small"
                                margin="normal"
                                name="From"
                                value={toR}
                                onChange={(e) => {
                                  setToR(e.target.value);
                                }}
                              >
                                {regions &&
                                  regions
                                    .filter((region) => region !== fromR)
                                    .map((option, index) => (
                                      <MenuItem key={index} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                              </TextField>
                            </Stack>
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Grid item xs={12} md={6} alignSelf="center">
                          <center>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mx: 1 }}
                              className="grd-to-bottom-right"
                              onClick={handleSubmitRoute}
                            >
                              submit
                            </Button>
                          </center>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                  <center>
                    <Typography
                      mt={1}
                      variant="body1"
                      className="text-secondary"
                      sx={{ fontSize: rsp.paragraph1 }}
                    >
                      Fill and submit this form to get your ticket now.
                    </Typography>
                  </center>
                </Box>
              </div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Hero;
