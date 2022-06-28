import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container>
          <Grid container rowSpacing={2} columnSpacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <a href="#" className="logo">
                {" "}
                <Typography
                  variant="h5"
                  className="text-primary"
                  sx={{ fontWeight: "bold" }}
                >
                  <span style={{ color: "#ffde07" }}>AOS</span>-EXPRESS
                </Typography>{" "}
              </a>
              <Typography id="body1" variant="body1" gutterBottom>
                For a nice, comfortable, cheap, wonderful and safe journey we are the one
                and only option for you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2} justifyContent="space-around">
                <Instagram sx={{ color: "#f574b8" }} />
                <Facebook sx={{ color: "#252be9" }} />
                <Twitter sx={{ color: "#7fc6f2" }} />
                <LinkedIn sx={{ color: "#2f87d1" }} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Footer;
