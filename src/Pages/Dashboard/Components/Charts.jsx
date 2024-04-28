// eslint-disable-next-line no-unused-vars
import React from "react";
import TickPlacementBars from "./BarChart";
import BasicPie from "./PieChart";

export default function Charts() {
  return (
    <div className="flex px-16 lg:flex-row sm:flex-col justify-center items-center gap-16">
      <TickPlacementBars />
      <BasicPie />
    </div>
  );
}
