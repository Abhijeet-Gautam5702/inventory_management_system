import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-row justify-between items-center text-white w-full h-[84vh] p-10  font-primary">
      <div className="w-1/2 flex flex-col justify-start items-start">
        <h1 className=" font-bold text-6xl leading-[63px]">
          Inventory and Stock Management System
        </h1>
        <p className="text-lg mt-4">
          Streamline your inventory and stock management with our powerful and
          intuitive system.
        </p>
      </div>
      {/* Image of the dashboard */}
      <div className="w-1/2 ml-10 flex flex-row justify-center items-center h-full">
        <div className=" rounded-2xl bg-white text-black text-center h-4/5 w-full"></div>
      </div>
    </div>
  );
}
