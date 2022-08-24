import React, { useState } from "react";
import { Button, Grid, Paper, Stack, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedTickets } from "../../store/features/ticketbooking";
import { leftBusColumn, luxuryBusColumn } from "../utils/resourceData";
import useAuth from "../../hookes/useAuth";
import Row from "../utils/Row";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../utils/ConfirmationModal";
const LuxuryBus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedTickets,
    takenTickets,
    routeInfo: { from, to },
    takenTicketsByRound,
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

      <Grid item xs={5}>
        <Stack
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
          className="bus-row"
        >
          {leftBusColumn.map((ticketNumber) => (
            <Button
              onClick={() => handleTicketClick(ticketNumber)}
              className={getTicketClass(ticketNumber)}
              key={ticketNumber}
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
          ))}
        </Stack>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <Stack
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
          className="bus-row"
        >
          {luxuryBusColumn.map((ticketNumber) => (
            <Button
              key={ticketNumber}
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
          ))}
        </Stack>
      </Grid>
    </>
  );
};

export default LuxuryBus;
