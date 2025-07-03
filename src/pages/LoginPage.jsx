import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchData } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchData("users");
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    loadUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );
  
  if (foundUser) {
    localStorage.setItem("userRole", foundUser.role); // Save role
    alert("Login successful!");
    navigate("/home");
  } else {
    setError("Invalid credentials");
  }
};

  return (
    <div
      style={{
        background: "url(\"/assets/images/login1.jpg\") no-repeat center center fixed",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Lobster', cursive",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "rgba(22, 28, 93, 0.75)",
          padding: "60px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          color: "white",
          width: "300px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Login
        </button>
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ffd700" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "none",
  borderRadius: "5px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#FFD700",
  color: "#161C5D",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default LoginPage;
