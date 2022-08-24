import React, { useState } from "react";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hookes/useAuth";
import { updateSelectedTickets } from "../../store/features/ticketbooking";
import { leftBusColumn, normalBusColumn } from "../utils/resourceData";
import { useNavigate } from "react-router-dom";
import Row from "../utils/Row";
import ConfirmationModal from "../utils/ConfirmationModal";
const ThreeByTwoBus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedTickets,
    takenTickets,
    routeInfo: { from, to },
  } = useSelector((state) => state.booking);

  const user = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleGoToLogin = () => {
    navigate("/login", { state: { from: `/journey/${from}/${to}` } });
  };

  const handleTicketClick = (ticketNumber) => {
    if (!user.email) {
      setIsLoginModalOpen(true);
      return;
    }
    if (
      selectedTickets.some((ticket) => ticket.ticketNumber === ticketNumber)
    ) {
      //ticket unselected.....removing it from selected tickets list....
      const newTicketsList = selectedTickets.filter(
        (ticket) => ticket.ticketNumber !== ticketNumber
      );
      dispatch(updateSelectedTickets(newTicketsList));
    } else {
      //ticket selected.....adding it to selected tickets list....
      let tickets = selectedTickets;
      tickets = [...tickets, { ticketNumber }];
      dispatch(updateSelectedTickets(tickets));
    }
  };

  const getTicketClass = (ticketNumber) => {
    let isInTakenTickets = takenTickets.some(
      (ticket) => ticket.ticketNumber == ticketNumber
    );
    if (isInTakenTickets) return "taken-seat";
    let isInSelectedTickets = selectedTickets.some(
      (ticket) => ticket.ticketNumber == ticketNumber
    );
    if (isInSelectedTickets) return "selected-seat";

    return "available-seat";
  };

  return (
    <>
      {/* authentication alert modal */}
      {isLoginModalOpen && (
        <ConfirmationModal
          heading="To proceed forward, please login first"
          middleParagraph="go to login page now"
          closeModal={() => setIsLoginModalOpen(false)}
          handleConfirmAction={handleGoToLogin}
        />
      )}
      {/* end of authentication alert modal */}

      <Grid item xs={4}>
        <Box>
          <Grid container>
            {leftBusColumn.map((ticketNumber) => (
              <Grid key={ticketNumber} item xs={6}>
                <Box className="bus-row">
                  <Button
                    sx={{ width: "97%" }}
                    onClick={() => handleTicketClick(ticketNumber)}
                    className={getTicketClass(ticketNumber)}
                    disabled={
                      takenTickets.some(
                        (ticket) => ticket.ticketNumber == ticketNumber
                      )
                        ? true
                        : false
                    }
                  >
                    {takenTickets.some(
                      (ticket) => ticket.ticketNumber == ticketNumber
                    )
                      ? "taken"
                      : ticketNumber}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        <Box>
          <Grid container>
            {normalBusColumn.map((ticketNumber) => (
              <Grid key={ticketNumber} item xs={4}>
                <Box className="bus-row">
                  <Button
                    sx={{ width: "97%" }}
                    onClick={() => handleTicketClick(ticketNumber)}
                    className={getTicketClass(ticketNumber)}
                    disabled={
                      takenTickets.some(
                        (ticket) => ticket.ticketNumber == ticketNumber
                      )
                        ? true
                        : false
                    }
                  >
                    {takenTickets.some(
                      (ticket) => ticket.ticketNumber == ticketNumber
                    )
                      ? "taken"
                      : ticketNumber}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default ThreeByTwoBus;
