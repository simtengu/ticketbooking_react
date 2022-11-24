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

import { Delete, RemoveRedEye, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import {
  deleteUser,
  fetchUsers,
  searchUser,
  setSelectedUser,
} from "../../store/features/profile";
import spinner from "../../assets/spinner.gif";
import ringsLoader from "../../assets/doublering.gif";
import { useNavigate } from "react-router-dom";
import Row from "../../components/utils/Row";
import {
  activateFeedback,
  deActivateFeedback,
} from "../../store/features/errorAndFeedback";
import ConfirmationModal from "../../components/utils/ConfirmationModal";
const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    feedback: { isLoading },
    profile: { users },
  } = useSelector((state) => state);
  const [isSearchingUser, setIsSearchingUser] = useState(false);

  const handleSearchUser = async (searchValue) => {
    if (searchValue.trim().length > 0) {
      setIsSearchingUser(true);
      await dispatch(searchUser(searchValue.trim()));
      setIsSearchingUser(false);
    }
  };
  //delete user ...............................
  const [isConfirmUserDeleteOpen, setIsConfirmUserDeleteOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState("");
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const handleDeleteUser = async () => {
    setIsConfirmUserDeleteOpen(false);
    try {
      setIsDeletingUser(true);
      await dispatch(deleteUser(userToDeleteId));
      setIsDeletingUser(false);
      setUserToDeleteId("");
      dispatch(
        activateFeedback({
          status: "success",
          message: "user deleted successfully",
        })
      );
    } catch (error) {
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      dispatch(activateFeedback({ status: "error", message: error_message }));
      setUserToDeleteId("");
      setIsDeletingUser(false);
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      dispatch(deActivateFeedback());
    };
  }, []);

  if (isLoading) {
    return (
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
  }
  return (
    <>
      {isConfirmUserDeleteOpen && (
        <ConfirmationModal
          heading="Are you sure you want to delete this user"
          middleParagraph=" proceed with deleting"
          closeModal={() => setIsConfirmUserDeleteOpen(false)}
          handleConfirmAction={handleDeleteUser}
        />
      )}

      {isDeletingUser && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: 100,
          }}
        >
          <img width="70" src={ringsLoader} alt="loader" />
        </Box>
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
                  <img src={spinner} alt="ldr" width="40" />
                ) : (
                  <IconButton>
                    <Search color="primary" />
                  </IconButton>
                )}
              </Stack>
            </Box>
            <Divider sx={{ my: 1.5, mx: 1 }} orientation="vertical" flexItem />
            <Button
              className="text-primary"
              variant="text"
              onClick={() => dispatch(fetchUsers())}
            >
              fetch all Users
            </Button>
          </Stack>

          <Typography sx={{ ml: 1, mt: 2, color: "#98989b" }} gutterBottom>
            Users Count:{" "}
            <span style={{ fontWeight: "bold" }}>{users.length}</span>
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
                          <Row>
                            <IconButton
                              onClick={() => {
                                dispatch(setSelectedUser({ user }));
                                navigate("/admin/user/account");
                              }}
                              color="primary"
                            >
                              <RemoveRedEye />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setUserToDeleteId(user._id);
                                setIsConfirmUserDeleteOpen(true);
                              }}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Row>
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
