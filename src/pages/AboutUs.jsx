import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@mui/material";
//icons......................
import { CheckCircle, Send } from "@mui/icons-material";
//icons......................
import { motion } from "framer-motion";
import Row from "../components/utils/Row";
import { responsiveness as rsp } from "../styles/responsiveness";

const AboutUs = () => {
  const container = {
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.5 },
    },
    hidden: { opacity: 0 },
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
                      variant="h5"
                      sx={{ fontSize: rsp.heading3 }}
                    >
                      get to know
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
                      About Us
                    </Typography>
                  </motion.div>
                </motion.div>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7} className="about-us-hero"></Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 17, mb: 4 }}>
          <center>
            <Typography
              variant="h4"
              className="text-primary"
              sx={{ fontWeight: "bold", fontSize: rsp.sectionTitle }}
            >
              <span style={{ color: "#ffde07" }}>WHO</span>-WE ARE
            </Typography>
          </center>
          <Container sx={{ mt: { xs: 5, md: 9 } }}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <Box sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item xs={6} sx={{ p: 1 }}>
                      <img
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827565/bus_zj9pkw.jpg"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 20,
                        }}
                        alt="tz tourism"
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ p: 1 }}>
                      <img
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827754/bb_ore2y7.jpg"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 20,
                        }}
                        alt="tz tourism"
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ p: 1 }}>
                      <img
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827713/basi_ernijt.jpg"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 20,
                        }}
                        alt="tz tourism"
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ p: 1 }}>
                      <img
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827752/bssb_kdvda9.jpg"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 20,
                        }}
                        alt="tz tourism"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ p: 1 }}>
                  <Typography
                    variant="h6"
                    className="text-primary"
                    sx={{ fontWeight: "bold", fontSize: rsp.heading2 }}
                    gutterBottom
                  >
                    <span style={{ color: "#ffde07" }}>AOS</span>-EXPRESS
                  </Typography>
                  <Typography sx={{ fontSize: rsp.paragraph1 }}>
                    AOS-EXPRESS is a company based in Tanzania which provides
                    travelling services to Tanzanian people. The company started
                    in 2010 by providing services in 4 regions, as of 2022 the
                    company has already covered more than two third of the
                    country and provided more than 300 employments. ipsum dolor
                    sit amet, consectetur adipisicing elit. Eum reprehenderit
                    porro consequuntur ex maiores possimus nostrum ut, magnam
                    molestiae non voluptate laudantium a dolor fugit ducimus
                    suscipit optio temporibus autem. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Architecto, deserunt velit
                    nostrum doloremque ab amet quis unde incidunt. Nostrum
                    expedita magni ad. Sed officia vel omnis quia saepe,
                    voluptatum sit.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box id="regions_list" mt={13}>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        className="text-primary"
                        sx={{ fontWeight: "bold", fontSize: rsp.heading3 }}
                      >
                        <span style={{ color: "#ffde07" }}>Regions</span>-we are
                        operating
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Row>
                        <ul>
                          <li>
                            <Typography variant="h6">Dodoma</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Mwanza</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Tanga</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Katavi</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Kagera</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Mbeya</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Geita</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Mara</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Lindi</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Katavi</Typography>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <Typography variant="h6">Morogoro</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Kilimanjaro</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Iringa</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Njombe</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Singida</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Babati</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Pwani</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Kigoma</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Arusha</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Dar es salaam</Typography>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <Typography variant="h6">Tabora</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Ruvuma</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Simiyu</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Pemba</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Unguja</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Mtwara</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Songwe</Typography>
                          </li>

                          <li>
                            <Typography variant="h6">Shinyanga</Typography>
                          </li>
                          <li>
                            <Typography variant="h6">Tanga</Typography>
                          </li>
                        </ul>
                      </Row>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={5}>
                      <Box sx={{ p: 1 }} className="bg-primary">
                        <Stack
                          style={{ height: "100%" }}
                          justifyContent="center"
                        >
                          <img
                            src="https://res.cloudinary.com/simtengu/image/upload/v1664827576/hs_ig81wt.jpg"
                            alt="regions bus"
                            style={{ width: "100%" }}
                          />
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ mt: 17, mb: 4 }}>
                <div>
                  <center>
                    <Typography
                      variant="h4"
                      className="text-primary"
                      sx={{ fontWeight: "bold", fontSize: rsp.sectionTitle }}
                    >
                      <span style={{ color: "#ffde07" }}>OUR</span>-STAFF
                    </Typography>
                  </center>
                  <Grid container rowSpacing={7} sx={{ mt: { xs: 7, md: 11 } }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div whileHover={{ scale: 1.5 }}>
                        <center>
                          <img
                            style={{ width: "60%", borderRadius: "50%" }}
                            src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                            alt="tz tour"
                          />
                        </center>

                        <Box mt={0.5}>
                          <center>
                            <Typography variant="h6">Patricia John</Typography>
                            <Typography
                              className="text-primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              EXECUTIVE OFFICER
                            </Typography>
                          </center>
                        </Box>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div whileHover={{ scale: 1.5 }}>
                        <center>
                          <img
                            style={{ width: "60%", borderRadius: "50%" }}
                            src="https://res.cloudinary.com/simtengu/image/upload/v1664827704/dp1_xb37dd.jpg"
                            alt="tz tour"
                          />
                        </center>

                        <Box mt={0.5}>
                          <center>
                            <Typography variant="h6">
                              Raymond Charles
                            </Typography>
                            <Typography
                              className="text-primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              TRANSPORT OFFICER
                            </Typography>
                          </center>
                        </Box>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div whileHover={{ scale: 1.5 }}>
                        <center>
                          <img
                            style={{ width: "60%", borderRadius: "50%" }}
                            src="https://res.cloudinary.com/simtengu/image/upload/v1664827623/dp_bfhc00.jpg"
                            alt="tz tour"
                          />
                        </center>

                        <Box mt={0.5}>
                          <center>
                            <Typography variant="h6">Damson Dismas</Typography>
                            <Typography
                              className="text-primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              TECHNICAL OFFICER
                            </Typography>
                          </center>
                        </Box>
                      </motion.div>
                    </Grid>
                  </Grid>
                </div>
              </Box>
              <Box sx={{ mt: 19 }}>
                <center>
                  <Typography
                    variant="h4"
                    className="text-primary"
                    sx={{ fontWeight: "bold", fontSize: rsp.sectionTitle }}
                  >
                    <span style={{ color: "#ffde07" }}>OUR</span>-BUSES
                  </Typography>
                </center>
                <Grid container spacing={2} sx={{ mt: 8 }}>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827752/bssb_kdvda9.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827752/bssb_kdvda9.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827578/pxbus1_qob7bq.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827565/bus2_zitkz9.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827565/bvh_vlpjup.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ p: 1 }}>
                    <motion.img
                      whileHover={{ scale: 1.3 }}
                      src="https://res.cloudinary.com/simtengu/image/upload/v1664827564/bssd_xofhxz.jpg"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 20,
                      }}
                      alt="tz tourism"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <Box className="out-timetable" sx={{ my: 14 }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={5}>
                <Box
                  sx={{ p: 2, minHeight: 300, bgcolor: "rgba(240,219,78,0.9)" }}
                >
                  <center>
                    <Typography
                      className="text-primary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: 20, md: 33 },
                        textDecoration: "underline",
                      }}
                      gutterBottom
                    >
                      <span style={{ color: "white" }}>Our</span> timetable
                    </Typography>
                  </center>
                  <Stack direction="row" justifyContent="center">
                    <Box sx={{ display: "inline-block", mt: 3 }}>
                      <Row>
                        <CheckCircle className="text-primary" />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography sx={{ fontSize: 18 }}>
                            First Round: Monday to Sunday
                          </Typography>
                          <Typography sx={{ color: "#fff", fontSize: 15 }}>
                            Departing Time:{" "}
                            <span style={{ fontWeight: "bold" }}>06:00 am</span>
                          </Typography>
                        </Box>
                      </Row>
                      <Row styles={{ marginTop: 4 }}>
                        <CheckCircle className="text-primary" />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography sx={{ fontSize: 18 }}>
                            Second Round: Monday to Friday
                          </Typography>
                          <Typography sx={{ color: "#fff", fontSize: 15 }}>
                            Departing Time:{" "}
                            <span style={{ fontWeight: "bold" }}>08:00 am</span>
                          </Typography>
                        </Box>
                      </Row>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box my={6}>
          <Container>
            <Box
              sx={{ my: 3, pl: 0.6, py: 0.4, borderLeft: "5px solid #f0db4e" }}
            >
              <Typography
                variant="h6"
                className="text-primary"
                sx={{ fontSize: rsp.heading3 }}
              >
                What Passengers Say
              </Typography>
            </Box>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#bee3e7",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827623/dp_bfhc00.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="It was an awesome journey."
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Joel Limbe
                          </Typography>
                          {
                            " my journey with Aos-Express is by far the best i ever had"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827623/dp_bfhc00.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="I really enjoyed my journey"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Husna Simwanza
                          </Typography>
                          {" — They really care about their passengers"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="I just loved their service"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Roberto Carlos
                          </Typography>
                          {" — They have nice workers,,they are on time."}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#bee3e7",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Its Aos-express or nothing"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Calum hudson
                          </Typography>
                          {" — Aos-Express is the best out there honestly"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="I felt safe throughout my journey"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Albert Simtengu
                          </Typography>
                          {" — With the way they operate safety is guaranteed"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="I was pleased with their service"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Olelooh Sabaya
                          </Typography>
                          {" — Everything went smoothly throughout my journey"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#bee3e7",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827735/dp2_utxqba.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="They are simply the best"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Gabriel Gilbert
                          </Typography>
                          {" — My journey with Aos-Express was simply the best"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827704/dp1_xb37dd.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="They just provide the best journey"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            John Doe
                          </Typography>
                          {
                            " — Their service just makes the other options to look so average"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://res.cloudinary.com/simtengu/image/upload/v1664827704/dp1_xb37dd.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Sandra Adams
                          </Typography>
                          {
                            " — I enjoyed every single minute of my journey with Aos-Express"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
