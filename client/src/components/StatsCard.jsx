import React from "react";

export default function StatsCard({ meterDisabled, data, colorScheme }) {
  const percentage = Math.round((data[0].value * 100) / data[1].value);
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

      {!meterDisabled && (
        <div className="w-full flex gap-1 flex-col justify-start items-start mt-1">
          <p className="font-bold text-black">{`${percentage}%`}</p>
          <div className="w-full h-3 flex flex-row justify-start items-center gap-0">
            <div
              style={{ width: `${percentage}%` }}
              className={`${colorScheme.accentColor} h-3 rounded-s-full transition-all duration-300`}
            ></div>
            <div
              style={{ width: `${100 - percentage}%` }}
              className={`h-3 bg-white rounded-e-full transition-all duration-300`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
