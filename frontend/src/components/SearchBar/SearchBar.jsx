import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-50 border border-slate-200 rounded-full hover:shadow-sm transition-all duration-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent py-2.75 outline-none placeholder:text-slate-400 text-slate-700"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-400 cursor-pointer hover:text-black mr-3 transition-colors"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
