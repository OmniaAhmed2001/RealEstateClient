// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <div className="border rounded-2xl border-ffcb74 p-4">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Studio", color: "#FDF5E8" },
              { id: 1, value: 20, label: "Cottage", color: "#FFCB74" },
              { id: 2, value: 20, label: "Villa", color: "#FFC45D" },
              { id: 1, value: 15, label: "Penthouse", color: "#FFB534" },
              { id: 2, value: 20, label: "Apartment", color: "#FF9A62" },
              
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
    </div>
  );
}
