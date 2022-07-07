import React from 'react'; 
import {
  Box,
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
import { RemoveRedEye, Search } from '@mui/icons-material';
import spinner from "../../assets/spinner.gif"
const Users = () => {
    return (
      <>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" className="text-primary" sx={{ mb: 2 }}>
            System Users
          </Typography>
          <Box sx={{ bgcolor: "#fff" }}>
            <Box
              sx={{ m: 1, p: 0.6, display: "inline-block", borderRadius: 2 }}
              className="bg-light-cyan"
            >
              <Stack direction="row" alignItems="center">
                <InputBase placeholder="search user..." />{" "}
                <IconButton>
                  <Search color="primary" />
                </IconButton>
              </Stack>
              {/* <img src={spinner} width="30" /> */}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="today's tickets">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="font-bold">FirstName</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">LastName</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">Email</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">Phone</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="font-bold">Gender</span>
                    </TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">albert</TableCell>
                    <TableCell align="left">oscar</TableCell>
                    <TableCell align="left">albertsimtengu@gmail.com</TableCell>
                    <TableCell align="left">0784241177</TableCell>
                    <TableCell align="left">M</TableCell>
                    <TableCell align="left">
                      {" "}
                      <IconButton color="primary">
                        <RemoveRedEye />{" "}
                      </IconButton>{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
}
 
export default Users;