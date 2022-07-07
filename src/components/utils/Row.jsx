import { Stack } from "@mui/material";
import React from "react";
const Row = ({ children,styles }) => {
  return (
    <>
      <Stack sx={{...styles}} direction="row" alignItems="center">
          {children}
      </Stack>
    </>
  );
};

export default Row;
