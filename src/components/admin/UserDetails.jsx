import React from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
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
import { Delete } from "@mui/icons-material";
const UserDetails = ({user}) => {
    return (
      <>
        <Paper elevation={10} sx={{ p: 2, borderRadius: 2 }}>
          <center>
       
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                className="text-primary"
                gutterBottom
              >
                User Details
              </Typography>
          
          </center>
          <TableContainer component={Box}>
            <Divider />
            <Table aria-label="today's tickets">
              <TableBody>
               
                  <>
                    <TableRow>
                      <TableCell align="left">
                        <b>First Name</b>
                      </TableCell>
                      <TableCell align="left">
                        {user.firstName}
                      </TableCell>
                      <TableCell align="left">
                        <b>Last Name</b>
                      </TableCell>
                      <TableCell align="left">
                        {user.lastName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <b>Email</b>
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">
                        <b>Phone Number</b>
                      </TableCell>
                      <TableCell align="left">{user.phone}</TableCell>
                    </TableRow>
                  </>
                
              </TableBody>
            </Table>
          </TableContainer>
          <IconButton color="error" sx={{ float: "right" }}>
            <Delete />
          </IconButton>
          <Box sx={{ mt: 6 }}>
            <Typography variant="body1" className="text-primary" gutterBottom>
              Recent activities
            </Typography>
            <Typography sx={{ my: 2, fontWeight: "bold" }} variant="body2">
              A user has not performed anything yet
            </Typography>
          </Box>
        </Paper>
      </>
    );
}
 
export default UserDetails;