import { Box } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import JourneyDetails from "./pages/JourneyDetails";

function App() {
  return (
    <>
      <Box sx={{ bgcolor: "#158a93" }} className="homeDiv">
        <TopBar />
        <Admin />
      </Box>
      <Footer/>
    </>
  );
}

export default App;
