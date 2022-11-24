import { useRef } from "react";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  TextField,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Build, Delete, Edit, Settings, UploadFile } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBus,
  fetchBuses,
  fetchRoutes,
  registerBus,
  updateBus,
} from "../../store/features/profile";
import { secureApi } from "../../api";
import { activateFeedback } from "../../store/features/errorAndFeedback";
import FeedbackMessage from "../../components/utils/FeedbackMessage";
import Row from "../../components/utils/Row";
import spinner from "../../assets/spinner.gif";
import loader from "../../assets/doublering.gif";
import useAuth from "../../hookes/useAuth";
const Buses = () => {
  const dispatch = useDispatch();
  const authUser = useAuth()
  const isAdmin = authUser.role === 111 ? true : false;
  const { buses, routes } = useSelector((state) => state.profile);
  const initialBusInfo = {
    busNumber: "",
    numberOfSeats: "",
    busRoute: routes.length > 0 ? `${routes[0].from} to ${routes[0].to}` : "",
    busPicture: "",
  };

  const [busInfo, setBusInfo] = useState(initialBusInfo);
  const [busPictureInfo, setBusPictureInfo] = useState({
    value: "",
    tempLink: "",
  });
  const [loading, setLoading] = useState(true);

  const [isBusLoaderActive, setIsBusLoaderActive] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState("");

  const handleGoToBusUpdate = (busInfo) => {
    setSelectedBusId(busInfo._id);
    const busData = {
      busNumber: busInfo.busNumber,
      numberOfSeats: busInfo.numberOfSeats,
      busRoute: busInfo.busRoute,
      busPicture: busInfo.busPicture,
    };
    setBusInfo(busData);
    window.scrollTo(0, 0);
    //  window.location.href = "/admin/buses/#addBus"
  };
  //bus register/update.............
  const handleBusSubmit = async () => {
    const isBusFormInComplete = Object.values(busInfo).includes("");
    if (isBusFormInComplete) {
      dispatch(
        activateFeedback({
          status: "warning",
          message:
            "!Some inputs are not filled..Please complete a form before submitting",
        })
      );
      return;
    }

    if (isNaN(busInfo.numberOfSeats)) {
      dispatch(
        activateFeedback({
          status: "error",
          message: "Number of seats you have provided is invalid",
        })
      );
      return;
    }
    try {
      setIsBusLoaderActive(true);
      if (selectedBusId) {
        //updating bus..............
        dispatch(updateBus({ busId: selectedBusId, busInfo }));
      } else {
        //adding new bus...................
        await dispatch(registerBus(busInfo));
        setBusInfo(initialBusInfo);
      }
      setIsBusLoaderActive(false);
    } catch (error) {
      dispatch(
        activateFeedback({
          status: "error",
          message: "Something went wrong ..couldn't save a bus",
        })
      );
      setIsBusLoaderActive(false);
    }
  };

  //bus delete.......
  const handleDeleteBus = async (busId) => {
    if (!window.confirm("Are you sure you want to delete this bus")) {
      return;
    }

    try {
      setIsBusLoaderActive(true);
      await dispatch(deleteBus(busId));
      setIsBusLoaderActive(false);
    } catch (error) {
      dispatch(
        activateFeedback({
          status: "error",
          message: "Something went wrong ..couldn't delete a bus",
        })
      );
      setIsBusLoaderActive(false);
    }
  };

  //bus image operations.............................................................

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handlePictureSelection = (e) => {
    let value = e.target.files[0];
    let imgLink = URL.createObjectURL(value);
    setBusPictureInfo({
      value,
      tempLink: imgLink,
    });
  };

  //image upload..........................
  const pic_upload_input_ref = useRef();
  const handleImageSubmit = async () => {
    if (!busPictureInfo.value) {
      dispatch(
        activateFeedback({
          status: "warning",
          message: "Select the image you want to upload first",
        })
      );
      return;
    }

    //image has been selected ......upload
    let data = new FormData();
    data.append("picture", busPictureInfo.value);

    try {
      setIsUploadingImage(true);
      let url = "/admin/bus/image_upload";
      //checking if we are on updating state mode..........
      if (selectedBusId) url += `?busId=${selectedBusId}`;
      let rs = await secureApi.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (rs.statusText === "OK") {
        const rsData = rs.data;
        const imgUrl = rsData.imgUrl;
        setBusInfo({ ...busInfo, busPicture: imgUrl });
        if (selectedBusId)
          dispatch(updateBus({ bus_picture: imgUrl, busId: selectedBusId }));
        setBusPictureInfo({
          value: "",
          tempLink: "",
        });

        //nullfy pic select input
        pic_upload_input_ref.current.value = "";
      }
      dispatch(
        activateFeedback({
          status: "success",
          message: "image uploaded successfully",
        })
      );
      setIsUploadingImage(false);
    } catch (error) {
      console.log(error.response);
      setIsUploadingImage(false);
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      dispatch(activateFeedback({ status: "error", message: error_message }));
    }
  };

  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const handleDeletePicture = async () => {
    let imgPath = busInfo.busPicture;
    let imgPathArray = imgPath.split("/");
    imgPath = imgPathArray[imgPathArray.length - 1];

    try {
      //checking if we are on updating state mode..........
      let url = `/admin/bus/image/${imgPath}`;
      if (selectedBusId) url += `?busId=${selectedBusId}`;
      setIsDeletingImage(true);
      let rs = await secureApi.delete(url);

      if (rs.statusText === "OK") {
        setBusInfo({ ...busInfo, busPicture: "" });

        if (selectedBusId)
          dispatch(updateBus({ bus_picture: "nothing", busId: selectedBusId }));
      }
      setIsDeletingImage(false);
    } catch (error) {
      console.log(error.response);
      setIsDeletingImage(false);
      const error_message = error.response
        ? error.response.data.message
        : error.message;
      dispatch(activateFeedback({ status: "error", message: error_message }));
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);

      await dispatch(fetchBuses());

      if (routes.length < 1) {
        await dispatch(fetchRoutes());
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} sx={{ p: { xs: 2, md: 4 } }}>
              <Skeleton
                sx={{ minHeight: { xs: "60vh", borderRadius: 11 } }}
                variant="rectangular"
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{ p: { xs: 2, md: 4 } }}>
              <Skeleton
                sx={{ minHeight: { xs: "60vh", borderRadius: 11 } }}
                variant="rectangular"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <>
      {isBusLoaderActive && (
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
          <img width="70" src={loader} alt="loader" />
        </Box>
      )}
      <FeedbackMessage />
      <Container>
        <Box my={1}>
          <Grid container>
            {isAdmin && (
              <Grid item xs={12} md={4}>
                <Box id="addBus" sx={{ p: 2 }}>
                  <Paper sx={{ p: 2, borderRadius: 4 }}>
                    <Typography
                      variant="button"
                      className="text-primary"
                      sx={{ fontWeight: "bold", mt: 1 }}
                      gutterBottom
                    >
                      {selectedBusId ? "Update Bus" : "Add New Bus"}
                    </Typography>
                    <Box mt={1}>
                      <Box>
                        <TextField
                          id="standard"
                          label="bus number/label"
                          variant="standard"
                          type="text"
                          size="small"
                          name="busNumber"
                          sx={{ my: 1 }}
                          fullWidth
                          value={busInfo.busNumber}
                          onChange={(e) =>
                            setBusInfo({
                              ...busInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Box>
                      <Box>
                        <TextField
                          id="standard"
                          label="number of seats"
                          variant="standard"
                          type="text"
                          size="small"
                          name="numberOfSeats"
                          fullWidth
                          sx={{ my: 1 }}
                          value={busInfo.numberOfSeats}
                          onChange={(e) =>
                            setBusInfo({
                              ...busInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Box>
                      {routes && (
                        <Box sx={{ mb: 1 }}>
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-standard-label">
                              Bus Route
                            </InputLabel>
                            <Select
                              value={busInfo.busRoute}
                              onChange={(e) => {
                                setBusInfo({
                                  ...busInfo,
                                  busRoute: e.target.value,
                                });
                              }}
                              label="bus route"
                            >
                              {routes.map((route, index) => (
                                <MenuItem
                                  key={index}
                                  value={`${route.from} to ${route.to}`}
                                >{`${route.from} to ${route.to}`}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      )}

                      <Divider />

                      {!busInfo.busPicture && (
                        <Box>
                          <Typography sx={{ my: 1 }}>
                            Add bus picture
                          </Typography>

                          <input
                            type="file"
                            id="selectPic"
                            ref={pic_upload_input_ref}
                            onChange={handlePictureSelection}
                          />
                        </Box>
                      )}

                      {busPictureInfo.tempLink && (
                        <Box my={2}>
                          <img
                            style={{ width: "80%" }}
                            src={busPictureInfo.tempLink}
                            alt="temp link"
                          />
                        </Box>
                      )}
                      {busInfo.busPicture && (
                        <Box
                          my={2}
                          sx={{
                            width: "90%",
                            borderRadius: 2,
                            bgcolor: "#f0f0f4",
                            p: 1,
                          }}
                        >
                          <img
                            style={{ width: "100%" }}
                            src={busInfo.busPicture}
                            alt="bus picture"
                          />
                          <Box mt={0.2}>
                            {isDeletingImage ? (
                              <img src={spinner} alt="ldr" width="30" />
                            ) : (
                              <IconButton
                                color="error"
                                onClick={handleDeletePicture}
                              >
                                <Delete />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                      )}

                      {!busInfo.busPicture && (
                        <Stack direction="row" alignItems="flex-end">
                          <Button
                            sx={{ mt: 1.6, fontWeight: "bold" }}
                            startIcon={<UploadFile />}
                            size="small"
                            onClick={handleImageSubmit}
                            {...(isUploadingImage ? { disabled: true } : {})}
                          >
                            Upload Picture
                          </Button>
                          {isUploadingImage && (
                            <img src={spinner} alt="ldr q" width="30" />
                          )}
                        </Stack>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2, fontWeight: "bold" }}
                      className="grd-to-bottom-right"
                      fullWidth
                      onClick={handleBusSubmit}
                    >
                      {selectedBusId ? "Update" : "Save"}
                    </Button>
                    {selectedBusId && (
                      <Row styles={{ mt: 1 }}>
                        <Typography sx={{ color: "grey" }}>go to</Typography>{" "}
                        <Button
                          onClick={() => {
                            setBusInfo(initialBusInfo);
                            setSelectedBusId("");
                            window.scrollTo(0, 0);
                          }}
                          sx={{ fontWeight: "bold" }}
                        >
                          Add Bus
                        </Button>{" "}
                        <Typography sx={{ color: "grey" }}>instead</Typography>
                      </Row>
                    )}
                  </Paper>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2 }}>
                <Paper sx={{ p: 2, borderRadius: 4 }}>
                  <Typography
                    variant="button"
                    className="text-primary"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    registered buses
                  </Typography>

                  {buses && buses.length > 0 ? (
                    <TableContainer component={Box}>
                      <Table aria-label="today's tickets">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <span className="font-bold">#Sno</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-bold">Picture</span>
                            </TableCell>
                            <TableCell align="center">
                              <span className="font-bold">Bus Number</span>
                            </TableCell>
                            <TableCell align="center">
                              <span className="font-bold">Total Seats</span>
                            </TableCell>
                            <TableCell align="center">
                              <span className="font-bold">Route</span>
                            </TableCell>
                            {isAdmin && <TableCell>&nbsp;</TableCell>}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {buses.map((bus, index) => (
                            <TableRow key={bus._id}>
                              <TableCell>
                                <span className="font-bold">{index + 1}</span>
                              </TableCell>
                              <TableCell>
                                <img
                                  src={bus.busPicture}
                                  width="100"
                                  alt="bus pic"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <span className="font-bold">
                                  {bus.busNumber}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <span className="font-bold">
                                  {bus.numberOfSeats}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <span className="font-bold">
                                  {bus.busRoute}
                                </span>
                              </TableCell>

                              {isAdmin && (
                                <TableCell>
                                  <Row>
                                    <IconButton>
                                      <Edit
                                        onClick={() => handleGoToBusUpdate(bus)}
                                        className="text-primary"
                                      />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => handleDeleteBus(bus._id)}
                                    >
                                      <Delete color="error" />
                                    </IconButton>
                                  </Row>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box mt={3}>
                      {" "}
                      <center>
                        <p style={{ fontWeight: "bold" }}>
                          There is no any bus registered yet.
                        </p>
                      </center>{" "}
                    </Box>
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Buses;
