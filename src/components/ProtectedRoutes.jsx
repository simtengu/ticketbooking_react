import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hookes/useAuth";

const ProtectedRoutes = () => {
        const location = useLocation();
        const authUser = useAuth();
    return authUser ? <Outlet /> : <Navigate to="/login" />
}
 
export default ProtectedRoutes;