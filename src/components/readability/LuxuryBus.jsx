import React,{useState} from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { updateSelectedTickets } from '../../store/features/ticketbooking';
import { leftBusColumn, luxuryBusColumn } from '../utils/resourceData';
const LuxuryBus = () => {
    const dispatch = useDispatch()
  const {selectedTickets,takenTickets} = useSelector(state => state.booking)

  //handling customer details for each selected ticket.................
const [currentTicket,setCurrentTicket] = useState({})
  //end of handling customer details for each selected ticket.................

  const handleTicketClick = (ticketNumber)=>{
    
     if(selectedTickets.some(ticket=>ticket.ticketNumber === ticketNumber)){
       //ticket unselected.....removing it from selected tickets list....
       const newTicketsList = selectedTickets.filter(ticket=>ticket.ticketNumber !== ticketNumber)
       dispatch(updateSelectedTickets(newTicketsList));
      }else{
        //ticket selected.....adding it to selected tickets list....
        let tickets = selectedTickets;
        tickets = [...tickets,{ticketNumber}]
        dispatch(updateSelectedTickets(tickets));

      }

  }

  const getTicketClass = (ticketNumber)=>{
    let isInTakenTickets = takenTickets.some(ticket=>ticket.ticketNumber === ticketNumber)
    if (isInTakenTickets) return "taken-seat";
    let isInSelectedTickets = selectedTickets.some(ticket=>ticket.ticketNumber === ticketNumber)
    if (isInSelectedTickets) return "selected-seat";

    return "available-seat";

  }

    return (
      <>
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
                key={ticketNumber}
                className={getTicketClass(ticketNumber)}
              >
                {ticketNumber}
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
                onClick={() => handleTicketClick(ticketNumber)}
                key={ticketNumber}
                className={getTicketClass(ticketNumber)}
              >
                {ticketNumber}
              </Button>
            ))}
          </Stack>
        </Grid>
      </>
    );
}
 
export default LuxuryBus;