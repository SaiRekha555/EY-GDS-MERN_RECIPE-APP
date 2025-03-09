import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? <Login /> : <Register />}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register Here" : "Login Here"}
        </button>
      </p>
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://ey-gds-mern-recipe-app-backend.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      {error && <p className="error-text">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://ey-gds-mern-recipe-app-backend.onrender.com/auth/register", {
        username,
        password,
      });
      setMessage("Registration successful! Please log in.");
    } catch (error) {
      setMessage("Error registering. Try a different username.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      {message && <p className="success-text">{message}</p>}
      <button type="submit">Register</button>
    </form>
  );
};
