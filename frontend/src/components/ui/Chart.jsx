import { CardChart } from "./Card.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  BarElement,
  ArcElement,
  Legend
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  BarElement,
  ArcElement,
  Legend
);

export const ChartPalettes = [
  {
    main: "rgb(114, 151, 98)",
    color1: "rgba(114, 151, 98, 0.5",
    color2: "rgba(120, 200, 160, 0.00)",
  },
  {
    main: "rgb(101, 129, 71)",
    color1: "rgba(101, 129, 71, 0.6)",
    color2: "rgba(100, 220, 180, 0.00)",
  },
  {
    main: "rgb(89, 116, 69)",
    color1: "rgba(89, 116, 69, 0.6)",
    color2: "rgba(160, 220, 180, 0.0)",
  },
  {
    main: "rgb(231, 240, 220)",
    color1: "rgba(231, 240, 220, 0.6)",
    color2: "rgba(231, 240, 220, 0.05)",
  },
];

export function getGradient(ctx, chartArea, color1, color2) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

export function getBackgroundGradient(context, palette) {
  const chart = context.chart;
  const { ctx, chartArea } = chart;
  if (!chartArea) return palette.color1;
  return getGradient(ctx, chartArea, palette.color1, palette.color2);
}

export function Chart({ type, name, data, options, state, className }) {
  const ChartComponent = {
    line: Line,
    pie: Pie,
    bar: Bar,
  }[type];

  return (
    <CardChart className={className} title={name}>
      {state == "done" ? (
        <ChartComponent data={data} options={options} />
      ) : state == "loading" ? (
        <p className="text-black">nya</p>
      ) : (
        <p className="text-black">aaaaaaaaaaaaa</p>
      )}
    </CardChart>
  );
}