import React from "react";
import {Radio,RadioGroup,FormControlLabel,FormLabel,
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
import driver from "../assets/driver.png";
import bus from "../assets/bus3.gif";
import bus1 from "../assets/bus2.gif";
import { DoorFrontOutlined } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
let regions = [
  "tabora",
  "Iringa",
  "Katavi",
  "Dar es salaam",
  "Arusha",
  "Dodoma",
  "Mbeya",
  // "Mwanza",
  "Tanga",
];
const JourneyDetails = () => {
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const leftBusColumn = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const rightBusColumn = [
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40,
  ];
  const rightRuxuryBusColumn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container sx={{ mt: 10, pb: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={11}>
            <Paper sx={{ p: 0 }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={4}
                  className="bg-dark-primary"
                  sx={{ p: 2 }}
                >
                  <Paper sx={{ mb: 1, minHeight: 200 }}>
                    <Paper className="bg-light-cyan" sx={{ p: 1 }}>
                      <Stack
                        direction="horizontal"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <TextField
                          select
                          label="From"
                          size="small"
                          margin="normal"
                          name="From"
                          value="Arusha"
                          onChange={() => {}}
                        >
                          {regions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <img src={bus} style={{ width: 100 }} alt="bus" />
                        <TextField
                          select
                          label="To"
                          size="small"
                          margin="normal"
                          name="From"
                          value="Arusha"
                          onChange={() => {}}
                        >
                          {regions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </Paper>
                    <Box sx={{ p: 1 }}>
                      <Typography
                        className="text-primary"
                        variant="button"
                        sx={{
                          mt: 1,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Your Ticket Numbers
                      </Typography>
                      <Box sx={{ py: 1, display: "flex", flexWrap: "wrap" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mx: 1 }}
                          className="bg-secondary"
                        >
                          4
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mx: 1 }}
                          className="bg-secondary"
                        >
                          14
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mx: 1 }}
                          className="bg-secondary"
                        >
                          48
                        </Button>
                      </Box>
                      <Divider />

                      <Box sx={{ pt: 1 }}>
                        <Typography
                          className="text-primary"
                          variant="button"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                          gutterBottom
                        >
                          Bus Type
                        </Typography>
                        <Typography
                          className="text-dark"
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                          gutterBottom
                        >
                          2 by 2 (luxury)
                        </Typography>

                        <Divider />
                      </Box>
                      <Box sx={{ pt: 1 }}>
                        <Typography
                          className="text-primary"
                          variant="button"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                          gutterBottom
                        >
                          Departing Time
                        </Typography>
                        <Typography
                          className="text-dark"
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                          gutterBottom
                        >
                          {new Date().toDateString()},06:00 AM
                        </Typography>

                        <Divider />
                      </Box>

                      <Button
                        sx={{ mt: 1, width: "100%" }}
                        variant="contained"
                        size="small"
                        className="grd-to-bottom-right"
                      >
                        confirm & pay
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8} className="journey-details-div">
                  <Box sx={{ p: 1.5 }}>
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
                      (use available options below to make a perfect setup for
                      your journey)
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
                            <td>Distance</td>
                          </tr>
                          <tr>
                            <td>Arusha</td>
                            <td>Dar Es Salaam</td>
                            <td>500km</td>
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

                      <Stack direction="row" spacing={1} alignItems="center">
                        <input
                          type="date"
                          style={{
                            padding: "11px 2px",
                            border: "1px solid #c4c4c4",
                            borderRadius: "6px",
                          }}
                        />
                        <TextField
                          select
                          label=""
                          size="small"
                          margin="normal"
                          name="From"
                          value="1'st Trip (06:00AM)"
                          onChange={() => {}}
                        >
                          <MenuItem value={`1'st Trip (06:00AM)`}>
                            {`1'st Trip (06:00AM)`}
                          </MenuItem>
                          <MenuItem value={`2'st Trip (08:00AM)`}>
                            {`2'st Trip (08:00AM)`}
                          </MenuItem>
                        </TextField>
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
                        gutterBottom
                      >
                        Bus Type & Price
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Bus Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={20}
                            onChange={() => "aos"}
                            label="Bus Type"
                          >
                            <MenuItem value={10}>2 By 2 (luxury)</MenuItem>
                            <MenuItem value={20}>3 by 2 (normal)</MenuItem>
                          </Select>
                        </FormControl>
                        <Stack
                          sx={{ ml: 2 }}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ mb: 0.2, color: "#6b6b6b" }}
                          >
                            Price
                          </Typography>
                          <Chip
                            sx={{ fontWeight: "bold" }}
                            size="small"
                            label="20,000 Tsh"
                            className="bg-secondary"
                          />
                        </Stack>
                      </Stack>
                    </Box>
                    <Divider />
                    <Box py={2}>
                      <center>
                        <Typography
                          className="text-primary"
                          variant="button"
                          sx={{
                            textTransform: "",
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                          gutterBottom
                        >
                          It's time to select your ticket(s)
                        </Typography>
                      </center>
                      <Grid container justifyContent="center">
                        <Grid item xs={11} md={7}>
                          {/* tickets form....................... */}
                          <Box my={2} className="bus">
                            <Grid container alignItems="flex-end">
                              <Grid item xs={5} sx={{ px: 0.3 }}>
                                <Button
                                  variant="outlined"
                                  className="text-primary"
                                  sx={{ my: 1, width: "100%" }}
                                  startIcon={<DoorFrontOutlined />}
                                >
                                  Door
                                </Button>
                              </Grid>
                              <Grid item xs={2}></Grid>
                              <Grid item xs={5} sx={{ px: 0.3 }}>
                                <Paper
                                  className="bg-light-cyan"
                                  sx={{ p: 1, my: 1 }}
                                >
                                  <center>
                                    <Typography sx={{ color: "#448fda" }}>
                                      Driver
                                    </Typography>
                                  </center>
                                </Paper>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={5}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-around"
                                  flexWrap="wrap"
                                  className="bus-row"
                                >
                                  {leftBusColumn.map((item) => (
                                    <Button key={item} className="taken-seat">
                                      {item}
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
                                  {rightBusColumn.map((item) => (
                                    <Button className="yours-seat" key={item}>
                                      {item}
                                    </Button>
                                  ))}
                                </Stack>
                              </Grid>
                            </Grid>
                          </Box>
                          {/* end of tickets form....................... */}
                        </Grid>
                      </Grid>
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
                            add passenger details for a ticket
                          </Typography>
                          <Typography
                            className="text-dark"
                            variant="caption"
                            sx={{ fontWeight: "bold", display: "block" }}
                            gutterBottom
                          >
                            (Click on a ticket to select it)
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
                          <Button
                            variant="outlined"
                            size="medium"
                            sx={{ mx: 1 }}
                            className="bg-secondary"
                          >
                            4
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mx: 1 }}
                            className="bg-secondary"
                          >
                            14
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mx: 1 }}
                            className="bg-secondary"
                          >
                            48
                          </Button>
                        </Box>
                        <Box py={2} px={1}>
                          <FormControl sx={{ m: 1 }}>
                            <Select
                              value={10}
                              size="small"
                              onChange={() => console.log("fd")}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText sx={{ p: 0, m: 0 }}>
                              Selected Ticket
                            </FormHelperText>
                          </FormControl>
                          <Box sx={{ mt: 1, ml: 1 }}>
                            <Button
                              variant="text"
                              size="small"
                              sx={{ fontWeight: "bold", color: "#22929b" }}
                            >
                              Click here
                            </Button>
                            <span>to use your details for this ticket.</span>
                            <br></br>
                            <TextField label="First Name" variant="standard" />
                            <br></br>
                            <TextField label="Last Name" variant="standard" />
                            <br></br>
                            <FormControl sx={{ mt: 2 }}>
                              <FormLabel id="demo-controlled-radio-buttons-group">
                                Gender
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value="male"
                                onChange={() => console.log("k")}
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
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default JourneyDetails;
