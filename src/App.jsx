import { Box } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Box sx={{ bgcolor: "#158a93",minHeight:"100vh" }} className="homeDiv">
        <TopBar />
        <Home />
      </Box>
      <Footer/>
    </>
  );
}

export default App;
