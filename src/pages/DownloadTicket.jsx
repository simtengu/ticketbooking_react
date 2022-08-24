import { DoubleArrow, Download, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Row from "../components/utils/Row";
import no_result from "../assets/noresults.JPG";
import { useSelector } from "react-redux";

const DownloadTicket = () => {
  const { passengerBookedTickets } = useSelector((state) => state.booking);
  return (
    <>
      <Container sx={{ py: 2, minHeight: "60vh" }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={10} lg={9}>
            <Paper sx={{ borderRadius: 3, p: 3 }}>
              {passengerBookedTickets.length > 0 ? (
                <Box>
                  <center>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold" }}
                      className="signupText"
                    >
                      Tickets
                    </Typography>
                  </center>

                  <Grid container justifyContent="center">
                    <Grid item xs={12} md={9}>
                      <Box sx={{ mt: 3 }}>
                        {/* ticket container................................ */}
                        {passengerBookedTickets.map((ticket) => (
                          <Box sx={{my:1}} key={ticket._id}>
                            <Grid container sx={{ mb: 1 }} spacing={1}>
                              <Grid item xs={12} sm={11} md={10} sx={{ p: 1 }}>
                                <Box
                                  className="grd-to-bottom-right"
                                  sx={{ borderRadius: 2, p: 2 }}
                                >
                                  <TableContainer component={Box}>
                                    <Table sx={{ width: "100%" }}>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                variant="body1"
                                              >
                                                Name:
                                              </Typography>
                                              <Typography
                                                sx={{ ml: 1 }}
                                                variant="body1"
                                                className="text-light"
                                              >
                                                {ticket.owner.name}
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                          <TableCell
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                variant="body1"
                                              >
                                                Gender:
                                              </Typography>
                                              <Typography
                                                sx={{ ml: 1 }}
                                                variant="body1"
                                                className="text-light"
                                              >
                                                {ticket.owner.gender}
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                variant="body1"
                                              >
                                                Price:
                                              </Typography>
                                              <Typography
                                                sx={{ ml: 1 }}
                                                variant="body1"
                                                className="text-light"
                                              >
                                                {Intl.NumberFormat(
                                                  "en-US"
                                                ).format(
                                                  Number(ticket.price)
                                                )}{" "}
                                                Tsh
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                          <TableCell
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                variant="body1"
                                              >
                                                Seat Number:
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  ml: 1,
                                                  color: "purple",
                                                  fontWeight: "bold",
                                                }}
                                                variant="h6"
                                              >
                                                {ticket.ticketNumber}
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell
                                            colSpan={2}
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                variant="body1"
                                              >
                                                Journey route:
                                              </Typography>
                                              <Typography
                                                sx={{ ml: 1 }}
                                                variant="body1"
                                                className="text-light"
                                              >
                                                {ticket.from}{" "}
                                                <span style={{ color: "#ffed6c" }}>
                                                  to
                                                </span>{" "}
                                                {ticket.to}
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell
                                            colSpan={2}
                                            sx={{ py: 1 }}
                                            align="left"
                                          >
                                            <Row>
                                              <Typography
                                                sx={{ color: "#ffed6c" }}
                                                varian="body1"
                                              >
                                                Departing Date:
                                              </Typography>
                                              <Typography
                                                sx={{ ml: 1 }}
                                                variant="body1"
                                                className="text-light"
                                              >
                                                {new Date(
                                                  ticket.departingDate
                                                ).toDateString()}
                                                ,{ticket.round.split(" ")[2]}
                                              </Typography>
                                            </Row>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>

                                  <Stack
                                    sx={{ mt: 1 }}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Typography variant="body2">
                                        <i>
                                          <Phone color="primary" />
                                        </i>{" "}
                                      </Typography>
                                      <Typography
                                        sx={{ ml: 1 }}
                                        variant="body2"
                                      >
                                        0710162838
                                      </Typography>
                                    </Stack>
                                    <Stack
                                      sx={{ ml: 2 }}
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Typography variant="body2">
                                        <i>
                                          <Phone color="primary" />
                                        </i>{" "}
                                      </Typography>
                                      <Typography
                                        sx={{ ml: 1 }}
                                        variant="body2"
                                      >
                                        0625772838
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={1} md={2}>
                                <Stack
                                  sx={{ height: "100%" }}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Button
                                    sx={{
                                      boxShadow: "1px 1px 3px grey",
                                      borderRadius: 3,
                                      p: { xs: 2, md: 4 },
                                      "&:hover": { bgcolor: "#ffde07" },
                                    }}
                                  >
                                    <Download className="text-primary" />
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                            <Divider />
                          </Box>
                        ))}

                        {/* end of ticket container......................... */}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1.5em", sm: "1.8em" },
                    }}
                    className="signupText"
                  >
                    No tickets available
                  </Typography>
                  <img src={no_result} alt="no result" />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DownloadTicket;
