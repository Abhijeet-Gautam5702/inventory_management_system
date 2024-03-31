import React, { useState } from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export default function Panel() {
  const [activeIndex, setActiveIndex] = useState(0);
  function handleActiveIndexChange(newIndex) {
    setActiveIndex(newIndex);
  }
  return (
    <div className="w-full h-screen bg-white flex flex-row justify-start items-center">
      <Sidebar
        activeIndex={activeIndex}
        handleActiveIndexChange={handleActiveIndexChange}
      />
      <Outlet/>
    </div>
  );
}
