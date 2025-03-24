import React from "react";
import Heading from "../heading";
import Recycled from "./recycled";
import TrafficSourcesChart from "./traffic-sources-chart";
const Analytics = () => {
  return (
    <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 w-full">
      <Heading title="Analytics" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Recycled />
        </div>
        <div className="col-span-8 p-4 text-white ">
          <TrafficSourcesChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
