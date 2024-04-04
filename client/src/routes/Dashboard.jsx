import React, { useEffect } from "react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const changeActiveIndex = useStore((state) => state.changeActiveIndex);

  const navigate = useNavigate();

  let storeData, orderData, stockData;
  storeData = [
    {
      key: "Total Store Value ($)",
      value: "75000",
    },
    {
      key: "Total Products",
      value: "456",
    },
    {
      key: "Total Categories",
      value: "36",
    },
  ];

  useEffect(() => {
    changeActiveIndex(0);
  }, []);
  return (
    <div className="flex flex-col justify-start items-center text-center w-full h-full py-6 px-6">
      {/* Header of the Dashboard */}
      <section className="flex flex-row justify-between items-center w-full">
        <p className="text-3xl font-head">
          The best way to manage your inventory is with us...
        </p>
        <div
          onClick={() => {
            navigate("/panel/account");
          }}
          className="rounded-full bg-tertiary text-center  h-12 w-12 flex flex-row justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300"
        >
          <p className="text-2xl font-semibold font-primary">A</p>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full mt-10 flex gap-6 flex-row justify-between items-stretch">
        <StatsCard
          meterDisabled={true}
          data={storeData}
          colorScheme={{
            primaryColor: "text-primary",
            backgroundColor: "bg-light",
            accentColor:"bg-primary"
          }}
        />
        <StatsCard
          meterDisabled={false}
          data={storeData}
          colorScheme={{
            primaryColor: "text-black",
            backgroundColor: "bg-lGreen",
            accentColor:"bg-pGreen"
          }}
        />
        <StatsCard
          meterDisabled={false}
          data={storeData}
          colorScheme={{
            primaryColor: "text-black",
            backgroundColor: "bg-yellow",
            accentColor:"bg-red"
          }}
        />
      </section>

      {/* Table of Products */}
      <section>Table</section>
    </div>
  );
}
