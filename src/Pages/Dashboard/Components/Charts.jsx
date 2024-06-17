// eslint-disable-next-line no-unused-vars
import React from "react";
import TickPlacementBars from "./BarChart";
import BasicPie from "./PieChart";

export default function Charts() {
  return (
    <div className="flex xl:flex-row flex-col justify-center items-center gap-14 w-10/12">
      <TickPlacementBars />
      <BasicPie />
    </div>
  );
}
