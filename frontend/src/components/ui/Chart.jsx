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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Pie, Bar } from "react-chartjs-2";
import { FaExplosion } from "react-icons/fa6";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  BarElement,
  ArcElement,
  Legend,
  ChartDataLabels
);

export const ChartPalettes = [
  // VERDES
  {
    main: "rgb(34, 197, 94)",          // Verde pastel fuerte
    color1: "rgba(34, 197, 94, 0.5)",
    color2: "rgba(34, 197, 94, 0.05)",
  },
  {
    main: "rgb(52, 211, 153)",         // Verde agua
    color1: "rgba(52, 211, 153, 0.5)",
    color2: "rgba(52, 211, 153, 0.05)",
  },
  {
    main: "rgb(16, 185, 129)",         // Verde esmeralda
    color1: "rgba(16, 185, 129, 0.5)",
    color2: "rgba(16, 185, 129, 0.05)",
  },
  {
    main: "rgb(132, 204, 22)",         // Verde lima
    color1: "rgba(132, 204, 22, 0.5)",
    color2: "rgba(132, 204, 22, 0.05)",
  },
  {
    main: "rgb(5, 150, 105)",          // Verde bosque oscuro
    color1: "rgba(5, 150, 105, 0.5)",
    color2: "rgba(5, 150, 105, 0.05)",
  },
  {
    main: "rgb(187, 247, 208)",        // Verde menta claro
    color1: "rgba(187, 247, 208, 0.5)",
    color2: "rgba(187, 247, 208, 0.05)",
  },

  // AZULES
  {
    main: "rgb(59, 130, 246)",         // Azul pastel
    color1: "rgba(59, 130, 246, 0.5)",
    color2: "rgba(59, 130, 246, 0.05)",
  },
  {
    main: "rgb(125, 211, 252)",        // Celeste claro
    color1: "rgba(125, 211, 252, 0.5)",
    color2: "rgba(125, 211, 252, 0.05)",
  },

  // AMARILLOS
  {
    main: "rgb(253, 224, 71)",         // Amarillo pastel
    color1: "rgba(253, 224, 71, 0.5)",
    color2: "rgba(253, 224, 71, 0.05)",
  },
  {
    main: "rgb(252, 211, 77)",         // Amarillo cálido suave
    color1: "rgba(252, 211, 77, 0.5)",
    color2: "rgba(252, 211, 77, 0.05)",
  },

  // ROSADOS
  {
    main: "rgb(244, 114, 182)",        // Rosa pastel
    color1: "rgba(244, 114, 182, 0.5)",
    color2: "rgba(244, 114, 182, 0.05)",
  },
  {
    main: "rgb(251, 207, 232)",        // Rosado claro
    color1: "rgba(251, 207, 232, 0.5)",
    color2: "rgba(251, 207, 232, 0.05)",
  },

  // NEUTROS
  {
    main: "rgb(229, 231, 235)",        // Gris claro (Tailwind zinc-200)
    color1: "rgba(229, 231, 235, 0.5)",
    color2: "rgba(229, 231, 235, 0.05)",
  },
  {
    main: "rgb(243, 244, 246)",        // Blanco humo (zinc-100)
    color1: "rgba(243, 244, 246, 0.5)",
    color2: "rgba(243, 244, 246, 0.05)",
  }
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
      {state === "loading" ? (
        <div className="flex justify-center items-center h-32">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          </div>
          <style>
            {`
              @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-12px); }
              }
              .animate-bounce {
                animation: bounce 1s infinite;
              }
            `}
          </style>
        </div>
      ) : state === "error" ? (
        <div className="text-red-500 text-center h-32 flex flex-col items-center justify-center">
          <FaExplosion size="2rem" /> Ah ocurrido un error al cargar el gráfico
        </div>
      ) : state === "done" && ChartComponent ? (
        <ChartComponent data={data} options={options} />
      ) : (
        <div className="text-gray-500 text-center h-32 flex items-center justify-center">
          Grafico no disponible
        </div>
      )}
    </CardChart>
  );
}