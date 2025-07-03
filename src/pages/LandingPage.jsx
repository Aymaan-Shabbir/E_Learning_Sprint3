import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <nav
        style={{
          backgroundColor: "#4d78b9",
          padding: "10px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <img
            src="/assets/images/image.jpg"
            alt="EduSphere Logo"
            style={{ height: "50px" }}
          />
        </Link>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        </div>
      </nav>

      <section
        className="hero"
        style={{
          textAlign: "center",
          padding: "80px 20px",
          height: "400px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./assets/images/bg.jpg')",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            color: "white",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgb(31, 118, 211)",

            marginTop: "90px",
          }}
        >
          Welcome to EduSphere
        </h1>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bolder",
            textShadow: "2px 2px 4px rgb(255, 255, 255)",
          }}
        >
          Creating Opportunities • Discovering You
        </p>
      </section>

      <section style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2>Featured Courses</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {[
            {
              title: "Web Development",
              desc: "Learn HTML, CSS, JavaScript and more!",
              img: "course 1.jpg",
              category: "programming",
            },
            {
              title: "Programming",
              desc: "Master programming languages from beginner to advanced level.",
              img: "course 5.jpg",
              category: "programming",
            },
            {
              title: "Data Science",
              desc: "Get started with data analysis and machine learning.",
              img: "course 10.jpg",
              category: "data-science",
            },
            {
              title: "UI/UX Design",
              desc: "Design modern and engaging user experiences.",
              img: "course 7.png",
              category: "design",
            },
          ].map((course, idx) => (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={`/assets/images/${course.img}`}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3 style={{ marginTop: "15px" }}>{course.title}</h3>
              <p>{course.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
