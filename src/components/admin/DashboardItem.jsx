import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { responsiveness as rsp } from '../../styles/responsiveness';
const DashboardItem = ({title,link,total}) => {
  const navigate = useNavigate()
    return (
      <>
        <Grid item xs={6} sm={4}>
          <Box sx={{ p: 2 }}>
            <Paper onClick={()=> navigate(link)} className="dashboardItem" sx={{ borderRadius: 3 }}>
              <center>
                <Typography
                  className="text-light-primary prg"
                  variant="h3"
                  sx={{ fontSize: rsp.DashboardItemTitle }}
                >
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