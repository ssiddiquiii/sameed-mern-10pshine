import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    
    <div className="group border border-slate-200 rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-base font-bold text-slate-900 line-clamp-1">
            {title}
          </h6>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn text-xl transition-all ${
            isPinned
              ? "text-blue-600 rotate-0"
              : "text-slate-300 -rotate-45 hover:text-slate-500"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content Section */}
      <div
        className="text-sm text-slate-600 mt-4 leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-wrap gap-1">
          {tags.map((item, index) => (
            <span
              key={index}
              className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* Action Buttons*/}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <MdCreate
            className="icon-btn text-slate-400 hover:text-green-600 text-lg transition-colors cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn text-slate-400 hover:text-red-500 text-lg transition-colors cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
