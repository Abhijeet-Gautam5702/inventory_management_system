import React from "react";
import { Link, useNavigate } from "react-router-dom";

const sidebarOptions = ["Dashboard", "Add Product", "Account"];

export default function Sidebar() {
  return (
    <div className="w-[15vw] py-4 bg-light h-full flex flex-col justify-start items-center">
      {/* Logo */}
      <div className="pb-4 flex flex-col justify-start items-center font-head text-primary">
        <p className="text-4xl font-bold">verbatim</p>
        <p className="text-xs mt-[-5px]">manage your inventory</p>
      </div>

      {/* Sidebar Menu Options*/}
      <div className="w-full flex flex-col justify-start items-center mt-6 px-2">
        {sidebarOptions.map((option) => {
          return (
            <div className="w-full px-5 py-3 rounded-md text-center text-black font-primary text-sm mb-3 bg-white hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
              {option}
            </div>
          );
        })}
      </div>

      {/* Logout Prompt */}
      <p className="mt-auto text-sm text-primary cursor-pointer hover:font-semibold hover:text-lg transition-all duration-400">
        <Link to={"/"}>Logout</Link>
      </p>
    </div>
  );
}
