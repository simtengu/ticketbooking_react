import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
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
  Typography,
} from "@mui/material";
import DashboardItem from "../../components/admin/DashboardItem";
import { Print, RemoveRedEye } from "@mui/icons-material";
const Tickets = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box>
        <Stack direction="row" columnGap={2} flexWrap="wrap">
          <Button
            sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
            className="text-secondary font-bold"
          >
            today's tickets
          </Button>
          <Button
            sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
            className="text-secondary font-bold"
            onClick={handleClickOpen}
          >
            Specify route
          </Button>
          <Button
            sx={{ m: 1, color: "#dfc400", fontWeight: "bold" }}
            className="text-secondary font-bold"
          >
            ticket postponements
          </Button>
        </Stack>
        {/* route specification dialog............................ */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Choose a route to fetch tickets from
          </DialogTitle>
          <DialogContent>
            <List sx={{ pt: 0 }}>
              <ListItem>
                <FormControl fullWidth>
                  <Select
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
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <Select
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

              </ListItem>
              <ListItem>
                <Button variant="contained" fullWidth className="bg-primary" sx={{mt:1}} >Fetch</Button>

              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
        {/* end of route specification dialog............................ */}
        <Box mt={2} ml={2}>
          <Typography variant="body1" className="text-primary" sx={{ mb: 2 }}>
            Booked Tickets
          </Typography>

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
};

export default Tickets;
