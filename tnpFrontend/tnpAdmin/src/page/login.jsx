import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { serverURL } from "../constant/constant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/api/login`, {
        email,
        password,
      });

      console.log("handle login function");
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      localStorage.setItem("isSuperAdmin", res.data.user.isSuperAdmin);

      navigate("/addpost"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
     <div className="flex h-screen justify-center items-center bg-gradient-to-br from-black via-gray-900 to-[#9B1C1C] p-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#9B1C1C]">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 focus:border-[#9B1C1C] focus:ring-[#9B1C1C] p-3 w-full mb-4 rounded-lg outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 focus:border-[#9B1C1C] focus:ring-[#9B1C1C] p-3 w-full mb-6 rounded-lg outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#9B1C1C] text-white font-semibold p-3 w-full rounded-lg shadow-md hover:bg-black transition"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Login;
