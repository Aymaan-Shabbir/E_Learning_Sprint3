import React, { useEffect, useState } from "react";
import { fetchData } from "../api";

const TopRatedCourses = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchData("courses");
        const filtered = data.filter((course) => course.reviews >= 4);
        setTopRated(filtered);
      } catch (error) {
        console.error("Error fetching top-rated courses:", error);
      }
    };
    loadCourses();
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const topRatedChunks = chunkArray(topRated, 3);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Top Rated Courses
      </h2>

      <div
        id="topRatedCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {topRatedChunks.map((chunk, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div
                className="d-flex justify-content-center gap-4"
                style={{ padding: "20px" }}
              >
                {chunk.map((course) => (
                  <div
                    key={course.id}
                    className="card"
                    style={{
                      width: "18rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: "160px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p
                        className="card-text"
                        style={{
                          fontSize: "14px",
                          height: "60px",
                          overflow: "hidden",
                        }}
                      >
                        {course.description}
                      </p>
                      <p className="text-warning fw-bold mb-2">
                        ★ {course.reviews}
                      </p>
                      <button className="btn btn-warning btn-sm w-100">
                        Enroll
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#topRatedCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#topRatedCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default TopRatedCourses;
