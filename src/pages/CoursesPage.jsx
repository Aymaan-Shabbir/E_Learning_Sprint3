import React, { useEffect, useState } from "react";
import { fetchData, deleteData, postData, updateData } from "../api";
import { Link } from "react-router-dom";

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
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [currentCourseForInstructor, setCurrentCourseForInstructor] =
    useState(null);
  const [instructorData, setInstructorData] = useState({
    name: "",
    email: "",
    specialization: "",
  });

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
    setFeedbackForm({ name: "", email: "", feedback: "" });
    setShowReviewModal(true);
  };

  const submitFeedback = async () => {
    const { name, email, feedback } = feedbackForm;
    if (!name || !email || !feedback) {
      alert("Please fill in all fields.");
      return;
    }

    const newFeedback = {
      courseId: currentReviewCourse.id,
      courseTitle: currentReviewCourse.title,
      name,
      email,
      feedback,
      date: new Date().toLocaleString(),
    };

    await postData("feedback", newFeedback);
    alert("Feedback submitted!");
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

  const openAssignInstructorModal = (course) => {
    setCurrentCourseForInstructor(course);
    setInstructorData(
      course.instructor || { name: "", email: "", specialization: "" }
    );
    setShowAssignModal(true);
  };

  const handleInstructorInput = (e) => {
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  };

  const saveInstructor = async () => {
    const { name, email, specialization } = instructorData;
    if (!name || !email || !specialization) {
      alert("Please fill all instructor fields.");
      return;
    }

    const updatedCourse = {
      ...currentCourseForInstructor,
      instructor: instructorData,
    };

    await updateData("courses", currentCourseForInstructor.id, updatedCourse);
    alert("Instructor assigned successfully!");
    setShowAssignModal(false);
    loadCourses();
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
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            style={{ ...btn, backgroundColor: "green" }}
            onClick={handleAdd}
          >
            + Add New Course
          </button>
          <Link
            to="/instructors"
            style={{
              ...btn,
              backgroundColor: "#6c63ff",
              marginLeft: "10px",
              textDecoration: "none",
              color: "#fff",
              padding: "10px 10px",
            }}
          >
            View Instructors
          </Link>
          <Link
            to="/feedback"
            style={{
              ...btn,
              backgroundColor: "#6c63ff",
              marginLeft: "10px",
              textDecoration: "none",
              color: "#fff",
              padding: "10px 10px",
            }}
          >
            Feedbacks
          </Link>
        </div>
      )}

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

      <div style={grid}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={card}>
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
              <div style={{ height: "200px" }}>
                <h5>{course.title}</h5>
                <p>{course.description}</p>
                <p>
                  <strong>Category:</strong> {course.category}
                </p>
                <p>⭐ {course.reviews} Reviews</p>
                {course.instructor && (
                  <p style={{ fontSize: "17px", color: "green" }}>
                    👨‍🏫 <strong>Instructor:</strong> {course.instructor.name}
                  </p>
                )}
              </div>
              <div style={buttonGroup}>
                <button style={btn} onClick={() => handlePreview(course.video)}>
                  Preview
                </button>
                {userRole === "user" && (
                  <button style={btn} onClick={() => handleReview(course)}>
                    Review
                  </button>
                )}
                {userRole === "admin" && (
                  <>
                    <button
                      style={{ ...btn, backgroundColor: "#6c63ff" }}
                      onClick={() => openAssignInstructorModal(course)}
                    >
                      Assign Instructor
                    </button>
                    <button
                      style={{ ...btn, backgroundColor: "green" }}
                      onClick={() => handleEdit(course)}
                    >
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

      {/* Feedback Modal */}
      {showReviewModal && currentReviewCourse && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowReviewModal(false)} style={closeBtn}>
              ❌
            </button>
            <h3>Feedback for {currentReviewCourse.title}</h3>
            {["name", "email", "feedback"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={feedbackForm[field]}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, [field]: e.target.value })
                }
                style={{ ...input, marginBottom: "10px" }}
              />
            ))}
            <button onClick={submitFeedback} style={btn}>
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {/* Instructor and Course Modals can go here... (already handled above) */}
      {showAssignModal && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowAssignModal(false)} style={closeBtn}>
              ❌
            </button>
            <h3>Assign Instructor</h3>
            {["name", "email", "specialization"].map((field) => (
              <input
                key={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={instructorData[field]}
                onChange={handleInstructorInput}
                style={{ ...input, marginBottom: "10px" }}
              />
            ))}
            <button onClick={saveInstructor} style={btn}>
              Save Instructor
            </button>
          </div>
        </div>
      )}
      {showCourseModal && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <button onClick={() => setShowCourseModal(false)} style={closeBtn}>
              ❌
            </button>
            <h3>{isEditing ? "Edit Course" : "Add New Course"}</h3>
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
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={courseForm[field]}
                onChange={handleCourseInput}
                style={{ ...input, marginBottom: "10px" }}
              />
            ))}
            <button onClick={saveCourse} style={btn}>
              {isEditing ? "Update Course" : "Save Course"}
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
const buttonGroup = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: "20px",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
  marginBottom: "10px",
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
