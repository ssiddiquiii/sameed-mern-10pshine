import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";

describe("👤 SignUp Page Tests", () => {
  test("✅ Should render Registration Form", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
    );

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account|Sign Up/i }),
    ).toBeInTheDocument();
  });

  test("✅ Should display error if Name is missing", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
    );

    // Fill email but leave name empty
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@abc.com" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Create Account|Sign Up/i }),
    );

    expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
  });
});
