import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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

import { RemoveRedEye, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import { fetchUsers, searchUser } from "../../store/features/profile";
import Modal from "../../components/utils/Modal";
import { openModal } from "../../store/features/errorAndFeedback";
import UserDetails from "../../components/admin/UserDetails";
import spinner from "../../assets/spinner.gif";
const Users = () => {
  const dispatch = useDispatch();
  const {
    feedback: { isLoading, isModalOpen },
    profile: { users },
  } = useSelector((state) => state);
  const [selected_user, setSelectedUser] = useState("");
  const [isSearchingUser, setIsSearchingUser] = useState(false);

  const handleOpenModal = (user_id) => {
    const user = users.find((user) => user._id === user_id);
    setSelectedUser(user);
    dispatch(openModal());
  };

  const handleSearchUser = async (searchValue) => {
    if (searchValue.trim().length > 0) {
      setIsSearchingUser(true);
      await dispatch(searchUser(searchValue.trim()));
      setIsSearchingUser(false);
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
   
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {/* feedback message............................. */}
      {isModalOpen && (
        <Modal columnSize={{ md: 7, lg: 7 }} contentAlignment="flex-start">
          <UserDetails user={selected_user} />
        </Modal>
      )}

      <FeedbackMessage />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" className="text-primary" sx={{ mb: 2 }}>
          System Users
        </Typography>
        <Box sx={{ bgcolor: "#fff" }}>
          <Stack direction="row" alignItems="center">
            <Box
              sx={{ m: 1, p: 0.6, display: "inline-block", borderRadius: 2 }}
              className="bg-light-cyan"
            >
              <Stack direction="row" alignItems="center">
                <InputBase
                  onChange={(e) => handleSearchUser(e.target.value)}
                  placeholder="search user..."
                />

                {isSearchingUser ? (
                  <img src={spinner} width="40" />
                ) : (
                  <IconButton>
                    <Search color="primary" />
                  </IconButton>
                )}
              </Stack>
            </Box>
            <Button
              className="text-primary"
              variant="text"
              onClick={() => dispatch(fetchUsers())}
            >
              fetch all Users
            </Button>
          </Stack>

          <Typography sx={{ ml: 1, mt: 2, color: "#98989b" }} gutterBottom>
            Users Count: <span style={{fontWeight:"bold"}}>{users.length}</span> 
          </Typography>
          {users.length < 1 ? (
            <center>
              <Box my={10} py={10}>
                <h3 className="text-primary">
                  There are no users at the moment.
                </h3>
              </Box>
            </center>
          ) : (
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
                  {users.map((user) => {
                    return (
                      <TableRow key={user._id}>
                        <TableCell align="left">{user.firstName}</TableCell>
                        <TableCell align="left">{user.lastName}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.phone}</TableCell>
                        <TableCell align="left">{user.gender}</TableCell>
                        <TableCell align="left">
                          {" "}
                          <IconButton
                            onClick={() => handleOpenModal(user._id)}
                            color="primary"
                          >
                            <RemoveRedEye />{" "}
                          </IconButton>{" "}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Users;
