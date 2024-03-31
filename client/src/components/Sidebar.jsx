import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store.js";

const sidebarOptions = [
  {
    option: "Dashboard",
    urlSegment: "dashboard",
  },
  {
    option: "Add Product",
    urlSegment: "add-product",
  },
  {
    option: "Account",
    urlSegment: "account",
  },
];

export default function Sidebar() {
  const activeIndex = useStore((state) => state.activeIndex);
  // console.log(activeIndex)
  const changeActiveIndex = useStore((state) => state.changeActiveIndex);

  return (
    <div className="w-1/5 py-4 bg-light h-full flex flex-col justify-start items-center">
      {/* Logo */}
      <div className="pb-4 flex flex-col justify-start items-center font-head text-primary">
        <p className="text-4xl font-bold">verbatim</p>
        <p className="text-xs mt-[-5px]">manage your inventory</p>
      </div>

      {/* Sidebar Menu Options*/}
      <div className="w-full flex flex-col justify-start mt-6 px-2">
        {sidebarOptions.map((option, index) => {
          return (
            <Link key={Math.random()} to={`/panel/${option.urlSegment}`}>
              <div
                className={`w-full px-5 py-3 rounded-md text-center font-primary text-sm mb-3  transition-all duration-300 cursor-pointer ${
                  activeIndex == index
                    ? "bg-primary text-white"
                    : "text-black bg-white"
                }`}
                onClick={() => changeActiveIndex(index)}
              >
                {option.option}
              </div>
            </Link>
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
