import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react"; // Import toast
import "./RegisterPage.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://seat-booking-system-backend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Auto-login after registration
      const res = await axios.post(`${process.env.BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      setToken(res.data.token);

      toast({
        title: "Registration Successful",
        description: "You are now logged in!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/app");
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Account 🎉</h2>
        <p className="register-subtitle">Join us by filling the form below</p>

        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" onClick={handleRegister}>
          Register
        </button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
