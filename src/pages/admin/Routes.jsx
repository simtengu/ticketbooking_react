import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Row from "../../components/utils/Row";
import {
  deleteRegion,
  editRegion,
  fetchRegionRoutes,
  fetchRegions,
  fetchRoutes,
  registerRegion,
  registerRoute,
} from "../../store/features/profile";
import {
  activateFeedback,
  closeModal,
  deActivateFeedback,
  openModal,
} from "../../store/features/errorAndFeedback";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/utils/Modal";
import spinner from "../../assets/spinner.gif";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import { useReducer } from "react";
import UpdateRouteForm from "../../components/admin/UpdateRoute";

const Routes = () => {
  const dispatch = useDispatch();
  const {
    feedback: { isLoading, isModalOpen },
    profile: { regions, routes },
  } = useSelector((state) => state);
  const [isFirstRoundChecked, setFirstRound] = useState(false);
  const [isSecondRoundChecked, setSecondRound] = useState(false);

  const [newRegion, setNewRegion] = useState("");
  const [prevRegion, setPrevRegion] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [isUpdatingRegion, setIsUpdatingRegion] = useState({
    status: false,
    message: "",
  });

  const [selectedRoute, setSelectedRoute] = useState({});
  const [modalContent, setModalContent] = useState("updateRegion");

  //routes fetching..........................................................
  const [routeCategory, setRouteCategory] = useState("all");
  const [isFetchingRoutes, setIsFetchingRoute] = useState(false);
  const handleRoutesFetching = async (from) => {
    setIsFetchingRoute(true);
    if (from === "all") {
      await dispatch(fetchRoutes());
    } else {
      await dispatch(fetchRegionRoutes(from));
    }
    setRouteCategory(from);
    setIsFetchingRoute(false);
  };
  //end of routes fetching..........................................................
  //journey state implementation...............................
  const [toRegions, setToRegions] = useState(regions);
  const initialJourneyInfo = {
    from: regions.length > 0 ? regions[0] : "arusha",
    to: regions.length >= 2 ? regions[1] : "no enough regions",
    routeMap: "",
    price: "",
    distance: "",
    perDayRounds: [],
  };
  const journeyReducer = (state, action) => {
    switch (action.type) {
      case "setFrom":
        return { ...state, from: action.payload };
      case "setTo":
        return { ...state, to: action.payload };
      case "setPrice":
        return { ...state, price: action.payload };
      case "setMap":
        return { ...state, routeMap: action.payload };
      case "setDistance":
        return { ...state, distance: action.payload };
      case "addRound":
        const newRound = action.payload;
        return { ...state, perDayRounds: [...state.perDayRounds, newRound] };
      case "removeRound":
        const newRoundsList = state.perDayRounds.filter(
          (round) => round.title !== action.payload
        );
        return { ...state, perDayRounds: newRoundsList };
      case "setBusType":
        let rounds = state.perDayRounds;
        let targetedRound = rounds.find(
          (round) => round.title === action.payload.title
        );
        let targetedRoundIndex = rounds.findIndex(
          (round) => round.title === action.payload.title
        );
        rounds[targetedRoundIndex] = {
          ...targetedRound,
          busType: action.payload.busType,
        };
        return { ...state, perDayRounds: rounds };

      case "resetRoute":
        return initialJourneyInfo;
      default:
        return state;
    }
  };

  const [journeyInfo, jDispatch] = useReducer(
    journeyReducer,
    initialJourneyInfo
  );

  //end of journey state implementation........................

  const handleSubmitRegion = async () => {
    if (newRegion) {
      setIsAddingRegion(true);
      await dispatch(registerRegion(newRegion.trim()));
      setIsAddingRegion(false);
      setNewRegion("");
    }
  };

  //rounds per day state management........................................
  const handleRoundsChange = (e) => {
    const name = e.target.name;
    if (name === "1st round") {
      if (isFirstRoundChecked) {
        //1st round unchecked...removing it from the list of availble rounds....
        jDispatch({ type: "removeRound", payload: name });
      } else {
        jDispatch({
          type: "addRound",
          payload: { title: name, time: "06:00am", busType: "2 By 3" },
        });
      }
      setFirstRound(!isFirstRoundChecked);
    } else {
      if (isSecondRoundChecked) {
        //2nd round unchecked...removing it from the list of availble rounds....
        jDispatch({ type: "removeRound", payload: name });
      } else {
        jDispatch({
          type: "addRound",
          payload: { title: name, time: "08:00am", busType: "2 By 3" },
        });
      }
      setSecondRound(!isSecondRoundChecked);
    }
  };

  const handleOpenModal = (rgn) => {
    setModalContent("updateRegion");
    setSelectedRegion(rgn);
    setPrevRegion(rgn);
    dispatch(openModal());
  };

  //update the region............
  const handleUpdatedRegion = async () => {
    if (!selectedRegion) return;
    setIsUpdatingRegion({ status: true, message: "Updating region....." });
    await dispatch(editRegion({ prevRegion, updatedRegion: selectedRegion }));
    setIsUpdatingRegion({ status: false, message: "" });
    setPrevRegion(selectedRegion);
  };

  //delete the region............
  const handleDeleteRegion = async () => {
    if (!selectedRegion) return;
    setIsUpdatingRegion({ status: true, message: "Deleting region......." });
    await dispatch(deleteRegion(selectedRegion));
    setIsUpdatingRegion({ status: false, message: "" });
    dispatch(closeModal());
  };

  //update route destinations......
  const changeFromTo = (fromRegion) => {
    jDispatch({ type: "setFrom", payload: fromRegion });
    if (regions.length > 1) {
      let newList = regions.filter((region) => region !== fromRegion);
      setToRegions(newList);
      jDispatch({ type: "setTo", payload: newList[0] });
    }
  };

  //get value for 1st/2nd round bus type

  const getBusType = (route_round) => {
    let bus_type;
    if (route_round === "first_round") {
      let first_round = journeyInfo.perDayRounds.find(
        (round) => round.title === "1st round"
      );
      bus_type = first_round.busType;
    } else {
      let second_round = journeyInfo.perDayRounds.find(
        (round) => round.title === "2nd round"
      );
      bus_type = second_round.busType;
    }
    return bus_type;
  };

  //handle new journey route registration...............
  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const handleSaveRoute = async () => {
    //simple inputs validation.......................
    if (
      journeyInfo.perDayRounds.length < 1 ||
      !journeyInfo.distance ||
      !journeyInfo.price ||
      !journeyInfo.from ||
      !journeyInfo.to
    ) {
      dispatch(
        activateFeedback({
          status: "warning",
          message: "please fill all fields before saving the route",
        })
      );

      return;
    }
//everything is okay ..saving a route..................

 try{
   setIsAddingRoute(true);
   await dispatch(registerRoute(journeyInfo));
   setIsAddingRoute(false);
   jDispatch({ type: "resetRoute" });
   setFirstRound(false);
   setSecondRound(false);
   
  } catch (error) {
      setIsAddingRoute(false);

        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
       
    }


  };

  const [updateRouteProperties, setUpdateRouteProperties] = useState({});
  const handleEditRoute = (routeId) => {
    const rt = routes.find((route) => route._id === routeId);
    const firstRoundStatus = rt.perDayRounds.some(
      (round) => round.title === "1st round"
    );
    const secondRoundStatus = rt.perDayRounds.some(
      (round) => round.title === "2nd round"
    );

    setUpdateRouteProperties({ firstRoundStatus, secondRoundStatus });
    setSelectedRoute(routeId);
    setModalContent("updateRoute");
    dispatch(openModal());
  };

  useEffect(() => {
    const getRegionsAndRoutes = async () => {
      await dispatch(fetchRegions());
      await dispatch(fetchRoutes());
    };

    getRegionsAndRoutes();

    return () => {
      dispatch(deActivateFeedback());
    };
  }, []);

  useEffect(() => {
    changeFromTo(regions[0]);
  }, [regions]);

  if (isLoading) {
    return (
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Skeleton
              sx={{ minHeight: { xs: "60vh", borderRadius: 11 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Skeleton
              sx={{ minHeight: { xs: "60vh", borderRadius: 11 } }}
              variant="rectangular"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <FeedbackMessage />
      {isModalOpen && (
        <Modal
          columnSize={
            modalContent === "updateRegion"
              ? { md: 4, lg: 4 }
              : { md: 4, lg: 4 }
          }
          contentAlignment="flex-start"
        >
          {modalContent === "updateRegion" ? (
            <Paper
              elevation={10}
              sx={{ borderRadius: 4, p: 2, mt: { xs: 10, sm: 7, md: 0 } }}
            >
              <Stack direction="row" justifyContent="center">
                <Box>
                  <Typography
                    className="text-primary"
                    variant="h6"
                    gutterBottom
                  >
                    Update the region
                  </Typography>
                  {isUpdatingRegion.status && (
                    <Row>
                      <img src={spinner} width="40" alt="ldr" />
                      <Typography variant="caption" className="text-primary">
                        {isUpdatingRegion.message}
                      </Typography>
                    </Row>
                  )}

                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ my: 1 }}
                    value={selectedRegion}
                    placeholder="enter region name"
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  />
                  <Row styles={{ marginTop: 1.5 }}>
                    <Button
                      onClick={handleUpdatedRegion}
                      className="bg-primary"
                      size="small"
                      startIcon={<Edit />}
                      variant="contained"
                    >
                      edit
                    </Button>
                    <Button
                      size="small"
                      sx={{ ml: 1 }}
                      startIcon={<Delete />}
                      color="error"
                      variant="contained"
                      onClick={handleDeleteRegion}
                    >
                      delete
                    </Button>
                  </Row>
                </Box>
              </Stack>
            </Paper>
          ) : (
            <UpdateRouteForm
              {...updateRouteProperties}
              routeId={selectedRoute}
            />
          )}
        </Modal>
      )}
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6" className="text-primary" sx={{ mb: 2 }}>
          Manage Regions & Routes
        </Typography>

        <Grid container>
          <Grid item xs={12} md={5}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <Box mx={1}>
                  <Box
                    className="bg-light-cyan"
                    sx={{
                      p: 0.7,
                      borderRadius: 4,
                      display: "inline-block",
                      mb: 1,
                    }}
                  >
                    <Row>
                      <InputBase
                        value={newRegion}
                        onChange={(e) => setNewRegion(e.target.value)}
                        placeholder="Add region.."
                      />

                      {isAddingRegion ? (
                        <img src={spinner} width="40" alt="ldr 1" />
                      ) : (
                        <IconButton onClick={handleSubmitRegion}>
                          <Add
                            sx={{ borderRadius: "100%", p: 0.2 }}
                            className="bg-primary text-light"
                          />
                        </IconButton>
                      )}
                    </Row>
                  </Box>
                  {regions && regions.length > 0 ? (
                    <div>
                      <Typography
                        variant="button"
                        className="text-primary"
                        sx={{ fontWeight: "bold", display: "block" }}
                        gutterBottom
                      >
                        Registered regions
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", pt: 1 }}>
                        {regions.map((region, index) => (
                          <Button
                            key={index}
                            sx={{
                              mr: 0.2,
                              mt: 0.2,
                              color: "#808080",
                              borderColor: "#808080",
                            }}
                            size="small"
                            variant="outlined"
                            onClick={() => handleOpenModal(region)}
                          >
                            {region}
                          </Button>
                        ))}
                      </Box>
                      <div style={{ display: "block" }}>
                        <Typography className="text-primary" variant="caption">
                          click a region for more actions
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <Typography
                      variant="caption"
                      className="text-dark"
                      sx={{ fontWeight: "bold", display: "block" }}
                      gutterBottom
                    >
                      No regions registered yet.
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ mt: 0.8 }} />
                <Box mt={2} mx={1}>
                  <Typography
                    variant="button"
                    className="text-primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Add Journey Route
                  </Typography>
                  <Row styles={{ mt: 2 }}>
                    <FormControl>
                      <InputLabel id="fromR">From</InputLabel>
                      {regions.length > 0 && (
                        <Select
                          labelId="fromR"
                          value={journeyInfo.from}
                          label="From"
                          onChange={(e) => changeFromTo(e.target.value)}
                          size="small"
                        >
                          {regions.map((region, index) => {
                            return (
                              <MenuItem key={index} value={region}>
                                {region}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    </FormControl>
                    {journeyInfo.from && regions.length > 1 ? (
                      <FormControl sx={{ ml: 1 }}>
                        <InputLabel id="toR">To</InputLabel>
                        <Select
                          labelId="toR"
                          value={journeyInfo.to}
                          label="to"
                          onChange={(e) =>
                            jDispatch({
                              type: "setTo",
                              payload: e.target.value,
                            })
                          }
                          size="small"
                        >
                          {journeyInfo.from &&
                            toRegions.map((region, index) => (
                              <MenuItem key={index} value={region}>
                                {region}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </Row>
                  <TextField
                    id="standard"
                    label="route map link"
                    variant="standard"
                    type="text"
                    size="small"
                    sx={{ my: 1 }}
                    value={journeyInfo.routeMap}
                    onChange={(e) =>
                      jDispatch({
                        type: "setMap",
                        payload: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id="standard"
                    label="Price (Tsh)"
                    variant="standard"
                    type="number"
                    size="small"
                    sx={{ my: 1 }}
                    value={journeyInfo.price}
                    onChange={(e) =>
                      jDispatch({
                        type: "setPrice",
                        payload: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id="standard"
                    label="Distance (Km)"
                    variant="standard"
                    size="small"
                    type="number"
                    sx={{ my: 1 }}
                    value={journeyInfo.distance}
                    onChange={(e) =>
                      jDispatch({
                        type: "setDistance",
                        payload: e.target.value,
                      })
                    }
                  />
                  <Typography
                    className="text-primary"
                    variant="body2"
                    sx={{ mt: 2 }}
                    gutterBottom
                  >
                    Available rounds per day
                  </Typography>
                  <Box>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isFirstRoundChecked}
                              onChange={handleRoundsChange}
                              name="1st round"
                            />
                          }
                          label="1st round (06:00am)"
                        />
                      </FormGroup>
                    </FormControl>
                    {isFirstRoundChecked && (
                      <Row styles={{ marginBottom: 1 }}>
                        <Typography sx={{ color: "#747474" }}>
                          Bus type:
                        </Typography>
                        <Select
                          value={getBusType("first_round")}
                          sx={{ ml: 1 }}
                          label="busType"
                          onChange={(e) =>
                            jDispatch({
                              type: "setBusType",
                              payload: {
                                title: e.target.name,
                                busType: e.target.value,
                              },
                            })
                          }
                          size="small"
                          name="1st round"
                          variant="standard"
                        >
                          <MenuItem value="2 By 2">2 By 2</MenuItem>
                          <MenuItem value="2 By 3">2 By 3</MenuItem>
                        </Select>
                      </Row>
                    )}

                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isSecondRoundChecked}
                              onChange={handleRoundsChange}
                              name="2nd round"
                            />
                          }
                          label="2nd round (08:00am)"
                        />
                      </FormGroup>
                    </FormControl>
                    {isSecondRoundChecked && (
                      <Row styles={{ marginBottom: 1 }}>
                        <Typography sx={{ color: "#747474" }}>
                          Bus type:
                        </Typography>
                        <Select
                          value={getBusType("second_round")}
                          sx={{ ml: 1 }}
                          label="btype"
                          onChange={(e) =>
                            jDispatch({
                              type: "setBusType",
                              payload: {
                                title: e.target.name,
                                busType: e.target.value,
                              },
                            })
                          }
                          size="small"
                          name="2nd round"
                          variant="standard"
                        >
                          <MenuItem value="2 By 2">2 By 2</MenuItem>
                          <MenuItem value="2 By 3">2 By 3</MenuItem>
                        </Select>
                      </Row>
                    )}
                  </Box>
                  {isAddingRoute ? (
                    <Row>
                      <img src={spinner} width="40" alt="ldr 2" />
                      <Typography variant="caption" className="text-primary">
                        adding route.........
                      </Typography>
                    </Row>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2, fontWeight: "bold" }}
                      className="grd-to-bottom-right"
                      onClick={handleSaveRoute}
                      fullWidth
                    >
                      Save Route
                    </Button>
                  )}
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Paper sx={{ p: 1, borderRadius: 4 }}>
                <Box mx={1}>
                  <Typography
                    variant="button"
                    className="text-primary"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    View Journey Routes
                  </Typography>

                  <Typography className="text-primary" variant="caption">
                    (Select a region)
                  </Typography>
                  <Box mt={2}>
                    <Row>
                      {" "}
                      {regions && (
                        <FormControl>
                          <InputLabel id="toR">From</InputLabel>
                          <Select
                            labelId="toR"
                            value={routeCategory}
                            label="Age"
                            sx={{ minWidth: 50 }}
                            onChange={(e) =>
                              handleRoutesFetching(e.target.value)
                            }
                            size="small"
                          >
                            {[...regions, "all"].map((region) => (
                              <MenuItem key={region} value={region}>
                                {region}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      <Divider
                        sx={{ mx: 1.5, my: 0.2, bgcolor: "#f0f0f4" }}
                        orientation="vertical"
                        flexItem
                      />
                      <Button
                        onClick={() => handleRoutesFetching("all")}
                        sx={{ color: "#5f5f5f", bgcolor: "#e9e9ed" }}
                      >
                        all routes
                      </Button>
                    </Row>
                    <Box mt={2}>
                      <Divider />

                      <Row>
                        {" "}
                        <Typography
                          className="text-primary"
                          variant="body2"
                          sx={{ my: 1, fontWeight: "bold" }}
                          gutterBottom
                        >
                          {routeCategory} routes
                        </Typography>{" "}
                        <Typography
                          sx={{ ml: 1, mr: 1, color: "#98989b" }}
                          variant="body2"
                        >
                          Total:
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {routes.length}
                          </span>
                        </Typography>
                        {isFetchingRoutes && (
                          <img src={spinner} width="40" alt="ldr 5" />
                        )}
                      </Row>
                      <TableContainer component={Box}>
                        <Table aria-label="today's tickets">
                          {routes.length > 0 && (
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <span className="font-bold">#Sno</span>
                                </TableCell>
                                <TableCell align="left">
                                  <span className="font-bold">From</span>
                                </TableCell>
                                <TableCell align="left">
                                  <span className="font-bold">To</span>
                                </TableCell>
                                <TableCell align="left">
                                  <span className="font-bold">Price(Tsh)</span>
                                </TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            </TableHead>
                          )}

                          <TableBody>
                            {routes.length > 0 &&
                              routes.map((route, index) => (
                                <TableRow key={route._id}>
                                  <TableCell align="left">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">
                                    {route.from}
                                  </TableCell>
                                  <TableCell align="left">{route.to}</TableCell>
                                  <TableCell align="left">
                                    {Number(route.price).toFixed()}
                                  </TableCell>
                                  <TableCell align="left">
                                    <IconButton
                                      onClick={() => handleEditRoute(route._id)}
                                    >
                                      <Edit className="text-primary" />{" "}
                                    </IconButton>{" "}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Routes;
