import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/users/forgot-password", {
        email,
      });
      if (response.data && !response.data.error) {
        alert("Link console mein check karein (Backend Terminal)!");
      }
    } catch (err) {
        setError("Error sending email");
        console.log(err);
        
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-slate-50">
        <div className="w-96 bg-white border rounded-2xl shadow-xl px-8 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-bold mb-4">Forgot Password</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button className="btn-primary mt-4 w-full">Send Link</button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm text-blue-500 underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;