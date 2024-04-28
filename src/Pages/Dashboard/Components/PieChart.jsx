// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "Studio" },
            { id: 1, value: 20, label: "Cottage" },
            { id: 2, value: 20, label: "Villa" },
            { id: 1, value: 15, label: "Penthouse" },
            { id: 2, value: 20, label: "Apartment" },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 95,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
