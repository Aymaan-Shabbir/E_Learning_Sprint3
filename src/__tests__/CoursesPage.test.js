import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CoursesPage from "../pages/CoursesPage";

// Mocking the global fetch API before each test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "JavaScript Essentials",
            description:
              "Learn the basics of JavaScript including syntax and DOM.",
            image: "course1.jpg",
            instructor: { name: "Aman Verma" },
            reviews: "4.6",
            category: "programming",
            video: "https://video-link.com/1",
            thumbnail: "thumb1.jpg",
          },
          {
            id: 2,
            title: "Advanced CSS",
            description:
              "Master Flexbox, Grid, transitions, and responsive design.",
            image: "course2.png",
            instructor: { name: "Neha Sharma" },
            reviews: "4.8",
            category: "design",
            video: "https://video-link.com/2",
            thumbnail: "thumb2.jpg",
          },
        ]),
    })
  );
});

// Clear all mocks after each test to avoid test contamination
afterEach(() => {
  jest.clearAllMocks();
});

describe("CoursesPage", () => {
  // ✅ Test if course titles from API are rendered on the page
  test("renders course titles from API", async () => {
    render(<CoursesPage />);

    // Wait for the course titles to appear
    await waitFor(() => {
      expect(screen.getByText("JavaScript Essentials")).toBeInTheDocument();
      expect(screen.getByText("Advanced CSS")).toBeInTheDocument();
    });
  });

  // ✅ Test if the correct number of course cards are rendered
  test("renders correct number of course cards", async () => {
    render(<CoursesPage />);

    // Wait and get all <h5> heading elements (used for course titles)
    await waitFor(() => {
      const courseCards = screen.getAllByRole("heading", { level: 5 });
      expect(courseCards).toHaveLength(2); // Should match number of mock courses
    });
  });

  // ✅ Test filtering functionality using the category dropdown
  test("filters courses by category", async () => {
    render(<CoursesPage />);

    // Get the dropdown to filter by category
    const categorySelect = await screen.findByLabelText(/filter by category/i);

    // Ensure the options exist before interacting
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "programming" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "design" })
      ).toBeInTheDocument();
    });

    // Simulate selecting the "design" category
    fireEvent.change(categorySelect, { target: { value: "design" } });

    // Assert that only "Advanced CSS" is shown and "JavaScript Essentials" is hidden
    await waitFor(() => {
      expect(screen.getByText("Advanced CSS")).toBeInTheDocument();
      expect(
        screen.queryByText("JavaScript Essentials")
      ).not.toBeInTheDocument();
    });
  });
});
