import React from "react";
import {
  Box,
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
import DashboardItem from "../../components/admin/DashboardItem";
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

          {/* <DashboardItem title="buses" link="/aos" total="13" />
          <DashboardItem title="regions" link="/aos" total="44" />
          <DashboardItem title="tickets" link="/aos" total="103" />
          <DashboardItem title="messages" link="/msgs" total="103" />
          <DashboardItem title="income" link="/msgs" total="$10m" /> */}
        </Grid>
      </Box>
    </>
  );
};

export default Reports;
