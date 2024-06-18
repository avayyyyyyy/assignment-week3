import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 2210, amt: 2290 },
  { name: "Mar", uv: 200, pv: 2290, amt: 2000 },
  { name: "Apr", uv: 278, pv: 2000, amt: 2181 },
  { name: "May", uv: 189, pv: 2181, amt: 2500 },
];

const Charts = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Charts;
