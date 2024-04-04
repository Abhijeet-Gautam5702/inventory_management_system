import React,{useEffect} from "react";
import useStore from "../store/store";

export default function Account() {
  const changeActiveIndex = useStore((state) => state.changeActiveIndex);

  useEffect(() => {
    changeActiveIndex(2);
  }, []);
  return (
    <div className="flex flex-row justify-center items-center text-center w-full h-full bg-yellow">
      <p className="font-primary">Account</p>
    </div>
  );
}
