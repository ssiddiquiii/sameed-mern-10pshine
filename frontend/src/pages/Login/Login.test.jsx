import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

describe("🔐 Login Page Tests", () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
  };

  test("✅ Should render Email and Password inputs", () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("✅ Should update input values on typing", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  test("✅ Should show error on empty submit", () => {
    renderLogin();
    const loginBtn = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(loginBtn);
    // Assuming you display "Please enter a valid email address." or similar
    // Using regex to match partial text
    expect(screen.getByText(/valid email|required/i)).toBeInTheDocument();
  });

  test("✅ Should have link to Create Account", () => {
    renderLogin();
    const signUpLink = screen.getByText(/Create an Account/i);
    expect(signUpLink).toBeInTheDocument();
  });
});
