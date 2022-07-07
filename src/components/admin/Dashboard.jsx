import { RemoveRedEye } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import DashboardItem from "./DashboardItem";
const Dashboard = () => {
  return (
    <>
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
          <DashboardItem title="users" link="/aos" total="4" />
          <DashboardItem title="buses" link="/aos" total="13" />
          <DashboardItem title="regions" link="/aos" total="44" />
          <DashboardItem title="tickets" link="/aos" total="103" />
          <DashboardItem title="messages" link="/msgs" total="103" />
          <DashboardItem title="income" link="/msgs" total="$10m" />
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h6" className="text-primary" gutterbottom>
            Today's booked tickets
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="today's tickets">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="font-bold">Ticket Number</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">From</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">To</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">Passenger name</span>
                  </TableCell>
                  <TableCell align="left">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">hello</TableCell>
                  <TableCell align="left">aos</TableCell>
                  <TableCell align="left">paul</TableCell>
                  <TableCell align="left">adfdfa</TableCell>
                  <TableCell align="left"> <IconButton color="primary"><RemoveRedEye /> </IconButton> </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
