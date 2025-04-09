import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react"; // import useToast from Chakra
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast(); // initialize toast

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      setToken(res.data.token);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/app");
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Please login to continue</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <p className="register-text">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
