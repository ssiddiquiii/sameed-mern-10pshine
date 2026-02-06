import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] border-slate-200 px-5 rounded-lg mb-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all duration-200">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none placeholder:text-slate-400 font-poppins"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-blue-500 cursor-pointer hover:text-blue-600 transition-all"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer hover:text-slate-600 transition-all"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
