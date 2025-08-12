import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import JobCard from "../components/JobCard"; // Adjust path as needed

describe("JobCard Component", () => {
  const mockOnBookmarkToggle = jest.fn();

  // The base set of props for our tests
  const mockProps = {
    id: "1",
    title: "Software Engineer",
    company: "Tech Corp",
    description: "A great job opportunity.",
    location: "Remote",
    image: "/placeholder.png",
    categories: ["IT", "Development"],
    mode: "Full-time",
    isBookmarked: false,
    isAuthenticated: true,
    onBookmarkToggle: mockOnBookmarkToggle,
    // --- FIX: Add the required 'isLoading' prop to our mock data ---
    isLoading: false,
  };

  // Clear mock history before each test to ensure clean test runs
  beforeEach(() => {
    mockOnBookmarkToggle.mockClear();
  });

  it("renders job details correctly", () => {
    render(<JobCard {...mockProps} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp • Remote")).toBeInTheDocument();
  });

  it("shows the bookmark button for authenticated users", () => {
    render(<JobCard {...mockProps} />);
    expect(screen.getByLabelText("Add bookmark")).toBeInTheDocument();
  });

  it("does not show the bookmark button for unauthenticated users", () => {
    // We override the 'isAuthenticated' prop for this specific test
    render(<JobCard {...mockProps} isAuthenticated={false} />);
    expect(screen.queryByLabelText(/bookmark/i)).not.toBeInTheDocument();
  });

  it("calls onBookmarkToggle when the bookmark button is clicked", () => {
    render(<JobCard {...mockProps} />);
    const bookmarkButton = screen.getByLabelText("Add bookmark");
    fireEvent.click(bookmarkButton);
    expect(mockOnBookmarkToggle).toHaveBeenCalledTimes(1);
  });

  it("displays the correct bookmark state (unbookmarked)", () => {
    render(<JobCard {...mockProps} isBookmarked={false} />);
    const button = screen.getByLabelText("Add bookmark");
    expect(button.querySelector("svg")).toHaveAttribute("fill", "none");
  });

  it("displays the correct bookmark state (bookmarked)", () => {
    render(<JobCard {...mockProps} isBookmarked={true} />);
    const button = screen.getByLabelText("Remove bookmark");
    expect(button.querySelector("svg")).toHaveAttribute("fill", "currentColor");
  });

  // --- FIX: Add a new test case for the loading state ---
  it("disables the bookmark button when isLoading is true", () => {
    // For this test, we override 'isLoading' to be true
    render(<JobCard {...mockProps} isLoading={true} />);

    const bookmarkButton = screen.getByLabelText("Add bookmark");

    // Check that the button is disabled
    expect(bookmarkButton).toBeDisabled();

    // Check that the opacity and cursor classes are applied
    expect(bookmarkButton).toHaveClass("opacity-50", "cursor-not-allowed");
  });
});
