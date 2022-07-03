import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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

        <Box mt={10} ml={2}>
          <Typography variant="h6" className="text-primary">
            Today's booked tickets
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="left">Calories</TableCell>
                  <TableCell align="left">Fat&nbsp;(g)</TableCell>
                  <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="left">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                >
                  <TableCell align="left">hello</TableCell>
                  <TableCell align="left">aos</TableCell>
                  <TableCell align="left">paul</TableCell>
                  <TableCell align="left">adfdfa</TableCell>
                  <TableCell align="left">what now</TableCell>
                </TableRow>
                <TableRow
                >
                  <TableCell align="left">hello</TableCell>
                  <TableCell align="left">aos</TableCell>
                  <TableCell align="left">paul</TableCell>
                  <TableCell align="left">adfdfa</TableCell>
                  <TableCell align="left">what now</TableCell>
                </TableRow>
                <TableRow
                 
                >
                  <TableCell align="left">hello</TableCell>
                  <TableCell align="left">aos</TableCell>
                  <TableCell align="left">paul</TableCell>
                  <TableCell align="left">adfdfa</TableCell>
                  <TableCell align="left">what now</TableCell>
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
