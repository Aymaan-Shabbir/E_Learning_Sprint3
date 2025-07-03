import React, { useEffect, useState } from "react";
import { fetchData, deleteData, postData, updateData } from "../api";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState("user");

  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReviewCourse, setCurrentReviewCourse] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "",
    description: "",
    video: "",
    thumbnail: "",
    reviews: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "user";
    setUserRole(role);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await fetchData("courses");
    setCourses(data);
    setFilteredCourses(data);
    const uniqueCats = [...new Set(data.map((c) => c.category))];
    setCategories(uniqueCats);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterCourses(value, searchTerm);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterCourses(selectedCategory, value);
  };

  const filterCourses = (category, search) => {
    let updated = [...courses];
    if (category !== "all") {
      updated = updated.filter((c) => c.category === category);
    }
    if (search) {
      updated = updated.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCourses(updated);
  };

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const handleReview = (course) => {
    setCurrentReviewCourse(course);
    setReviewText("");
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (!reviewText.trim()) return alert("Please enter a review.");
    alert(`Review submitted for ${currentReviewCourse.title}: ${reviewText}`);
    setShowReviewModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteData("courses", id);
      loadCourses();
    }
  };

  const handleEdit = (course) => {
    setCourseForm(course);
    setIsEditing(true);
    setShowCourseModal(true);
  };

  const handleAdd = () => {
    setCourseForm({
      title: "",
      category: "",
      description: "",
      video: "",
      thumbnail: "",
      reviews: "",
    });
    setIsEditing(false);
    setShowCourseModal(true);
  };

  const handleCourseInput = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const saveCourse = async () => {
    const requiredFields = [
      "title",
      "category",
      "description",
      "video",
      "thumbnail",
      "reviews",
    ];
    for (let key of requiredFields) {
      if (!courseForm[key]) {
        alert("Please fill all fields.");
        return;
      }
    }
    if (isEditing) {
      await updateData("courses", courseForm.id, courseForm);
    } else {
      await postData("courses", courseForm);
    }
    setShowCourseModal(false);
    loadCourses();
  };

  return (
    <div style={container}>
      {userRole === "admin" && (
        <div style={topRight}>
          <button style={btnSuccess} onClick={handleAdd}>
            + Add New Course
          </button>
        </div>
      )}

      {/* Filter */}
      <div style={formGroup}>
        <label htmlFor="categoryFilter" style={label}>
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          onChange={handleFilter}
          value={selectedCategory}
          style={select}
        >
          <option value="all">All</option>
          {categories.map((cat, idx) => (
            <option value={cat} key={idx}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div style={formGroup}>
        <label htmlFor="searchInput" style={label}>
          Search Courses by Title:
        </label>
        <input
          type="text"
          id="searchInput"
          style={input}
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Courses */}
      <div style={grid}>
        {filteredCourses.map((course, idx) => (
          <div key={idx} style={card}>
            <img
              src={course.thumbnail}
              alt={course.title}
              style={cardImg}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image")
              }
            />
            <div style={{ padding: "10px" }}>
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <p>
                <strong>Category:</strong> {course.category}
              </p>
              <p>⭐ {course.reviews}</p>
              <div style={buttonGroup}>
                <button style={btn} onClick={() => handlePreview(course.video)}>
                  Preview
                </button>
                <button style={btn} onClick={() => handleReview(course)}>
                  Review
                </button>
                <button style={btn}>Enroll</button>
                {userRole === "admin" && (
                  <>
                    <button style={btn} onClick={() => handleEdit(course)}>
                      Edit
                    </button>
                    <button
                      style={{ ...btn, backgroundColor: "red" }}
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowPreview(false)} style={closeBtn}>
              ❌
            </button>
            <iframe
              width="100%"
              height="300"
              src={previewUrl}
              title="Preview"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && currentReviewCourse && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowReviewModal(false)} style={closeBtn}>
              ❌
            </button>
            <h3>{currentReviewCourse.title}</h3>
            <textarea
              placeholder="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={input}
            />
            <button onClick={submitReview} style={btn}>
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showCourseModal && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowCourseModal(false)} style={closeBtn}>
              ❌
            </button>
            <h3>{isEditing ? "Edit Course" : "Add Course"}</h3>
            {[
              "title",
              "category",
              "description",
              "video",
              "thumbnail",
              "reviews",
            ].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={courseForm[field]}
                onChange={handleCourseInput}
                style={{ ...input, marginBottom: "10px" }}
              />
            ))}
            <button onClick={saveCourse} style={btn}>
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Styles
const container = { padding: "20px", fontFamily: "Roboto, sans-serif" };
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
};
const cardImg = {
  width: "100%",
  height: "250px",
  objectFit: "contain",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
};
const formGroup = { marginBottom: "20px" };
const label = { fontWeight: "bold", marginRight: "10px" };
const select = {
  padding: "6px 10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const input = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};
const btn = {
  padding: "6px 10px",
  backgroundColor: "#4d78b9",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  margin: "5px 5px 0 0",
  cursor: "pointer",
};
const btnSuccess = {
  ...btn,
  backgroundColor: "green",
};
const buttonGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "10px",
};
const topRight = {
  textAlign: "right",
  marginBottom: "20px",
};
const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalContent = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
  position: "relative",
};
const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

export default CoursesPage;
