import React from "react";
import { Container, Grid, Button, Box } from "@mui/material";
import _404vater from "../assets/404.png";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ bgcolor: "white", p: 0, m: 0 }}>
        <Container sx={{ minHeight: "50vh" ,py:4}}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <img src={_404vater} style={{ width: "100%" }} alt="avater 404" />
              <Box mt={4}>
                <center>
                  <Button size="large" className="grd-primary" onClick={() => navigate("/")} sx={{color:"white",borderRadius:20}}>
                    go to homepage
                  </Button>
                </center>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
