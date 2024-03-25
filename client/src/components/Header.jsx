import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[13vh] px-5 py-3.5 flex flex-row justify-between items-center bg-black text-white w-full font-primary">
      <div className="flex flex-col justify-start items-center font-head">
        <p className="text-4xl">verbatim</p>
        <p className="text-xs mt-[-5px]">manage your inventory</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-row justify-center items-center">
        <Link to={"/register"}>
          <div className="mr-5 cursor-pointer bg-transparent px-10 py-2.5 border-solid rounded-md border-[1.4px] border-transparent hover:font-semibold hover:text-secondary transition-all duration-400 ">
            Register
          </div>
        </Link>
        <Link to={"/login"}>
          <div className=" cursor-pointer bg-transparent px-10 py-2.5 border-solid rounded-md border-[1.5px] border-white  hover:border-primary gradient-btn transition-colors duration-400 ">
            Login
          </div>
        </Link>
      </div>
    </header>
  );
}
