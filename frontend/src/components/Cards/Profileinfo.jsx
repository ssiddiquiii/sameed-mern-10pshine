import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Circle */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 font-semibold bg-blue-50 border border-blue-100 shadow-sm">
        {getInitials(userInfo?.fullName)}
      </div>

      <div className="hidden md:block">
        <p className="text-sm font-semibold text-slate-800">
          {userInfo?.fullName}
        </p>
        <button
          className="text-xs text-red-500 font-medium hover:text-red-700 hover:underline transition-all"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
