import React from "react";

export default function StatsCard({ meterDisabled, data, colorScheme }) {
  return (
    <div
      className={`w-1/3 p-3 rounded-lg ${colorScheme.backgroundColor} flex gap-1 flex-col justify-start items-start`}
    >
      {data.map((item) => {
        return (
          <div className="w-full flex flex-row justify-between items-center text-sm">
            <p className="text-black">{item.key}</p>
            <p className={`font-bold ${colorScheme.primaryColor}`}>
              {item.value}
            </p>
          </div>
        );
      })}

      {
        !meterDisabled && (
          <div className="w-full flex gap-1 flex-col justify-start items-end mt-1">
            <p className="font-bold text-black">62%</p>
            <div className="w-full h-3 flex flex-row justify-start items-center gap-0">
              <div className={`${colorScheme.accentColor} w-5/6 h-3 rounded-s-full`}> {""}</div>
              <div className={`w-1/6 h-3 bg-white rounded-e-full`}> </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
