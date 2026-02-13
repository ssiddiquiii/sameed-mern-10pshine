import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

describe("🔑 ForgotPassword Page", () => {
  test("✅ Should render email input", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>,
    );

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Link/i }),
    ).toBeInTheDocument();
  });
});
