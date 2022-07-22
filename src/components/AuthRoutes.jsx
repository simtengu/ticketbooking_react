import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hookes/useAuth";

const AuthRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authUser = useAuth();
    const path = location.state?.from?.pathname || "/";
  return !authUser ? <Outlet /> : <Navigate to={path} />;
};

export default AuthRoutes;
