import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import payment from "../assets/payment.png";
import pypl from "../assets/pypl.JPG";
import { Payments } from "@mui/icons-material";
import Row from "../components/utils/Row";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookingTicket } from "../store/features/ticketbooking";
import FeedbackMessage from "../components/utils/FeedbackMessage";
import {
  activateFeedback,
  deActivateFeedback,
} from "../store/features/errorAndFeedback";
import ConfirmationModal from "../components/utils/ConfirmationModal";
import { responsiveness as rsp } from "../styles/responsiveness";
const MakePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTickets } = useSelector((state) => state.booking);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isConfirmPaymentOpen, setIsConfirmPaymentOpen] = useState(false);

  const handleAcceptMakePayment = async () => {
    setIsConfirmPaymentOpen(false);
    try {
      await dispatch(bookingTicket());
      setIsPaymentDone(true);
    } catch (error) {
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      dispatch(activateFeedback({ status: "error", message: error_message }));
    }
  };
  const handleSubmitPayment = () => {
    //checking if there are tickets selected and filled

    //checking if all tickets are filled with all neccessary information.........
    if (selectedTickets.length < 1) {
      dispatch(
        activateFeedback({
          status: "error",
          message: `It seems like you have not selected any seat yet.`,
        })
      );
      return;
    }

    const areAllTicketsComplete = selectedTickets
      .map((ticket) => (ticket.phone ? true : false))
      .every((item) => item === true);
    if (!areAllTicketsComplete) {
      dispatch(
        activateFeedback({
          status: "error",
          message: `It seems like you have not filled all details for each seat you've selected.`,
        })
      );
      return;
    }
    setIsConfirmPaymentOpen(true);
  };

  useEffect(() => {
    return () => {
      dispatch(deActivateFeedback());
    };
  }, []);
  return (
    <>
      {isConfirmPaymentOpen && (
        <ConfirmationModal
          heading="You are about to make payment for your ticket"
          middleParagraph=" proceed with payment"
          closeModal={() => setIsConfirmPaymentOpen(false)}
          handleConfirmAction={handleAcceptMakePayment}
        />
      )}
      <FeedbackMessage />
      <Container sx={{ py: 10, minHeight: "60vh" }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={9} lg={8}>
            <Paper sx={{ borderRadius: 3, p: 3 }}>
              <center>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2.3rem", md: "2.7rem" },
                  }}
                  className="signupText"
                >
                  Make Payment
                </Typography>
              </center>
              <Box sx={{ p: 1, mt: 4 }}>
                <Grid container justifyContent="center">
                  <Grid item xs={11}>
                    {isPaymentDone && (
                      <Box
                        sx={{
                          p: 2,
                          mb: 2,
                        }}
                      >
                        <Alert sx={{ mb: 1.4 }} severity="success">
                          <AlertTitle>Payment received successfully</AlertTitle>
                          Use the download button below to download a pdf copy
                          of your ticket
                        </Alert>
                        <center>
                          <Button
                            color="success"
                            variant="contained"
                            size="large"
                            sx={{
                              textTransform: "capitalize",
                              "&:hover": { borderRadius: 12 },
                            }}
                            onClick={() => navigate("/tickets/download")}
                          >
                            download ticket here
                          </Button>
                        </center>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Stack>
                      <Button
                        sx={{
                          mb: 0.5,
                          textTransform: "lowercase",
                          "&:hover": { backgroundColor: "#64c0c8" },
                        }}
                        onClick={handleSubmitPayment}
                      >
                        <Paper
                          sx={{
                            borderRadius: 2,
                            width: "100%",
                            p: 1.2,
                          }}
                        >
                          <Row styles={{ justifyContent: "center" }}>
                            <Payments className="text-primary" />

                            <Typography
                              sx={{ ml: 0.4, fontWeight: "bold" }}
                              variant="h5"
                            >
                              FakePay
                            </Typography>
                          </Row>
                        </Paper>
                      </Button>
                      <Button
                        onClick={() =>
                          window.alert("WE ARE STILL WORKING ON THIS PART")
                        }
                        sx={{
                          mb: 0.5,
                          "&:hover": { backgroundColor: "#64c0c8" },
                        }}
                      >
                        <Paper
                          sx={{
                            borderRadius: 2,
                            width: "100%",
                            p: 1.2,
                          }}
                        >
                          <img src={pypl} alt="paypal" style={{ width: 100 }} />
                        </Paper>
                      </Button>
                      <Button
                        onClick={() =>
                          window.alert("WE ARE STILL WORKING ON THIS PART")
                        }
                        sx={{
                          textTransform: "lowercase",
                          "&:hover": { backgroundColor: "#64c0c8" },
                        }}
                      >
                        <Paper
                          sx={{
                            borderRadius: 2,
                            width: "100%",
                            p: 1.2,
                          }}
                        >
                          <Typography
                            sx={{ color: "#6772e5", fontWeight: "bold" }}
                            variant="h5"
                          >
                            Stripe
                          </Typography>
                        </Paper>
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={1}></Grid>
                  <Grid item xs={12} md={6}>
                    <img
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827582/payment_ogfhkv.png"
                      alt="paypal"
                      style={{ width: "95%" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MakePayment;
