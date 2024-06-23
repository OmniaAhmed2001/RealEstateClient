// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

export default function BasicPie() {
  const { token } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);
  const isBigScreen = useMediaQuery("(min-width:640px)");
  

  const getPieChartData = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/get/pieChartCount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        setError(true);
        return;
      }
      const data = await res.json();
      setPieChartData(data);
      console.log(data);
    } catch (err) {
      setError(true);
      console.error("Error fetching Pie chart data:", err);
    }
  }, [token]);

  useEffect(() => {
    getPieChartData();
  }, [getPieChartData]);

  return (
    <div className="border rounded-2xl border-ffcb74 p-4">
      <PieChart
        series={[
          {
            data: pieChartData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -180,
            endAngle: 180,
            cx: 150,
            cy: 95,
          },
        ]}
        width={isBigScreen ? 400 : 300}
        height={200}
        sx={{
          [`& .MuiChartsLegend-series`]: {
            display: `${isBigScreen ? "block" : "none"}`,
          },
        }}
      />
    </div>
  );
}
