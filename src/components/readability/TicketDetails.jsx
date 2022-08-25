import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { DoorFrontOutlined } from "@mui/icons-material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LuxuryBus from "./LuxuryBus";
import ThreeByTwoBus from "./ThreeByTwoBus";
import FeedbackMessage from "../utils/FeedbackMessage";
import {
  setBusType,
  setRound,
  setTakenTickets,
  updateDepartingDate,
  updateSelectedTickets,
} from "../../store/features/ticketbooking";
import useAuth from "../../hookes/useAuth";
import {
  activateFeedback,
  deActivateFeedback,
  openModal,
} from "../../store/features/errorAndFeedback";
import Modal from "../utils/Modal";
const TicketDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedTickets,
    takenTickets,
    departingDate: dptDate,
    takenTicketsByRound,
    round,
  } = useSelector((state) => state.booking);
  const authUser = useAuth();
  //component's state section ...............................................
  const {
    booking,
    feedback: { isModalOpen },
  } = useSelector((state) => state);
  const initialDate = dptDate ? new Date(dptDate) : new Date();
  const [departingDate, setDepartingDate] = useState(initialDate);
  const [today, setToday] = useState(new Date());

  const isBookingOpen = () => {
    let bookingTime = today.getTime();
    let dptDayTime = departingDate.getTime();

    let dptDate = parseInt(departingDate.getDate());
    let dptMonth = parseInt(departingDate.getMonth()) - 1;
    let dptYear = parseInt(departingDate.getFullYear());

    //for ticket booking on the same date to departing date............ (checking if time is up)
    if (today.toLocaleDateString() === departingDate.toLocaleDateString()) {
      let dptExactTime =
        round == "1st round (06:00am)"
          ? new Date(dptYear, dptMonth, dptDate, 5, 30)
          : new Date(dptYear, dptMonth, dptDate, 7, 30);

      dptExactTime = dptExactTime.getTime();
      if (bookingTime > dptExactTime) return false;
      return true;
    }
    //for ticket booking on different date to departing date............ (checking if time is up)

    if (bookingTime > dptDayTime) return false;
    return true;
  };

  //end of component's state section ...............................................

  //handling customer details for each selected ticket.................
  const [currentTicket, setCurrentTicket] = useState({});
  //end of handling customer details for each selected ticket.................

  const handleChangeRound = (selected_round) => {
    const round = booking.routeInfo.perDayRounds.find(
      (round) => round.round === selected_round
    );
    const tknTickets =
      selected_round === "1st round (06:00am)"
        ? takenTicketsByRound.roundOneTickets
        : takenTicketsByRound.roundTwoTickets;
    dispatch(setRound(selected_round));
    dispatch(setBusType(round.busType));
    dispatch(updateSelectedTickets([]));
    dispatch(setTakenTickets(tknTickets));
  };

  //handle use logged in user details for a current selected ticket...............
  const handleUseAuthUserDetails = () => {
    setCurrentTicket({
      ...currentTicket,
      phone: authUser.phone,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      gender: authUser.gender,
    });
  };

  //handling passenger details saving for a current ticket.....................
  const handleSavePassengerDetails = () => {
    if (
      !currentTicket.firstName ||
      !currentTicket.lastName ||
      !currentTicket.phone
    ) {
      dispatch(
        activateFeedback({
          status: "error",
          message: "Form is not complete... fill all fields first",
        })
      );
      return;
    }
    if (currentTicket.phone.length != 10) {
      dispatch(
        activateFeedback({
          status: "error",
          message: "Phone number must contain exactly 10 numbers",
        })
      );
      return;
    }

    let tickets = selectedTickets;
    tickets = tickets.map((ticket) => {
      //override a current ticket which is in selected tickets list with current details(..passenger's info)
      if (ticket.ticketNumber === currentTicket.ticketNumber)
        return currentTicket;
      return ticket;
    });

    //updating redux store...............
    dispatch(updateSelectedTickets(tickets));
    dispatch(
      activateFeedback({
        status: "success",
        message: `You have saved passenger's details for ticket number ${currentTicket.ticketNumber} successfully`,
      })
    );
  };

  //handle confirm payment button................................
  const handleMakePayment = () => {
    //checking if all tickets are filled with all neccessary information.........
    const areAllTicketsComplete = selectedTickets
      .map((ticket) => (ticket.phone ? true : false))
      .every((item) => item === true);
    if (!areAllTicketsComplete) {
      dispatch(
        activateFeedback({
          status: "error",
          message: `Please add passenger details for each seat you have selected`,
        })
      );
      return;
    }
    navigate("/tickets/payment");
  };

  useEffect(() => {
    return () => {
      dispatch(deActivateFeedback());
    };
  }, []);

  return (
    <Box>
      <FeedbackMessage />
      <Typography
        className="text-dark-secondary"
        variant="h5"
        sx={{
          mt: 1,
          mb: 0,
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        View & Setup your journey
      </Typography>
      <Typography
        className="text-dark"
        variant="caption"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        (use available options below to make a perfect setup for your journey)
      </Typography>
      <Box my={2}>
        <Typography
          className="text-primary"
          variant="body1"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Route Selected
        </Typography>
        <table>
          <tbody>
            <tr className="text-light grd-to-bottom">
              <td>Starting From</td>
              <td>Ending At</td>
              <td>Distance (Km)</td>
              <td>Price (Tsh)</td>
            </tr>
            <tr>
              <td>{booking.routeInfo.from}</td>
              <td>{booking.routeInfo.to}</td>
              <td>{booking.distance}</td>
              <td>
                {Intl.NumberFormat("en-US").format(Number(booking.price))}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography
          className="text-primary"
          variant="body1"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Departing Date & Time
        </Typography>

        <Stack direction="column" spacing={1}>
          <Box>
            <Typography variant="caption" className="text-primary">
              {" "}
              Date format: (mm/dd/yyyy)
            </Typography>
            <DatePicker
              selected={departingDate}
              onChange={(date) => {
                setDepartingDate(date);
                dispatch(updateDepartingDate(date.toISOString()));
              }}
            />
            <Typography
              variant="body2"
              className="text-dark"
              sx={{ fontWeight: "bold" }}
            >
              {new Date(departingDate).toDateString()}
            </Typography>
          </Box>
          <Box>
            {booking.routeInfo.perDayRounds &&
            booking.routeInfo.perDayRounds.length > 1 ? (
              <TextField
                select
                label=""
                size="small"
                margin="normal"
                name="From"
                value={booking.round}
                onChange={(e) => handleChangeRound(e.target.value)}
                variant="standard"
              >
                {booking.routeInfo.perDayRounds.map((round, index) => {
                  return (
                    <MenuItem key={index} value={round.round}>
                      {round.round}
                    </MenuItem>
                  );
                })}
              </TextField>
            ) : (
              <Box>
                <Typography>{booking.round}</Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography
          className="text-primary"
          variant="body1"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          Bus Type
        </Typography>

        <Typography variant="caption" sx={{ position: "relative", bottom: 6 }}>
          (depends on round / session)
        </Typography>
        <Typography variant="body1">{booking.busType}</Typography>
      </Box>
      <Divider />
      <Box py={2}>
        <center>
          <Typography
            className={isBookingOpen() ? `text-primary` : `text-danger`}
            variant="button"
            sx={{
              textTransform: "",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            gutterBottom
          >
            {isBookingOpen()
              ? "It's time to select your seat(s)"
              : "Booking already closed for this day"}
          </Typography>
        </center>

        <Grid container justifyContent="center">
          <Grid item xs={11} md={7}>
            {/* tickets form....................... */}
            <Box
              my={2}
              sx={{
                border: isBookingOpen()
                  ? "2px solid #31b0bb"
                  : "2px solid #d20015",
              }}
              className="bus"
            >
              <Grid container alignItems="flex-end">
                <Grid item xs={5} sx={{ px: 0.3 }}>
                  <Button
                    variant="outlined"
                    className="text-primary"
                    sx={{
                      my: 1,
                      width: booking.busType === "2 By 2" ? "100%" : "80%",
                    }}
                    startIcon={<DoorFrontOutlined />}
                  >
                    Door
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5} sx={{ px: 0.3 }}>
                  <Paper className="bg-light-cyan" sx={{ p: 1, my: 1 }}>
                    <center>
                      <Typography sx={{ color: "#448fda" }}>Driver</Typography>
                    </center>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container>
                {booking.busType === "2 By 2" ? (
                  <LuxuryBus />
                ) : (
                  <ThreeByTwoBus />
                )}
              </Grid>
            </Box>
            {/* end of tickets form....................... */}
          </Grid>
        </Grid>
        {isBookingOpen() && selectedTickets.length > 0 ? (
          <Box mt={4}>
            <center>
              <Typography
                className="text-primary"
                variant="button"
                sx={{
                  textTransform: "",
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                add passenger details for each seat
              </Typography>
              <Typography
                className="text-dark"
                variant="caption"
                sx={{ fontWeight: "bold", display: "block" }}
                gutterBottom
              >
                (Click on a seat number to select it)
              </Typography>
            </center>
            <Box
              sx={{
                mt: 2,
                ml: 1,
                py: 1,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {selectedTickets.length > 0 &&
                selectedTickets.map((ticket) => {
                  return (
                    <Button
                      key={ticket.ticketNumber}
                      variant={ticket.phone ? "contained" : "outlined"}
                      size="medium"
                      color={ticket.phone ? "success" : "primary"}
                      sx={{ mr: 1, mt: 0.5 }}
                      onClick={() => {
                        setCurrentTicket({ ...ticket, gender: "male" });
                        dispatch(openModal());
                      }}
                    >
                      {ticket.ticketNumber}
                    </Button>
                  );
                })}
            </Box>
            {currentTicket.ticketNumber && (
              <div>
                {isModalOpen && (
                  <Modal
                    columnSize={{ md: 4, lg: 4 }}
                    contentAlignment="flex-start"
                  >
                    <Paper elevation={6} sx={{ p: 3, borderRadius: 4 }}>
                      <Box py={2} px={1}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          Selected seat number: {currentTicket.ticketNumber}
                        </Typography>
                        <Typography
                          className="text-primary"
                          variant="body1"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            mt: 2,
                          }}
                          gutterBottom
                        >
                          Passenger's details
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          {authUser.email && (
                            <div>
                              <Button
                                variant="text"
                                size="small"
                                sx={{
                                  fontWeight: "bold",
                                  color: "#22929b",
                                  mx: 0,
                                  px: 0,
                                }}
                                onClick={handleUseAuthUserDetails}
                              >
                                Click here
                              </Button>
                              <span style={{ marginLeft: 3 }}>
                                to use your own details for this seat.
                              </span>
                            </div>
                          )}

                          <TextField
                            label="First Name"
                            variant="standard"
                            value={currentTicket.firstName || ""}
                            onChange={(e) =>
                              setCurrentTicket({
                                ...currentTicket,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <br></br>
                          <TextField
                            label="Last Name"
                            variant="standard"
                            value={currentTicket.lastName || ""}
                            onChange={(e) =>
                              setCurrentTicket({
                                ...currentTicket,
                                lastName: e.target.value,
                              })
                            }
                          />
                          <br></br>
                          <FormControl sx={{ mt: 2 }}>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                              Gender
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={currentTicket.gender}
                              onChange={(e) =>
                                setCurrentTicket({
                                  ...currentTicket,
                                  gender: e.target.value,
                                })
                              }
                            >
                              <FormControlLabel
                                value="female"
                                control={<Radio sx={{ color: "#22929b" }} />}
                                label="Female"
                              />
                              <FormControlLabel
                                value="male"
                                control={<Radio sx={{ color: "#22929b" }} />}
                                label="Male"
                              />
                            </RadioGroup>
                          </FormControl>
                          <br></br>
                          <TextField
                            label="Phone Number"
                            variant="standard"
                            value={currentTicket.phone || ""}
                            onChange={(e) =>
                              setCurrentTicket({
                                ...currentTicket,
                                phone: e.target.value,
                              })
                            }
                          />
                          <Box mt={2}>
                            <Button
                              size="medium"
                              variant="outlined"
                              className="text-primary"
                              sx={{
                                borderRadius: 10,
                                fontFamily: "roboto",
                                color: "#158a93",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                              onClick={handleSavePassengerDetails}
                            >
                              save passenger's details
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Modal>
                )}
              </div>
            )}

            <Box mt={8}>
              <center>
                <Button
                  size="large"
                  className="grd-primary"
                  sx={{
                    borderRadius: 10,
                    fontFamily: "roboto",
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "linear-gradient(to top, #158a93, #75c8ce)",
                    },
                  }}
                  onClick={handleMakePayment}
                >
                  Confirm & Make Payment
                </Button>
              </center>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default TicketDetails;
