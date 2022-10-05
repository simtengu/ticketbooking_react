import { Stack } from "@mui/material";
import React from "react";
import loader from "../../assets/twoballs.gif";
const LoadingSpinner = () => {
  return (
    <>
      <Stack
        className="loadingSpinner"
        sx={{ width: "100vw", height: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <img src={loader} width="120" alt="loading..." />
      </Stack>
    </>
  );
};

export default LoadingSpinner;
