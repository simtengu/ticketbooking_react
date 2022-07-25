import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { publicApi } from "../api";
import useAuth from "../hookes/useAuth";
import { setAuthUser } from "../store/features/auth";
import LoadingSpinner from "./utils/LoadingSpinner";

const ProtectedRoutes = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const authUser = useAuth();
  const [loading, setLoading] = useState(authUser.email ? false : true);

  useEffect(() => {
    const fetch_user = async () => {
      try {
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
  }, []);

  if (loading) {
    return <Box sx={{minHeight:"100vh"}}><LoadingSpinner /></Box> ;
  } else {
    return authUser.email ? <Outlet /> : <Navigate to="/login" state={{from:location.pathname}} />;
  }
};

export default ProtectedRoutes;
