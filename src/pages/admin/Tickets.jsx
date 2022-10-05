import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Modal from "../../components/utils/Modal";
import Row from "../../components/utils/Row";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateFeedback,
  closeModal,
  deActivateFeedback,
  openModal,
} from "../../store/features/errorAndFeedback";
import { fetchTickets, fetchRegions } from "../../store/features/profile";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
const Tickets = () => {
  const {
    feedback: { isModalOpen },
    profile: { regions, tickets, ticketsCount },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [fromR, setFromR] = useState("");
  const [toR, setToR] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isFetchingTickets, setIsFetchingTickets] = useState(true);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isDateRangeFilterOpen, setIsDateRangeFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [filterStr, setFilterStr] = useState("");
  const getTickets = async (filterOptions) => {
    //closing the modal first.....
    dispatch(closeModal());
    const { fromRegion, toRegion, departingDate, rangeLimit, pageNumber,activeOnly,inActiveOnly } =
    filterOptions;
    let filterString = "aos=nothing";
    if (fromRegion) filterString += `&fromRegion=${fromRegion}`;
    if (toRegion) filterString += `&toRegion=${toRegion}`;
    if (departingDate) filterString += `&departingDate=${departingDate}`;
    if (rangeLimit) filterString += `&rangeLimit=${rangeLimit}`;
    if (activeOnly) filterString += `&activeOnly=active`;
    if (inActiveOnly) filterString += `&inActiveOnly=inactive`;
    //pagination setting....
    if (pageNumber) {
      filterString = `${filterStr}&page=${pageNumber}`;
    } else {
      setPage(1)
      setFilterStr(filterString);
      filterString += `&page=1`;
    }
    setIsFetchingTickets(true);
    await dispatch(fetchTickets(filterString));
    setIsFetchingTickets(false);
    setFromR("");
    setToR("");
  };

  //fetch tickets by date range....
  const handleFetchByDateRange = () => {
    if (dateRange.from === "" || dateRange.to === "") {
      dispatch(
        activateFeedback({
          status: "error",
          message:
            "Please specify range of dates from which tickets will be fetched",
        })
      );
      return;
    }
    let fOptions = {};
    let filterString = "";
    if (fromR) {
      filterString += `From ${fromR} `;
      fOptions.fromRegion = fromR;
    }
    if (toR) {
      filterString += `To ${toR}`;
      fOptions.toRegion = toR;
    }
    filterString += `: Date range: ${dateRange.from.toDateString()} - To - ${dateRange.to.toDateString()}`;
    setFilterCategory(filterString);
    fOptions.departingDate = dateRange.from.getTime();
    fOptions.rangeLimit = dateRange.to.getTime();
    getTickets(fOptions);
  };

  const [page, setPage] = useState(1);
  const handlePagination = (event, value) => {
    setPage(value);
    getTickets({ pageNumber: value });
  };

  useEffect(() => {
    const getRegions = async () => {
      await dispatch(fetchRegions());
    };
    getRegions();
    getTickets({});
    return () => {
      dispatch(deActivateFeedback());
    };
  }, []);

  return (
    <>
      <FeedbackMessage />
      {isModalOpen && (
        <Modal columnSize={{ md: 4, lg: 4 }} contentAlignment="flex-start">
          <motion.div animate={{ translateY: 0 }} initial={{ translateY: -67 }}>
            <Paper elevation={10} sx={{ p: 2, borderRadius: 2 }}>
              {regions.length > 1 ? (
                <div>
                  <Typography
                    className="text-primary"
                    variant="body1"
                    sx={{ fontWeight: "510", fontSize: { xs: 14, md: 18 } }}
                    gutterBottom
                  >
                    Use below filters to fetch tickets
                  </Typography>
                  <Row styles={{ marginTop: 2, marginBottom: 1 }}>
                    <Row>
                      <Typography className="text-primary" variant="body1">
                        From
                      </Typography>
                      <FormControl sx={{ ml: 1.4 }}>
                        <Select
                          value={fromR}
                          label="from region"
                          onChange={(e) => setFromR(e.target.value)}
                          size="small"
                        >
                          {regions.map((region) => (
                            <MenuItem key={region} value={region}>
                              {region}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Row>
                    <Row styles={{ marginLeft: 2 }}>
                      <Typography className="text-primary" variant="body1">
                        To
                      </Typography>
                      <FormControl sx={{ ml: 1.4 }}>
                        <Select
                          value={toR}
                          label="to region"
                          onChange={(e) => setToR(e.target.value)}
                          size="small"
                        >
                          {regions
                            .filter((region) => region !== fromR)
                            .map((region) => (
                              <MenuItem key={region} value={region}>
                                {region}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Row>
                  </Row>
                  <Divider />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mr: 0.2,
                        my: 0.3,
                        color: "#158aa0",
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        let filterString = "";
                        let fOptions = {};
                        if (fromR) {
                          filterString += `From ${fromR} `;
                          fOptions.fromRegion = fromR;
                        }
                        if (toR) {
                          filterString += `To ${toR}`;
                          fOptions.toRegion = toR;
                        }

                        filterString += " - All";
                        setFilterCategory(filterString);
                        getTickets(fOptions);
                      }}
                    >
                      All
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mr: 0.2,
                        my: 0.3,
                        color: "#158aa0",
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        let filterString = "";
                        let fOptions = {};
                        if (fromR) {
                          filterString += `From ${fromR} `;
                          fOptions.fromRegion = fromR;
                        }
                        if (toR) {
                          filterString += `To ${toR}`;
                          fOptions.toRegion = toR;
                        }
                        fOptions.departingDate = new Date().getTime();
                        filterString += " - Today's";
                        setFilterCategory(filterString);
                        getTickets(fOptions);
                      }}
                    >
                      Today
                    </Button>
                    <Box sx={{ display: "inline-block", position: "relative" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 0.2,
                          my: 0.3,
                          color: "#158aa0",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          if (isDateRangeFilterOpen) {
                            setIsDateRangeFilterOpen(false);
                          }
                          setIsDateFilterOpen(!isDateFilterOpen);
                        }}
                      >
                        Date
                      </Button>
                      {isDateFilterOpen && (
                        <Paper
                          sx={{
                            p: 1,
                            position: "absolute",
                            bottom: -45,
                            zIndex: 100,
                          }}
                        >
                          <Input
                            onChange={(e) => {
                              let dt = new Date(e.target.value);
                              let filterString = "";
                              let fOptions = {};
                              if (fromR) {
                                filterString += `From ${fromR} `;
                                fOptions.fromRegion = fromR;
                              }
                              if (toR) {
                                filterString += `To ${toR}`;
                                fOptions.toRegion = toR;
                              }
                              fOptions.departingDate = dt.getTime();
                              filterString += `  ${dt.getDate()}/${
                                dt.getMonth() + 1
                              }/${dt.getFullYear()}`;
                              setFilterCategory(filterString);
                              getTickets(fOptions);
                            }}
                            type="date"
                          />
                        </Paper>
                      )}
                    </Box>
                    <Box sx={{ display: "inline-block", position: "relative" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 0.2,
                          my: 0.3,
                          color: "#158aa0",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          if (isDateFilterOpen) {
                            setIsDateFilterOpen(false);
                          }
                          setIsDateRangeFilterOpen(!isDateRangeFilterOpen);
                        }}
                      >
                        Date Range
                      </Button>
                      {isDateRangeFilterOpen && (
                        <Paper
                          sx={{
                            p: 1,
                            position: "absolute",
                            top: 38,
                            zIndex: 100,
                          }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Typography
                              className="text-primary"
                              variant="body1"
                            >
                              From
                            </Typography>
                            <Input
                              sx={{ ml: 1 }}
                              onChange={(e) =>
                                setDateRange({
                                  ...dateRange,
                                  from: new Date(e.target.value),
                                })
                              }
                              type="date"
                            />
                          </Stack>

                          <Row styles={{ marginTop: 1 }}>
                            <Typography
                              className="text-primary"
                              sx={{ flexGrow: 1 }}
                              variant="body1"
                            >
                              To
                            </Typography>
                            <Input
                              sx={{ ml: 1 }}
                              onChange={(e) =>
                                setDateRange({
                                  ...dateRange,
                                  to: new Date(e.target.value),
                                })
                              }
                              type="date"
                            />
                          </Row>
                          <Button
                            className="grd-primary"
                            fullWidth
                            sx={{
                              mt: 1,
                              color: "white",
                              textTransform: "capitalize",
                            }}
                            onClick={handleFetchByDateRange}
                          >
                            get tickets
                          </Button>
                        </Paper>
                      )}
                    </Box>
                    
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 0.2,
                          my: 0.3,
                          color: "#158aa0",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          let filterString = "";
                          let fOptions = {};
                          if (fromR) {
                            filterString += `From ${fromR} `;
                            fOptions.fromRegion = fromR;
                          }
                          if (toR) {
                            filterString += `To ${toR}`;
                            fOptions.toRegion = toR;
                          }
                          fOptions.activeOnly = "active";
                          filterString += " Only Active";
                          setFilterCategory(filterString);
                          getTickets(fOptions);
                        }}
                      >
                        Active only
                      </Button>
                 
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 0.2,
                          my: 0.3,
                          color: "#158aa0",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          let filterString = "";
                          let fOptions = {};
                          if (fromR) {
                            filterString += `From ${fromR} `;
                            fOptions.fromRegion = fromR;
                          }
                          if (toR) {
                            filterString += `To ${toR}`;
                            fOptions.toRegion = toR;
                          }
                          fOptions.inActiveOnly = "inactive";
                          filterString += " Only Inactive";
                          setFilterCategory(filterString);
                          getTickets(fOptions);
                        }}
                      >
                        inactive only
                      </Button>
                    
                  </Box>
                </div>
              ) : (
                <center className="text-primary">loading..............</center>
              )}
            </Paper>
          </motion.div>
        </Modal>
      )}

      <Box>
        <Paper>
          <Stack direction="row" columnGap={2} flexWrap="wrap">
            <Button
              sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
              className="text-secondary font-bold"
              onClick={() => {
                let fOptions = {};
                fOptions.departingDate = new Date().getTime();
                let filterString = "Today's";
                setFilterCategory(filterString);
                getTickets(fOptions);
              }}
            >
              today's tickets
            </Button>
            <Button
              sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
              className="text-secondary font-bold"
              onClick={() => {
                if (isDateFilterOpen) {
                  setIsDateFilterOpen(false);
                }
                if (isDateRangeFilterOpen) {
                  setIsDateRangeFilterOpen(false);
                }
                dispatch(openModal());
              }}
            >
              Custom Filter
            </Button>
            <Button
              sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
              className="text-secondary font-bold"
            >
              ticket postponements
            </Button>
          </Stack>
        </Paper>
        {isFetchingTickets ? (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
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
                <Skeleton
                  sx={{ minHeight: { xs: 300 } }}
                  variant="rectangular"
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box mt={4}>
            <Typography variant="body1" className="text-primary">
              {filterCategory} Tickets
            </Typography>
            <Typography variant="caption">
              Total Count: {ticketsCount}
            </Typography>
            {tickets.length > 0 ? (
              <TableContainer sx={{ mt: 0.5 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="today's tickets">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span className="font-bold">Sno:</span>
                      </TableCell>
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
                    {tickets.map((ticket, index) => {
                      let dptDate = new Date(ticket.departingDate);
                      let date = dptDate.toDateString();
                      return (
                        <TableRow key={index}>
                          <TableCell align="left">
                            {index + 1 + 30 * (page - 1)}
                          </TableCell>
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
                  No tickets for the period specified
                </Typography>
              </center>
            )}
          </Box>
        )}
        {ticketsCount / 30 > 1 && (
          <Box mt={2}>
            <center>
              <Pagination
                variant="outlined"
                color="primary"
                shape="rounded"
                count={Math.ceil(ticketsCount / 30)}
                page={page}
                onChange={handlePagination}
              />
            </center>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Tickets;
