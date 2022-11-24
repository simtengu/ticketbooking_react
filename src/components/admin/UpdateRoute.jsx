import React, { useState, useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../assets/spinner.gif";
import { deleteRoute, editRoute } from "../../store/features/profile";
import Row from "../utils/Row";
import {
  activateFeedback,
  closeModal,
} from "../../store/features/errorAndFeedback";
import FeedbackMessage from "../utils/FeedbackMessage";
const UpdateRouteForm = ({ routeId, firstRoundStatus, secondRoundStatus }) => {
  const dispatch = useDispatch();
  const {
    feedback: { isLoading, isModalOpen },
    profile: { regions, routes },
  } = useSelector((state) => state);

  const [route, setRoute] = useState({});
  const [isFirstRoundChecked, setFirstRound] = useState(firstRoundStatus);
  const [isSecondRoundChecked, setSecondRound] = useState(secondRoundStatus);

  // useEffect(() => {
  //   setFirstRound(firstRoundStatus);
  // }, [firstRoundStatus]);
  // useEffect(() => {
  //   setSecondRound(secondRoundStatus);
  // }, [secondRoundStatus]);
  const [isDeletingRoute, setIsDeletingRoute] = useState(false);
  const [isUpdatingRoute, setIsUpdatingRoute] = useState(false);

  //journey state implementation...............................
  const [toRegions, setToRegions] = useState(
    regions.filter((region) => region !== route.from)
  );

  const initialJourneyInfo = {
    from: route.from,
    to: route.to,
    routeMap:route.routeMap,
    price: route.price,
    distance: route.distance,
    perDayRounds: route.perDayRounds,
  };
  const journeyReducer = (state, action) => {
    switch (action.type) {
      case "setFrom":
        return { ...state, from: action.payload };
      case "setTo":
        return { ...state, to: action.payload };
      case "setMap":
        return { ...state, routeMap: action.payload };
      case "setPrice":
        return { ...state, price: action.payload };
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
        // let targetedRound = rounds.find(
        //   (round) => round.title === action.payload.title
        // );
        // let targetedRoundIndex = rounds.findIndex(
        //   (round) => round.title === action.payload.title
        // );

        let updatedList = rounds.map((round) => {
          if (round.title === action.payload.title) {
            return { ...round, busType: action.payload.busType };
          } else {
            return { ...round };
          }
        });

        // rounds[targetedRoundIndex] = {
        //   ...targetedRound,
        //   busType: action.payload.busType,
        // };

        return { ...state, perDayRounds: updatedList };

      case "setRouteInfo":
        return { ...route };

      default:
        return state;
    }
  };

  const [journeyInfo, jDispatch] = useReducer(
    journeyReducer,
    initialJourneyInfo
  );

  //end of journey state implementation........................

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

  //update route destinations.........................
  const changeFromTo = (fromRegion) => {
    jDispatch({ type: "setFrom", payload: fromRegion });

    let newList = regions.filter((region) => region !== fromRegion);
    setToRegions(newList);
    jDispatch({ type: "setTo", payload: newList[0] });
  };

  //get value for 1st/2nd round bus types

  const getBusType = (route_round) => {
    let bus_type = "";
    if (route_round === "first_round") {
      let first_round = journeyInfo.perDayRounds.find(
        (round) => round.title === "1st round"
      );
      bus_type = first_round?.busType || "";
    } else {
      let second_round = journeyInfo.perDayRounds.find(
        (round) => round.title === "2nd round"
      );
      bus_type = second_round?.busType || "";
    }
    return bus_type;
  };

  //handling of change in bus type for both rounds.....................
  const handleChangeBusType = (bus_type, title) => {
    jDispatch({
      type: "setBusType",
      payload: {
        title: title,
        busType: bus_type,
      },
    });
  };
  //handle new journey route registration...............
  const handleEditRoute = async () => {
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
    setIsUpdatingRoute(true);
    await dispatch(
      editRoute({ updatedRoute: journeyInfo, route_id: route._id })
    );
    setIsUpdatingRoute(false);
  };

  //delete route................
  const handleDeleteRoute = async () => {
    setIsDeletingRoute(true);
    await dispatch(deleteRoute(route._id));
    setIsDeletingRoute(false);
    dispatch(closeModal());
  };

  useEffect(() => {
    jDispatch({ type: "setRouteInfo" });

    setRoute(() => {
      let rt = routes.find((route) => route._id === routeId);
      return rt;
    });
  }, []);

  if (!route.perDayRounds) {
    return <h3 className="text-secondary">loading.....</h3>;
  }
  return (
    <>
      <FeedbackMessage />

      <Card elevation={7} sx={{ p: 2, borderRadius: 3 }}>
        <Box mt={2} mx={1}>
          <Typography
            variant="button"
            className="text-primary"
            sx={{ fontWeight: "bold" }}
          >
            Edit Journey Route
          </Typography>
          {isUpdatingRoute && (
            <Row styles={{ marginTop: 1, marginBottom: 1 }}>
              <img src={spinner} width="40" alt="ldr i" />
              <Typography variant="caption" className="text-primary">
                Editing route......
              </Typography>
            </Row>
          )}

          {isDeletingRoute && (
            <Row styles={{ marginTop: 1, marginBottom: 1 }}>
              <img src={spinner} alt="ldr" width="40" />
              <Typography variant="caption" className="text-primary">
                deleting route.......
              </Typography>
            </Row>
          )}
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
            sx={{ my: 1, display: "block" }}
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
            sx={{ my: 1, display: "block" }}
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
            sx={{ my: 1, display: "block" }}
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
            <FormControl
              sx={{ display: "block" }}
              component="fieldset"
              variant="standard"
            >
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
                <Typography sx={{ color: "#747474" }}>Bus type:</Typography>
                <Select
                  value={isFirstRoundChecked && getBusType("first_round")}
                  sx={{ ml: 1 }}
                  label="busType"
                  onChange={(e) =>
                    handleChangeBusType(e.target.value, e.target.name)
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

            <FormControl
              sx={{ display: "block" }}
              component="fieldset"
              variant="standard"
            >
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
                <Typography sx={{ color: "#747474" }}>Bus type:</Typography>
                <Select
                  value={isSecondRoundChecked && getBusType("second_round")}
                  sx={{ ml: 1 }}
                  label="btype"
                  onChange={(e) =>
                    handleChangeBusType(e.target.value, e.target.name)
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
          <Row styles={{ marginTop: 1.5 }}>
            <Button
              onClick={handleEditRoute}
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
              onClick={handleDeleteRoute}
            >
              delete
            </Button>
          </Row>
        </Box>
      </Card>
    </>
  );
};

export default UpdateRouteForm;
