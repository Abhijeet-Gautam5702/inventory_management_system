import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-screen bg-light flex flex-col justify-center items-center text-primary font-primary">
      <h1 className="text-7xl font-bold font-head">OOPS!</h1>
      <p className="text-xl mt-2 mb-1">
        Looks like the route you have requested doesn't exist
      </p>
      <p className="text-sm">
        {`Error message from the server: ${error.statusText || error.message}`}
      </p>
    </div>
  );
}
