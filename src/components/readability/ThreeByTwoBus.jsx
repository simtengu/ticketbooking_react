import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import { leftBusColumn, luxuryBusColumn, normalBusColumn } from "../utils/resourceData";
const ThreeByTwoBus = () => {
  return (
    <>
      <Grid item xs={4}>
        <Box>
          <Grid container>
            {leftBusColumn.map((item) => (
              <Grid key={item} item xs={6}>
                <Box className="bus-row">
                  <Button
                    sx={{ width: "97%" }}
                    className="taken-seat"
                  >
                    {item}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        <Box>
          <Grid container>
            {normalBusColumn.map((item) => (
              <Grid key={item} item xs={4}>
                <Box className="bus-row">
                  <Button
                    sx={{width: "97%" }}
                    className="yours-seat"
                  >
                    {item}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default ThreeByTwoBus;
