import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}
