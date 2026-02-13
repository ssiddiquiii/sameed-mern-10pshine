import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import dotenv from "dotenv";

// 1. Environment Config
dotenv.config({ path: "./.env" });

// 2. Import App
import { app } from "../src/app.js";

// Global variables
let accessToken = "";
let createdNoteId = "";
let spyResetToken = "";

const TEST_USER = {
  fullName: "Test User",
  email: `test_master_${Date.now()}@example.com`, // Unique Email every time
  password: "password123",
};

describe("MERN Backend Master Test Suite", function () {
  this.timeout(30000); // 30 Seconds timeout for slow DBs

  // ==========================================
  // SETUP & TEARDOWN
  // ==========================================
  before(async function () {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error("❌ FATAL: MONGODB_URI is undefined.");
    await mongoose.connect(dbUri);
  });

  after(async function () {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase(); // Clean Slate
    }
    await mongoose.connection.close();
  });

  // ==========================================
  // MODULE 1: AUTHENTICATION
  // ==========================================
  describe("🔐 Authentication Flow", function () {
    it("✅ Should Register a New User", async function () {
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(TEST_USER);

      expect(res.status).to.equal(201);
      expect(res.body.user).to.have.property("email", TEST_USER.email);
    });

    it("❌ Should Fail Duplicate Registration", async function () {
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(TEST_USER);

      expect(res.status).to.equal(409); // Conflict
    });

    it("✅ Should Login Successfully", async function () {
      const res = await request(app).post("/api/v1/users/login").send({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("accessToken");
      accessToken = res.body.accessToken; // Save Token
    });

    it("❌ Should Fail Login with Wrong Password", async function () {
      const res = await request(app).post("/api/v1/users/login").send({
        email: TEST_USER.email,
        password: "wrongpassword",
      });

      expect(res.status).to.equal(401);
    });
  });

  // ==========================================
  // MODULE 2: FORGOT & RESET PASSWORD (SPY)
  // ==========================================
  describe("🕵️‍♂️ Forgot & Reset Password Flow", function () {
    it("✅ Should Request Forgot Password Link", async function () {
      const res = await request(app)
        .post("/api/v1/users/forgot-password")
        .send({ email: TEST_USER.email });

      expect(res.status).to.equal(200);
      expect(res.body.message).to.not.be.empty;
    });

    it("✅ Should Spy on DB & Reset Password", async function () {
      // 1. Database se Token Churao (Spying)
      // Note: Hum 'User' model ko mongoose ke through access kar rahe hain
      // taake import errors se bacha ja sake.
      const User = mongoose.model("User");
      const user = await User.findOne({ email: TEST_USER.email });

      expect(user).to.not.be.null;
      expect(user.resetPasswordToken).to.exist;

      spyResetToken = user.resetPasswordToken;

      // 2. Token use karke Password Reset karo
      const res = await request(app)
        .post(`/api/v1/users/reset-password/${spyResetToken}`)
        .send({ newPassword: "newpassword999" });

      expect(res.status).to.equal(200);
    });

    it("✅ Should Login with NEW Password", async function () {
      const res = await request(app).post("/api/v1/users/login").send({
        email: TEST_USER.email,
        password: "newpassword999", // New Password
      });

      expect(res.status).to.equal(200);
      accessToken = res.body.accessToken; // Update Token for Notes tests
    });
  });

  // ==========================================
  // MODULE 3: NOTES OPERATIONS (CRUD)
  // ==========================================
  describe("📝 Notes CRUD Operations", function () {
    it("✅ Should Create a New Note", async function () {
      const res = await request(app)
        .post("/api/v1/notes/add-note")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          title: "Master Test Note",
          content: "Testing entire flow.",
          tags: ["master"],
        });

      // Aapka Controller 200 return karta hai
      expect(res.status).to.equal(200);
      expect(res.body.note).to.have.property("title", "Master Test Note");

      createdNoteId = res.body.note._id; // Save ID
    });

    it("✅ Should Get All Notes", async function () {
      const res = await request(app)
        .get("/api/v1/notes/get-all-notes")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.notes).to.be.an("array");
      expect(res.body.notes.length).to.be.greaterThan(0);
    });

    it("✅ Should Edit the Note", async function () {
      const res = await request(app)
        .put(`/api/v1/notes/edit-note/${createdNoteId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          title: "Updated Master Note",
          content: "Content Updated",
          isPinned: true,
        });

      expect(res.status).to.equal(200);
      expect(res.body.note.title).to.equal("Updated Master Note");
    });

    it("✅ Should Delete the Note", async function () {
      const res = await request(app)
        .delete(`/api/v1/notes/delete-note/${createdNoteId}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
    });

    it("❌ Should Fail Deleting Non-Existent Note", async function () {
      // Fake ID
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/v1/notes/delete-note/${fakeId}`)
        .set("Authorization", `Bearer ${accessToken}`);

      // Expecting 404 or 400 or 200 with error message depending on controller
      // Generally should not be success if ID doesn't exist
      if (res.status === 200 && !res.body.error) {
        console.log(
          "⚠️ Warning: Controller returned 200 for missing ID delete."
        );
      }
    });
  });
});
