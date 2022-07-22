import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { publicApi } from "../api";
import useAuth from "../hookes/useAuth";
import { setAuthUser } from "../store/features/auth";
import LoadingSpinner from "./utils/LoadingSpinner";

const AuthRoutes = () => {
  const authUser = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.state?.from?.pathname || "/";
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
      return (
        <Box sx={{ minHeight: "100vh" }}>
          <LoadingSpinner />
        </Box>
      );
    } else {
     return !authUser.email ? <Outlet /> : <Navigate to={path} />;
    }


  
};

export default AuthRoutes;

