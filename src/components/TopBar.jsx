import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

function TopBar() {
  return (
    <>
      <Box className="app-bar bg-light" sx={{ py: 3 }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              <Grid container>
                <Grid item sm={6}>
                  <a href="#" className="logo">
                    {" "}
                    <Typography
                      variant="h5"
                      className="text-primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      <span style={{ color: "#ffde07" }}>AOS</span>-EXPRESS
                      {/* <span style={{ color: "#ffde07" }}>A<span className="text-primary">O</span>S</span>-EXPRESS */}
                    </Typography>{" "}
                  </a>
                </Grid>
                <Grid item sm={6}>
                  <Stack
                    className="navbarRightColumn"
                    direction="row"
                    alignItems="center"
                    justifyContent="right"
                  >
                    <Typography
                      variant="h6"
                      className="text-secondary"
                      sx={{
                        mx: 1,
                        fontWeight: "bold",
                      }}
                    >
                      about us
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-secondary"
                      sx={{
                        ml: 1,
                        mr: 3,
                        fontWeight: "bold",
                      }}
                    >
                      contacts
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mx: 1 }}
                      className="grd-to-bottom-right"
                    >
                      register
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mx: 1, color: "#158a93", borderColor: "#158a93" }}
                    >
                      Login
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default TopBar;
