import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import TopRatedCourses from "./pages/TopRatedCourses";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ✅ AppWrapper handles layout rendering
const AppWrapper = () => {
  const location = useLocation();

  const isMinimalLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!isMinimalLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/toprated" element={<TopRatedCourses />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
      {!isMinimalLayout && <Footer />}
    </>
  );
};

// ✅ Main App with Router
const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
