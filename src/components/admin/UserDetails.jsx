import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
const UserDetails = ({ user }) => {
  return (
    <>
      <Paper elevation={10} sx={{ p: 2, borderRadius: 2 }}>
        <center>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
            className="text-primary"
            gutterBottom
          >
            User Details
          </Typography>
        </center>
        <TableContainer component={Box}>
          <Divider />
          <Table aria-label="today's tickets">
            <TableBody>
              <>
                <TableRow>
                  <TableCell align="left">
                    <b>First Name</b>
                  </TableCell>
                  <TableCell align="left">{user.firstName}</TableCell>
                  <TableCell align="left">
                    <b>Last Name</b>
                  </TableCell>
                  <TableCell align="left">{user.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">
                    <b>Phone Number</b>
                  </TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableContainer>
        <IconButton color="error" sx={{ float: "right" }}>
          <Delete />
        </IconButton>
        <Box sx={{ mt: 6 }}>
          <Typography variant="body1" className="text-primary" gutterBottom>
            Recent activities
          </Typography>
          <Box>
            {user.tickets.length > 0 ? (
              <Box>
                {user.tickets.map((ticket, index) => {
                  let dt = new Date(ticket.createdAt);
                 
                     let bookingDate = dt.toDateString();
                  let dptDate = new Date(ticket.departingDate).toDateString()
                  return (
                    <TableContainer key={index} component={Paper}>
                      <Divider />
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={3} align="left">
                              <Typography variant="body1">
                                <b>Booked a ticket</b>
                              </Typography>
                            </TableCell>

                            <TableCell colSpan={2} align="left">
                              <b>{bookingDate}</b>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>From: {ticket.from}</TableCell>
                            <TableCell>To: {ticket.to}</TableCell>
                            <TableCell>Ticket Number: {ticket.ticketNumber}</TableCell>
                            <TableCell>Ticket Fee: {ticket.price}</TableCell>
                            <TableCell>Departing Date: {dptDate}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  );
                })}
              </Box>
            ) : (
              <Typography sx={{ my: 2, fontWeight: "bold" }} variant="body2">
                A user has not performed anything yet
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default UserDetails;
