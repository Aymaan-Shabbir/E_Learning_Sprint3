import React from "react";

const HomePage = () => {
  const featuredCourses = [
    {
      title: "Web Development",
      img: "course 1.jpg",
      category: "programming",
      desc: "Learn HTML, CSS, JavaScript and more!",
    },
    {
      title: "Programming",
      img: "course 5.jpg",
      category: "programming",
      desc: "Master programming languages from beginner to advanced level.",
    },
    {
      title: "Data Science",
      img: "course 10.jpg",
      category: "data-science",
      desc: "Get started with data analysis and machine learning.",
    },
    {
      title: "UI/UX Design",
      img: "course 7.png",
      category: "design",
      desc: "Design modern and engaging user experiences.",
    },
  ];

  const testimonials = [
    {
      quote: "EduSphere helped me get my first job as a web developer!",
      author: "Priya S.",
    },
    {
      quote:
        "The Python course was very beginner friendly and well-structured.",
      author: "Arjun R.",
    },
    {
      quote:
        "Excellent content and very responsive mentors. Highly recommended.",
      author: "Sneha M.",
    },
    {
      quote: "The UI/UX design course gave me the confidence to freelance!",
      author: "Rahul T.",
    },
    {
      quote: "Great support from instructors and a very practical curriculum.",
      author: "Neha D.",
    },
    {
      quote: "The data science track was intense but totally worth it!",
      author: "Kunal M.",
    },
  ];

  return (
    <div style={{ fontFamily: "Roboto, sans-serif" }}>
      {/* Hero Section */}
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

      {/* Featured Courses */}
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
          {featuredCourses.map((course, i) => (
            <a
              key={i}
              href={`/courses?category=${course.category}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  width: "250px",
                  height: "320px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={`/assets/images/${course.img}`}
                  alt={course.title}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ marginTop: "15px" }}>{course.title}</h3>
                <p>{course.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          backgroundColor: "#eef3f8",
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <h2>What Our Learners Say</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <p>"{t.quote}"</p>
              <h4>— {t.author}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
