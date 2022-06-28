import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
const Hero = () => {
  let regions = [
    "tabora",
    "Iringa",
    "Katavi",
    "Dar es salaam",
    "Arusha",
    "Dodoma",
    "Mbeya",
    "Mwanza",
    "Tanga",
  ];
  return (
    <>
      <Container sx={{ mt: 10,pb:4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={8}>
            <Box mx={3}>
              <center>
                <Typography variant="h5" className="text-light">
                  We provide the best transport services in Tanzania.
                </Typography>
                <Typography variant="body2" className="text-light" gutterBottom>
                  For a nice, comfortable, cheap, wonderful and safe journey we
                  are the one and only option for you.
                </Typography>

                <Typography
                  variant="h1"
                  className="text-secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Travel with Us
                </Typography>
              </center>
            </Box>
            <Box mt={3}>
              <Paper sx={{ p: 4, borderRadius: 7 }}>
                <center>
                  <Typography
                    className="text-primary"
                    variant="button"
                    sx={{ fontWeight: "bold" }}
                    gutterbuttom
                  >
                    Tell us about your journey
                  </Typography>{" "}
                </center>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
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
                        <Typography variant="body1" className="text-primary">
                          ....To....
                        </Typography>
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
                    </Grid>
                    <Grid item xs={12} md={6} alignSelf="center">
                      <center>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mx: 1 }}
                          className="grd-to-bottom-right"
                        >
                          submit
                        </Button>
                      </center>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              <center>
                  <Typography mt={1} variant="body1" className="text-secondary">
                Fill and submit this form to get your ticket now.
              </Typography>   
              </center>
           
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Hero;
