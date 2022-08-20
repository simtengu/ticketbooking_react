import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Skeleton,
} from "@mui/material";
const LeftBarSkeleton = () => {
    return (
      <Box>
        <Paper className="bg-light-cyan" sx={{ p: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="rectangular" width={60} height={60} />
            <Skeleton variant="text" width={60} height={60} />
            <Skeleton variant="rectangular" width={60} height={60} />
          </Stack>
        </Paper>
        <Box sx={{ mt: 1, p: 1 }}>
          <Skeleton variant="text" sx={{ mt: 1 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={118}
            sx={{ mt: 1 }}
          />

          <Skeleton variant="text" sx={{ mt: 2 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={118}
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
    );
}
 
export default LeftBarSkeleton;