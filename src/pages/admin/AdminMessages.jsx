import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { publicApi } from "../../api";
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const rs = await publicApi.get("/admin/messages");
      const rsData = rs.data;
      setLoading(false);
      if (rs.status === 200) {
        setMessages(rsData);
       
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchMessages()
  }, []);


  if (loading) return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" />
        </Grid>{" "}
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Skeleton sx={{ minHeight: { xs: 300 } }} variant="rectangular" />
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <>
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
                <span className="font-bold">Message</span>
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {messages && messages.map((msg) => {
              return (
                <TableRow key={msg._id}>
                  <TableCell align="left">{msg.firstName}</TableCell>
                  <TableCell align="left">{msg.lastName}</TableCell>
                  <TableCell align="left">{msg.email}</TableCell>
                  <TableCell align="left">{msg.message}</TableCell>
         
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminMessages;
