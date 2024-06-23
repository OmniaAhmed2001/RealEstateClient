// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import Dashboard from "./Components/Dashboard";
import Charts from "./Components/Charts";

export default function DashboardMain() {
  return (
    <div className="mb-10 min-h-screen flex flex-col justify-center items-center">
      <Dashboard />
      <Charts />
    </div>
  );
}
