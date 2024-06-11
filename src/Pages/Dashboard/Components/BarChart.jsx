/* eslint-disable no-unused-vars */
import * as React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useCallback } from "react";

function TickParamsSelector({
  tickPlacement,
  tickLabelPlacement,
  setTickPlacement,
  setTickLabelPlacement,
}) {}

const dataset = [
  {
    realState: 180,
    month: "Giza",
    color: "magenta",
  },
  {
    realState: 280,
    month: "Cairo",
  },
  {
    realState: 210,
    month: "Helwan",
  },
  {
    realState: 103,
    month: "Alexandria",
  },
  {
    realState: 59,
    month: "Mansoura",
  },
];

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: "Number of real estates",
    },
  ],
  series: [
    { dataKey: "count", label: "Number of real estates", valueFormatter },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function TickPlacementBars() {
  const { token } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [barChartData, setBarChartData] = useState([]);
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  const getBarChartData = useCallback(async()=>{
     try {
       const res = await fetch(
         `${import.meta.env.VITE_SERVER_URL}/listing/get/barChartCount`,
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
       setBarChartData(data);
       console.log(data);
     } catch (err) {
       setError(true);
       console.error("Error fetching bar chart data:", error);
     }
  },[token, error])

  useEffect(() => {
    getBarChartData();
  }, [getBarChartData]);

  return (
    <div className="lg:w-1/2 sm:w-full border rounded-2xl border-ffcb74 p-4 hidden md:block">
      <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      />
      <BarChart
        dataset={barChartData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "_id",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
