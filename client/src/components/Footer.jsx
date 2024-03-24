import React from "react";

export default function Footer() {
  return (
    <div className="w-full pb-2 flex-grow text-white px-10">
      <p className="text-sm text-right">
        Made with ❤︎ by{" "}
        <a
          className="hover:text-primary font-semibold"
          href="https://github.com/Abhijeet-Gautam5702"
          target="_blank"
        >
          Abhijeet
        </a>
      </p>
      {/* <p>All rights reserved @2024</p> */}
    </div>
  );
}
