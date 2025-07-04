import React, { useEffect, useState } from "react";
import { fetchData } from "../api";

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", specialization: "" });

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [instructorData, setInstructorData] = useState({
    name: "",
    email: "",
    specialization: "",
  });

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    const courses = await fetchData("courses");
    const seen = new Set();
    const uniqueInstructors = [];

    for (const course of courses) {
      const inst = course.instructor;
      if (inst && inst.email && !seen.has(inst.email)) {
        seen.add(inst.email);
        uniqueInstructors.push(inst);
      }
    }

    setInstructors(uniqueInstructors);
  };

  const filteredInstructors = instructors.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (idx) => {
    setEditingIndex(idx);
    setForm(instructors[idx]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setForm({ name: "", email: "", specialization: "" });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const updated = [...instructors];
    updated[editingIndex] = form;
    setInstructors(updated);
    cancelEdit();
  };

  const handleDelete = (idx) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this instructor?"
    );
    if (confirmed) {
      const updated = instructors.filter((_, i) => i !== idx);
      setInstructors(updated);
    }
  };

  const handleInstructorInput = (e) => {
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  };

  const saveInstructor = () => {
    if (
      instructorData.name &&
      instructorData.email &&
      instructorData.specialization
    ) {
      setInstructors([...instructors, instructorData]);
      setInstructorData({ name: "", email: "", specialization: "" });
      setShowAssignModal(false);
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Instructors</h2>

      <input
        type="text"
        placeholder="Search instructors by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ ...inputStyle, marginBottom: "20px" }}
      />

      <button
        style={{ ...btn, marginBottom: "20px" }}
        onClick={() => setShowAssignModal(true)}
      >
        + Add Instructor
      </button>

      <div style={gridStyle}>
        {filteredInstructors.map((inst, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {editingIndex === idx ? (
              <>
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInput}
                  style={inputStyle}
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInput}
                  style={inputStyle}
                />
                <input
                  name="specialization"
                  placeholder="Specialization"
                  value={form.specialization}
                  onChange={handleInput}
                  style={inputStyle}
                />
                <button style={btn} onClick={saveEdit}>
                  Save
                </button>
                <button style={btnDanger} onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h4>{inst.name}</h4>
                <p>
                  <strong>Email:</strong> {inst.email}
                </p>
                <p>
                  <strong>Specialization:</strong> {inst.specialization}
                </p>
                <button style={btn} onClick={() => startEdit(idx)}>
                  Edit
                </button>
                <button style={btnDanger} onClick={() => handleDelete(idx)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

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
                style={{ ...inputStyle, marginBottom: "10px" }}
              />
            ))}
            <button onClick={saveInstructor} style={btn}>
              Save Instructor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100%",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const btn = {
  marginRight: "10px",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4d78b9",
  color: "white",
  cursor: "pointer",
};

const btnDanger = {
  ...btn,
  backgroundColor: "red",
};

const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContent = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  position: "relative",
  width: "300px",
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

export default InstructorsPage;
