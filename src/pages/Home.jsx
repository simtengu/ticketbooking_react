import { Box } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
const Home = () => {
    return (
      <>
        <Box sx={{ bgcolor: "#158a93" }}>
        <Hero />
        </Box>
      </>
    );
}
 
export default Home;