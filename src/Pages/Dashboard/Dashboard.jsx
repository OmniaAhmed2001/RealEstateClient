// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import BasicPie from "./Components/PieChart";
import TickPlacementBars from "./Components/BarChart";

export default function Dashboard() {
  return (
    <>
      <BasicPie />
      <TickPlacementBars />
    </>
  );
}
