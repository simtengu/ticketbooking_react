import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import Admin from "./components/admin/Admin";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/Home";
import JourneyDetails from "./pages/JourneyDetails";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthRoutes from "./components/AuthRoutes";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Reports from "./pages/admin/Reports";
import JourneyRoutes from "./pages/admin/Routes";
import Tickets from "./pages/admin/Tickets";
import Buses from "./pages/admin/Buses";
import UpdateProfile from "./pages/admin/UpdateProfile";
import Dashboard from "./pages/admin/Dashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import Users from "./pages/admin/Users";
import { useDispatch } from "react-redux";
import { publicApi } from "./api";
import { setAuthUser } from "./store/features/auth";
import LoadingSpinner from "./components/utils/LoadingSpinner";
import MakePayment from "./pages/MakePayment";
import DownloadTicket from "./pages/DownloadTicket";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";
// import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_user = async () => {
      try {
        setLoading(true);
        const rs = await publicApi.get("/getAuthUser");
        const userData = rs.data;
        if (rs.status === 200) {
          dispatch(setAuthUser(userData.user));
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (loading) {
      fetch_user();
    }
  }, [loading,dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ bgcolor: "#158a93", minHeight: "60vh" }} className="homeDiv">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route
            path="/journey/:fromRegion/:toRegion"
            element={<JourneyDetails />}
          />
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/tickets/payment" element={<MakePayment />} />
            <Route path="/tickets/download" element={<DownloadTicket />} />

            <Route path="/admin" element={<Admin />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="routes" element={<JourneyRoutes />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="buses" element={<Buses />} />
              <Route path="update_details" element={<UpdateProfile />} />
              <Route path="users" element={<Users />} />
              <Route path="user/account" element={<UserAccount />} />
              <Route path="admin_messages" element={<AdminMessages />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
        <Footer />
    </>
  );
}

export default App;
