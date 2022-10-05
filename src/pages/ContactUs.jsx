import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
//icons......................
import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Place,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
//icons......................
import { motion } from "framer-motion";
import loader from "../assets/doublering.gif";
import contactUsImage from "../assets/2.jpg";
import Row from "../components/utils/Row";
import useAuth from "../hookes/useAuth";
import { publicApi } from "../api";
import { responsiveness as rsp } from "../styles/responsiveness";

const ContactUs = () => {
  //motion..........................
  const container = {
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.5 },
    },
    hidden: { opacity: 0.5 },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        stiffness: 1000,
      },
    },
    hidden: { opacity: 0, y: -15, x: -15 },
  };
  //end of motion.................
  let auth_user = useAuth();
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [feedback, setFeedback] = useState({
    status: "",
    message: "",
    severity: "warning",
  });
  let initialState = {
    firstName: auth_user.email ? auth_user.firstName : "",
    lastName: auth_user.email ? auth_user.lastName : "",
    email: auth_user.email ? auth_user.email : "",
    message: "",
  };
  const [messageInfo, setMessageInfo] = useState(initialState);
  const updateMessageInfo = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setMessageInfo({ ...messageInfo, [name]: value });
  };
  const handleSendMessage = async () => {
    let isFormNotComplete = Object.values(messageInfo).includes("");
    if (isFormNotComplete) {
      setFeedback({
        status: "error",
        message: "Please complete a form before submitting...",
        severity: "warning",
      });
      return;
    }
    try {
      setIsSendingMessage(true);
      const rs = await publicApi.post("/message", messageInfo);
      setIsSendingMessage(false);
      if (rs.status === 201) {
        setFeedback({
          status: "success_msg",
          message: "Your message was received successfully",
          severity: "success",
        });
      }
      setMessageInfo(initialState);
    } catch (error) {
      setFeedback({
        status: "error",
        message: "Something went wrong..please try again later",
        severity: "error",
      });
      setIsSendingMessage(false);
    }
  };
  return (
    <>
      <Box sx={{ bgcolor: "white" }}>
        <Box>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Stack
                className="bg-secondary"
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ p: 2, minHeight: { xs: "40vh", md: "60vh" } }}
              >
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={child}>
                    <Typography
                      className="text-light"
                      sx={{ fontSize: rsp.heading3 }}
                      variant="h5"
                    >
                      for more about us
                    </Typography>
                  </motion.div>
                  <motion.div variants={child}>
                    <Typography
                      className="text-primary"
                      sx={{
                        fontWeight: "bold",
                        lineHeight: 1,
                        fontSize: rsp.topHeading,
                      }}
                    >
                      Contact Us
                    </Typography>
                  </motion.div>
                </motion.div>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7} className="about-us-hero"></Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: { xs: 7, md: 14 } }}>
          <Container>
            <Box my={7}>
              <Grid container>
                <Grid item xs={12} md={5} sx={{ mb: { xs: 5, md: 0 } }}>
                  <Row styles={{ marginTop: 2 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "50%",
                        p: 0.5,
                        bgcolor: "#baf1f5",
                      }}
                    >
                      <Place className="text-primary" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        Nyerere Road, 23 street Flats
                      </Typography>
                      <Typography
                        className="text-primary"
                        sx={{ fontSize: 15 }}
                      >
                        P.O.BOX 332 Dar Es Salaam
                      </Typography>
                    </Box>
                  </Row>
                  <Row styles={{ marginTop: 1 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "50%",
                        p: 0.5,
                        bgcolor: "#baf1f5",
                      }}
                    >
                      <Email className="text-primary" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        albertsimtengu@gmail.com
                      </Typography>
                    </Box>
                  </Row>
                  <Row styles={{ marginTop: 1 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "50%",
                        p: 0.5,
                        bgcolor: "#baf1f5",
                      }}
                    >
                      <Email className="text-primary" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        rabiasoscar@gmail.com
                      </Typography>
                    </Box>
                  </Row>
                  <Row styles={{ marginTop: 1 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "50%",
                        p: 0.5,
                        bgcolor: "#baf1f5",
                      }}
                    >
                      <WhatsApp className="text-primary" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        +255 710 162 838
                      </Typography>
                    </Box>
                  </Row>
                  <Row styles={{ marginTop: 1 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        borderRadius: "50%",
                        p: 0.5,
                        bgcolor: "#baf1f5",
                      }}
                    >
                      <Phone className="text-primary" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        +255 743 754 022
                      </Typography>
                    </Box>
                  </Row>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
                    <Box>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 10,
                          border: "2px solid #158a93",
                          display: "inline-block",
                        }}
                      >
                        <Row>
                          <Box>
                            <Facebook sx={{ fontSize: 33, color: "#5577bf" }} />
                          </Box>
                          <Box sx={{ ml: 1.5 }}>
                            <Typography sx={{ fontSize: 17 }}>
                              Aos Express
                            </Typography>
                          </Box>
                        </Row>
                      </Box>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 10,
                          border: "2px solid #158a93",
                          display: "inline-block",
                          mt: 1,
                          ml: 0.4,
                        }}
                      >
                        <Row>
                          <Box>
                            <Instagram
                              sx={{ fontSize: 33, color: "#ff00ff" }}
                            />
                          </Box>
                          <Box sx={{ ml: 1.5 }}>
                            <Typography sx={{ fontSize: 17 }}>
                              Aos Express
                            </Typography>
                          </Box>
                        </Row>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
                    <Box>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 10,
                          border: "2px solid #158a93",
                          display: "inline-block",
                        }}
                      >
                        <Row>
                          <Box>
                            <LinkedIn sx={{ fontSize: 33, color: "#5577bf" }} />
                          </Box>
                          <Box sx={{ ml: 1.5 }}>
                            <Typography sx={{ fontSize: 17 }}>
                              Aos Express
                            </Typography>
                          </Box>
                        </Row>
                      </Box>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 10,
                          border: "2px solid #158a93",
                          display: "inline-block",
                          mt: 1,
                          ml: 0.4,
                        }}
                      >
                        <Row>
                          <Box>
                            <Twitter sx={{ fontSize: 33, color: "#60ccfb" }} />
                          </Box>
                          <Box sx={{ ml: 1.5 }}>
                            <Typography sx={{ fontSize: 17 }}>
                              Aos Express
                            </Typography>
                          </Box>
                        </Row>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Grid container justifyContent="center" mt={15} mb={5}>
              <Grid item xs={12} md={10}>
                <Paper sx={{ p: 1.4 }}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <center>
                        <Typography
                          variant="h5"
                          className="text-primary"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          <span style={{ color: "#ffde07" }}>Email</span>-Us
                        </Typography>
                      </center>
                      <center>
                        <img
                          src={contactUsImage}
                          alt="contactusimg"
                          style={{ maxWidth: "90%", marginTop: 40 }}
                        />
                      </center>
                    </Grid>
                    <Grid id="mail-us-form" item xs={12} md={6} sx={{ p: 1 }}>
                      <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12}>
                          {feedback.status !== "" && (
                            <Alert
                              severity={feedback.severity}
                              onClose={() =>
                                setFeedback({ ...feedback, status: "" })
                              }
                            >
                              {feedback.message}
                            </Alert>
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="FirstName"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={messageInfo.firstName}
                            onChange={updateMessageInfo}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="LastName"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={messageInfo.lastName}
                            onChange={updateMessageInfo}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={messageInfo.email}
                            onChange={updateMessageInfo}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Your Message"
                            multiline
                            rows={4}
                            fullWidth
                            name="message"
                            value={messageInfo.message}
                            onChange={updateMessageInfo}
                          />

                          {isSendingMessage ? (
                            <img
                              width="50"
                              style={{ marginTop: 10 }}
                              src={loader}
                              alt="loading img"
                            />
                          ) : (
                            <Button
                              variant="outlined"
                              className="bg-secondary"
                              size="large"
                              sx={{ mt: 2 }}
                              onClick={handleSendMessage}
                            >
                              Send
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ p: 2, mt: 12 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3663343243547!2d39.23763431441478!3d-6.846613095052028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c49f24272e205%3A0xd4c69587f3f335ba!2sJulius%20K.%20Nyerere%20Rd%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1662841795882!5m2!1sen!2stz"
            style={{ width: "100%", height: "50vh" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
