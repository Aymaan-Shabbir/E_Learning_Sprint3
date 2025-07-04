// FeedbackPage.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FeedbackPage from "../pages/FeedbackPage"; // Update path based on your structure
import * as api from "../api"; // Path to your actual API utility

jest.mock("../api"); // Mock the API module

describe("FeedbackPage", () => {
  const mockFeedbacks = [
    {
      id: "1",
      courseId: "71c0",
      courseTitle: "JavaScript Essentials",
      name: "Arya",
      email: "a@gmail.com",
      feedback: "Great course on JavaScript fundamentals!",
      date: "2025-07-04 10:45:00",
    },
  ];

  beforeEach(() => {
    api.fetchData.mockResolvedValue(mockFeedbacks);
  });

  test("renders feedbacks correctly", async () => {
    render(<FeedbackPage />);

    await waitFor(() => {
      expect(screen.getByText(/JavaScript Essentials/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Arya/i)).toBeInTheDocument();
    expect(screen.getByText(/a@gmail.com/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Great course on JavaScript fundamentals!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/2025-07-04 10:45:00/i)).toBeInTheDocument();
  });
});
