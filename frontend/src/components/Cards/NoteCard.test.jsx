import React from "react";
import { render, screen } from "@testing-library/react";
import NoteCard from "./NoteCard";
import "@testing-library/jest-dom";

describe("📝 NoteCard Component Tests", () => {
  //  FIX: Date ko valid ISO format mein diya hai
  const mockNote = {
    title: "Project Alpha",
    date: "2026-02-10",
    content: "Deploying MERN stack app to production.",
    tags: ["work", "urgent"],
    isPinned: true,
  };

  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onPinNote = jest.fn();

  test("✅ Should render note details correctly", () => {
    render(
      <NoteCard
        title={mockNote.title}
        date={mockNote.date}
        content={mockNote.content}
        tags={mockNote.tags}
        isPinned={mockNote.isPinned}
        onEdit={onEdit}
        onDelete={onDelete}
        onPinNote={onPinNote}
      />,
    );

    // Title check
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();

    // Content check
    expect(
      screen.getByText("Deploying MERN stack app to production."),
    ).toBeInTheDocument();

    // Tag check
    expect(screen.getByText("#work")).toBeInTheDocument();

    //  DATE CHECK: Moment '2026-02-10' ko '10th Feb 2026' banayega
    expect(screen.getByText("10th Feb 2026")).toBeInTheDocument();
  });
});
