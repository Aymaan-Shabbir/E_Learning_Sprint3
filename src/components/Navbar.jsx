import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser?.email) {
      fetchData("users")
        .then((users) => {
          const found = users.find((u) => u.email === storedUser.email);
          if (found) {
            setUser({
              name: found.name || found.email,
              email: found.email,
              role: found.role,
            });
          } else {
            console.warn("User not found in DB.");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch users:", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#4d78b9",
        padding: "10px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="/assets/images/image.jpg"
          alt="EduSphere Logo"
          style={{ height: "50px" }}
        />
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        <Link to="/courses" style={linkStyle}>
          Courses
        </Link>
        <Link to="/toprated" style={linkStyle}>
          Top Rated Courses
        </Link>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <span
            className="dropdown-toggle"
            style={{
              color: "white",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
            data-bs-toggle="dropdown"
          >
            {user.name || "Profile"}
          </span>
          <ul className="dropdown-menu dropdown-menu-end text-center">
            <li>
              <h6 className="dropdown-header">{user.email || "Welcome"}</h6>
            </li>
            <li></li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Navbar;
