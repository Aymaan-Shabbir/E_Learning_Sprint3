import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Read loggedInUser object from localStorage
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const role = storedUser.role || "Welcome";
  const name = storedUser.name || "User";

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
            {role}
          </span>
          <ul className="dropdown-menu dropdown-menu-end text-center">
            <li>
              <span className="dropdown-item-text text-muted">{role}</span>
            </li>
            <li>
              <h6 className="dropdown-header">{name || "Unknown"}</h6>
            </li>
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
