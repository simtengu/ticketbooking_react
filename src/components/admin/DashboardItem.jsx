import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
const DashboardItem = ({title,link,total}) => {
    return (
      <>
        <Grid item xs={4} md={3}>
          <Box sx={{ p: 2 }}>
            <Paper className="dashboardItem" sx={{ borderRadius: 3 }}>
              <center>
                <Typography className="text-light-primary prg" variant="h3">
                  {total}
                </Typography>
                <Typography
                  className="text-light-primary prg"
                  variant="h6"
                  sx={{ p: 0 }}
                >
                  {title}
                </Typography>
              </center>
            </Paper>
          </Box>
        </Grid>
      </>
    );
}
 
export default DashboardItem;