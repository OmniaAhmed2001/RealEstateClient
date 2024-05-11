import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser?.role === "user" && location.pathname === "/dashboard")
      navigate("/");
  }, [location.pathname]);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
