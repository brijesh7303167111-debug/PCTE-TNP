import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Protectedsuperadmin = ({ children, requireSuperAdmin = false }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token → redirect to login");
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  const isSuperAdmin = decoded.superadmin;

  if (requireSuperAdmin && !isSuperAdmin) {
    console.log("Not superadmin → redirect to /tpohome");
    alert("You are not authorized to access this page.");
    return <Navigate to="/addpost" replace />;
  }

  return children;
};

export default Protectedsuperadmin;
