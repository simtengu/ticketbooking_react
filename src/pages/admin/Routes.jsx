import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import Row from "../../components/utils/Row";
const Routes = () => {
  const [isFirstRoundChecked, setFirstRound] = useState(false);
  const [isSecondRoundChecked, setSecondRound] = useState(false);
  const [routeRounds, setRouteRounds] = useState([]);

  const handleRoundsChange = (e) => {
    const name = e.target.name;
    if (name === "first round") {
      console.log("its first round")
      if (isFirstRoundChecked) {
        console.log("unchecked")
        //1st round unchecked...removing it from the list of availble rounds.... 
        let newList = routeRounds.filter(round=>round.title !== name);

        setRouteRounds(newList)
      } else {
        console.log("checked ")
        setRouteRounds([...routeRounds,{title:"first round",time:"06:00am"}])
      
      }

      setFirstRound(!isFirstRoundChecked);

    } else {
      console.log("its second round")
      if (isSecondRoundChecked) {
        console.log("unchecked");
        //2nd round unchecked...removing it from the list of availble rounds....
        let newList = routeRounds.filter((round) => round.title !== name);
        setRouteRounds(newList);
      } else {
        console.log("checked")
         setRouteRounds([
           ...routeRounds,
           { title: "second round", time: "08:00am" },
         ]);
      }
      setSecondRound(!isSecondRoundChecked);
    }

  };

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6" className="text-primary" sx={{ mb: 2 }}>
          Manage Regions & Routes
        </Typography>

        <Grid container>
          <Grid item xs={12} md={5}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <Box
                  className="bg-light-cyan"
                  sx={{
                    p: 0.7,
                    borderRadius: 4,
                    display: "inline-block",
                    mb: 1,
                  }}
                >
                  <Row>
                    <InputBase placeholder="Add region.." />
                    <IconButton>
                      <Add
                        sx={{ borderRadius: "100%", p: 0.2 }}
                        className="bg-primary text-light"
                      />
                    </IconButton>
                  </Row>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Box mt={2} mx={1}>
                  <Typography
                    variant="button"
                    className="text-primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Add Journey Route
                  </Typography>
                  <Row styles={{ mt: 2 }}>
                    <FormControl>
                      <InputLabel id="fromR">From</InputLabel>
                      <Select
                        labelId="fromR"
                        value={10}
                        label="Age"
                        onChange={() => console.log("hello")}
                        size="small"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ ml: 1 }}>
                      <InputLabel id="toR">To</InputLabel>
                      <Select
                        labelId="toR"
                        value={10}
                        label="Age"
                        onChange={() => console.log("hello")}
                        size="small"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Row>
                  <TextField
                    id="standard"
                    label="Price (Tsh)"
                    variant="standard"
                    size="small"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    id="standard"
                    label="Distance (Km)"
                    variant="standard"
                    size="small"
                    sx={{ my: 1 }}
                  />
                  <Typography
                    className="text-primary"
                    variant="body2"
                    sx={{ mt: 2 }}
                    gutterBottom
                  >
                    Available rounds per day
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 1 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isFirstRoundChecked}
                              onChange={handleRoundsChange}
                              name="first round"
                            />
                          }
                          label="1st round (06:00am)"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isSecondRoundChecked}
                              onChange={handleRoundsChange}
                              name="second round"
                            />
                          }
                          label="2nd round (08:00am)"
                        />
                      </FormGroup>
                      <FormHelperText>Check all that applies </FormHelperText>
                    </FormControl>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2,fontWeight:"bold" }}
                    className="grd-to-bottom-right"
                    onClick={() => console.log(routeRounds)}
                    fullWidth
                  >
                    Save Route
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Paper sx={{ p: 1, borderRadius: 4 }}>
                <Box mx={1}>
                  <Typography
                    variant="button"
                    className="text-primary"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    View Journey Routes
                  </Typography>

                  <Typography className="text-primary" variant="caption">
                    (Select a region)
                  </Typography>
                  <Box mt={2}>
                    <FormControl>
                      <InputLabel id="toR">To</InputLabel>
                      <Select
                        labelId="toR"
                        value={10}
                        label="Age"
                        onChange={() => console.log("hello")}
                        size="small"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <Box mt={2}>
                      <Divider />

                      <Typography
                        className="text-primary"
                        variant="body2"
                        sx={{ my: 1, fontWeight: "bold" }}
                      >
                        Arusha routes
                      </Typography>
                      <TableContainer component={Box}>
                        <Table aria-label="today's tickets">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <span className="font-bold">#Sno</span>
                              </TableCell>
                              <TableCell align="left">
                                <span className="font-bold">From</span>
                              </TableCell>
                              <TableCell align="left">
                                <span className="font-bold">To</span>
                              </TableCell>
                              <TableCell align="left">
                                <span className="font-bold">Price(Tsh)</span>
                              </TableCell>
                              <TableCell>&nbsp;</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="left">1</TableCell>
                              <TableCell align="left">arusha</TableCell>
                              <TableCell align="left">morogoro</TableCell>
                              <TableCell align="left">30000</TableCell>
                              <TableCell align="left">
                                <IconButton>
                                  <Edit className="text-primary" />{" "}
                                </IconButton>{" "}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Routes;
