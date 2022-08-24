import React from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Row from './Row';
const ConfirmationModal = ({closeModal,heading,middleParagraph,handleConfirmAction}) => {
    return (
      <>
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.3)",
            zIndex: "100",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: "0px",
            top: "0px",
          }}
          onClick={closeModal}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={22}
              sx={{ display: "inline-block", p: 3, borderRadius: 3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "calibri",
                  fontSize: { xs: 22 },
                  color: "#3e3e3e",
                }}
              >
                {heading}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "calibri",
                  fontSize: { xs: 15 },
                  color: "#aeaeae",
                }}
              >
               {middleParagraph}
              </Typography>
              <Row styles={{ marginTop: 1 }}>
                <Paper sx={{ display: "inline-block" }}>
                  <Button
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { color: "white", bgcolor: "#1976d2" },
                    }}
                    size="small"
                    onClick={handleConfirmAction}
                  >
                    ok
                  </Button>
                </Paper>
                <Paper sx={{ display: "inline-block", ml: 1 }}>
                  <Button
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { color: "white", bgcolor: "#1976d2" },
                    }}
                    size="small"
                    color="error"
                    onClick={closeModal}
                  >
                    cancel
                  </Button>
                </Paper>
              </Row>
            </Paper>
          </Stack>
        </Box>
      </>
    );
}
 
export default ConfirmationModal;