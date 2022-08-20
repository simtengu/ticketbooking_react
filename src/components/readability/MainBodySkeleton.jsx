import React from "react";
import { Box, Paper, Stack, Skeleton, Typography } from "@mui/material";
const MainBodySkeleton = () => {
  return (
    <Box>
      <Box sx={{ mt: 1, width: { xs: "100%", md: "60%" } }}>
        <Typography variant="h5">
          <Skeleton variant="text" />
        </Typography>
        <Typography variant="body2">
          <Skeleton variant="text" />
        </Typography>
        <Typography variant="h5" sx={{ mt: 2.5 }}>
          <Skeleton variant="text" />
        </Typography>
        <Skeleton variant="rectangular" width="100%" height={66} />

        <Typography variant="h5" sx={{ mt: 2.5 }}>
          <Skeleton variant="text" />
        </Typography>
        <Skeleton variant="rectangular" width="100%" height={66} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <center>
          <Box sx={{ width: { xs: "97%", md: "60%" } }}>
            <Typography variant="h5" sx={{ mt: 2.5, mb: 2 }}>
              <Skeleton variant="text" />
            </Typography>

            <Skeleton variant="rectangular" width="100%" height={400} />
          </Box>
        </center>
      </Box>
    </Box>
  );
};

export default MainBodySkeleton;
