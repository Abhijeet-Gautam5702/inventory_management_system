import React, { useEffect, useState } from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";
import ProtectedComponent from "../components/ProtectedComponent";

export default function Panel() {
  return (
    <ProtectedComponent>
      <div className="w-full h-screen bg-white flex flex-row justify-start items-center">
        <Sidebar />
        <Outlet />
      </div>
    </ProtectedComponent>
  );
}
