import React, { useEffect, useState } from "react";
import { fetchData } from "../api";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    const data = await fetchData("feedback");
    setFeedbacks(data);
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "20px" }}>All User Feedbacks</h2>
      <div style={grid}>
        {feedbacks.map((item, index) => (
          <div key={index} style={card}>
            <h4 style={{ color: "#4d78b9" }}>{item.courseTitle}</h4>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Feedback:</strong> {item.feedback}
            </p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              <strong>Date:</strong> {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const container = {
  padding: "20px",
  fontFamily: "Roboto, sans-serif",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const card = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  padding: "15px",
};

export default FeedbackPage;
