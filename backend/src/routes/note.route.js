import { Router } from "express";
import {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updateNotePinned,
} from "../controllers/note.controller.js";
import { authenticateToken } from "../utils/Jwt.js"; // Ensure this matches where you saved your middleware!

const router = Router();

// All Note Routes
router.post("/add", authenticateToken, addNote);
router.put("/edit/:noteId", authenticateToken, editNote);
router.get("/get-all", authenticateToken, getAllNotes);
router.delete("/delete/:noteId", authenticateToken, deleteNote);
router.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned);

export default router;
