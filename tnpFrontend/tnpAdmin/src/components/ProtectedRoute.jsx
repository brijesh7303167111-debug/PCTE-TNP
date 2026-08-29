import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 


const ProtectedRoute = ({ children }) => {
  console.log("Protected Route");
  const token = localStorage.getItem("token");
  

if (!token) {
    console.log("navigating to login through protected");
    return <Navigate to="/login" replace />;
  }
   const decoded = jwtDecode(token);
  const isSuperAdmin = decoded.superadmin; // 👈 directly from payload

  console.log("Decoded token:", decoded);
  console.log("isSuperAdmin:", isSuperAdmin);


  

//   // ✅ If you only want superadmins to access
//   if (!isSuperAdmin) {
//     console.log("not a superadmin, redirecting...");
//     return <Navigate to="/" replace />;
//   }

  console.log("navigating to addpost through protected");
  return children;
};

export default ProtectedRoute;
