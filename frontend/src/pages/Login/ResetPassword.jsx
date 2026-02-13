import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/users/reset-password/${token}`,
        {
          newPassword: password,
        },
      );
      if (response.data && !response.data.error) {
        alert("Password Changed!");
        navigate("/login");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-slate-50">
        <div className="w-96 bg-white border rounded-2xl shadow-xl px-8 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-bold mb-4">New Password</h4>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary mt-4 w-full">Update Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
