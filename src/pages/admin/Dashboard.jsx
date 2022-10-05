import React, { useEffect, useState } from "react";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Grid,
  Table,
  Paper,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DashboardItem from "../../components/admin/DashboardItem";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import { activateFeedback } from "../../store/features/errorAndFeedback";
import {
  fetchDashboardDetails
} from "../../store/features/profile";
import Row from "../../components/utils/Row";
import useAuth from "../../hookes/useAuth"
import {useNavigate} from "react-router-dom"
const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    tickets,
    dashboardCounts: {
      ticketsCount,
      usersCount,
      totalIncome,
      regionsCount,
      messagesCount,
      busesCount,
    },
  } = useSelector((state) => state.profile);

  const [todayTickets, setTodayTickets] = useState(tickets ? tickets : []);
  const [isLoading, setIsloading] = useState(true);
  const [todayIncome, setTodayIncome] = useState(0);

  //redirecting no admin users................ 
  const authUser = useAuth()
  useEffect(() => {
    if(authUser.role !== 111){
navigate("/admin/user/account");
    }

  }, [authUser])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await dispatch(fetchDashboardDetails());

        setIsloading(false);
      } catch (error) {
        dispatch(
          activateFeedback({
            status: "error",
            message: error.message
              ? error.message
              : "something went wrong while fetching data..",
          })
        );
        setIsloading(false);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    let inc = tickets.reduce((acc, ticket) => {
      return acc + ticket.price;
    }, 0);
    setTodayTickets(tickets);
    setTodayIncome(inc);
  }, [tickets]);

  if (isLoading) {
    return (
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Skeleton
              sx={{ height: { xs: 50, md: 100 } }}
              variant="rectangular"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 10 }}>
          <Grid item xs={10} sm={8} md={5}>
            <Skeleton variant="rectangular" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" />
          </Grid>{" "}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Skeleton sx={{ minHeight: { xs: 300 } }} variant="rectangular" />
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <>
      <FeedbackMessage />
      <Box>
        <Box
          sx={{
            display: "inline-block",
            p: 1,
            borderRadius: "0px 20px 20px 0px",
            mb: 2,
            mx: 2,
          }}
          className="bg-secondary"
        >
          <Typography className="text-light" sx={{ fontWeight: "bold" }}>
            Admin Dashboard
          </Typography>
        </Box>
        <Grid container>
          <DashboardItem
            title={usersCount > 1 ? "Users" : "User"}
            link="/admin/users"
            total={usersCount}
          />
          <DashboardItem
            title={busesCount > 1 ? "Buses" : "Bus"}
            link="/admin/buses"
            total={busesCount}
          />
          <DashboardItem
            title={regionsCount > 1 ? "Regions" : "Region"}
            link="/admin/routes"
            total={regionsCount}
          />
          <DashboardItem
            title={ticketsCount > 1 ? "Tickets" : "Ticket"}
            link="/admin/tickets"
            total={ticketsCount}
          />
          <DashboardItem
            title={messagesCount > 1 ? "Messages" : "Message"}
            link="/admin/admin_messages"
            total={messagesCount}
          />
          <DashboardItem
            title="Income(Tsh)"
            link="/admin/tickets"
            total={totalIncome}
          />
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h6" className="text-primary" gutterBottom>
            Today's booked tickets
          </Typography>
          <Box mt={1}>
            <Row>
              <Typography variant="caption">
                Tickets Count: {todayTickets.length}
              </Typography>
              {todayTickets.length > 0 && (
                <Typography sx={{ ml: 1 }} variant="caption">
                  Total Income:{" "}
                  {Intl.NumberFormat("en-US").format(Number(todayIncome))} Tsh
                </Typography>
              )}
            </Row>

            {todayTickets.length > 0 ? (
              <TableContainer sx={{ mt: 0.5 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="today's tickets">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span className="font-bold">Passenger name</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold">Phone</span>
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
                      <TableCell align="left">
                        <span className="font-bold">Departing Date</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayTickets.map((ticket, index) => {
                      let dptDate = new Date(ticket.departingDate);
                      let date = dptDate.toDateString();
                      return (
                        <TableRow key={index}>
                          <TableCell align="left">
                            {ticket.owner.name}
                          </TableCell>
                          <TableCell align="left">
                            {ticket.owner.phone}
                          </TableCell>
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
                          <TableCell align="left">{date}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <center>
                <Typography variant="body1" sx={{ mt: 3 }}>
                  No any ticket booked today was found.
                </Typography>
              </center>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
