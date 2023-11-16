"use client";

import Newchat from "./Newchat";
import Newcalculate from "./Newcalculate"

function AddNew() {

  return (
    <div className="border-[#10E5B2] border-2 rounded-lg">
      <div className="flex items-center justify-center p-2 text-[#10E5B2]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>

        <p>New chat</p>
      </div>

      <div className="flex mx-2">
        <Newchat/>
        <Newcalculate/>
      </div>
    </div>
  );
}

export default AddNew;
