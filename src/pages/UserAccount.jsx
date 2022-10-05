import React,{useEffect} from "react";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dp from "../assets/dp.png";
import useAuth from "../hookes/useAuth";
import {useSelector,useDispatch} from "react-redux"
import { DirectionsBus } from "@mui/icons-material";
import { unSetSelectedUser } from "../store/features/profile";
import Row from "../components/utils/Row";
import { useNavigate } from "react-router-dom";
const UserAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.profile);
  let auth_user = useAuth();
  let user = selectedUser || auth_user;

  //redirecting  admin to dashboard................
  useEffect(() => {
    if (auth_user.role === 111) {
      navigate("/admin/dashboard");
    }
  }, [auth_user]);

  useEffect(() => {
    return () => {
      dispatch(unSetSelectedUser());
    };
  });

  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={7} md={2}>
              <img src={dp} alt="dp" style={{ width: "95%" }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={1}>
                <Typography variant="h5" sx={{ color: "#78756f" }} gutterBottom>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography sx={{ color: "#78756f" }}>{user.email}</Typography>
                <Typography sx={{ color: "#78756f" }}>{user.phone}</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#78756f", mt: 1 }}
                  gutterBottom
                >
                  {`${user.tickets.length} Ticket${
                    user.tickets.length > 1 ? "s" : ""
                  }`}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box mt={10}>
            <Typography className="text-primary" variant="h6" gutterBottom>
              Booked tickets
            </Typography>
            {user.tickets.length > 0 ? (
              <TableContainer sx={{ mt: 0.5 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="today's tickets">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span className="font-bold">#Sno:</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold">Booking Date</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold">Departing Date</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold">From</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold">To</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="font-bold">Ticket Number</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold">Ticket Price (Tsh)</span>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span className="font-bold">Ticket Status</span>{" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.tickets.map((ticket, index) => {
                      let bookingDate = new Date(
                        ticket.createdAt
                      ).toDateString();
                      let now = new Date();
                      now = now.getTime();
                      let dptDate = new Date(ticket.departingDate);
                      let date = dptDate.toDateString();
                      return (
                        <TableRow key={index}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{bookingDate}</TableCell>
                          <TableCell align="left">{date}</TableCell>

                          <TableCell align="left">{ticket.from}</TableCell>

                          <TableCell align="left">{ticket.to}</TableCell>
                          <TableCell align="left">
                            {ticket.ticketNumber}
                          </TableCell>
                          <TableCell align="left">
                            {Intl.NumberFormat("en-US").format(
                              Number(ticket.price)
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Row>
                              <DirectionsBus
                                color={
                                  now > dptDate.getTime() ? "action" : "success"
                                }
                              />
                              <Typography
                                color={
                                  now > dptDate.getTime() ? "grey" : "green"
                                }
                              >
                                {now > dptDate.getTime() ? "off" : "on"}
                              </Typography>
                            </Row>{" "}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <center>
                <Typography variant="body1" sx={{ mt: 3 }}>
                  {selectedUser
                    ? "This user has not booked any ticket yet."
                    : "You have not booked any ticket yet."}
                </Typography>
              </center>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserAccount;
