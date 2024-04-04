import React, { useEffect } from "react";
import useStore from "../store/store";

export default function Dashboard() {
  const changeActiveIndex = useStore((state) => state.changeActiveIndex);

  useEffect(() => {
    changeActiveIndex(0);
  }, []);
  return (
    <div className="flex flex-row justify-center items-center text-center w-full h-full bg-yellow">
      <p className="font-primary">Dashboard</p>
    </div>
  );
}
