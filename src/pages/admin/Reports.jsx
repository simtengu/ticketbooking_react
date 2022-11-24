import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Print } from "@mui/icons-material";
const Reports = () => {
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Box sx={{ p: 2 }}>
              <Paper sx={{ borderRadius: 3,p:0.5,width:{md:"60%"} }}>
                <Stack direction="row" justifyContent="center">
                  <Typography className="text-light-primary " variant="h6">
                   33
                  </Typography>
                  <Typography
                    className="text-light-primary "
                    variant="h6"
                    sx={{ p: 0,ml:0.5 }}
                  >
                    buses
                  </Typography>
                </Stack>
                <center>

               <IconButton><Print  className=" text-light-primary" /></IconButton> 
                </center>
              </Paper>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Reports;
