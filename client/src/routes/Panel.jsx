import React, { useState } from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export default function Panel() {
  return (
    <div className="w-full h-screen bg-white flex flex-row justify-start items-center">
      <Sidebar />
      <Outlet />
    </div>
  );
}
