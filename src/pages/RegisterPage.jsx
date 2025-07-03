import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postData } from "../api";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (
      !form.password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)
    ) {
      newErrors.password =
        "Password must be 6+ chars with uppercase, lowercase, number & special char";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await postData("users", form);
      alert("Registration successful!");
      navigate("/login");
    } catch {
      setErrors({ form: "Registration failed. Try again." });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={titleStyle}>Register</h1>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password}</p>}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {errors.form && <p style={errorStyle}>{errors.form}</p>}

        <button type="submit" style={buttonStyle}>
          Register
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#ffd700" }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

const containerStyle = {
  background: "url(\"/assets/images/login1.jpg\") no-repeat center center fixed",
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Lobster', cursive",
};

const formStyle = {
  backgroundColor: "rgba(22, 28, 93, 0.75)",
  padding: "60px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
  color: "white",
  width: "320px",
};

const titleStyle = { textAlign: "center", marginBottom: "30px" };
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
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
const errorStyle = { color: "red", fontSize: "14px", marginBottom: "8px" };

export default RegisterPage;
