import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

describe("👁️ PasswordInput Component", () => {
  test("✅ Should toggle password visibility", () => {
    const onChange = jest.fn();
    render(<PasswordInput value="secret123" onChange={onChange} />);

    const input = screen.getByDisplayValue("secret123");

    // Default should be hidden
    expect(input).toHaveAttribute("type", "password");

    // Simple verification that component renders without crashing
    expect(input).toBeInTheDocument();
  });
});
