"use client";

import { useEffect, useRef } from "react";

import {
  Chart as ChartJS,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ArcElement,
  PieController,
  DoughnutController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  ArcElement,
  PieController,
  DoughnutController,
  Title,
  Tooltip,
  Legend
);
type Batsman = { name: string; stats: number[]; };
interface BatsmanChartsProps {
  batsman: Batsman;
  theme: "light" | "dark";
}

export default function BatsmanCharts({ batsman, theme }: BatsmanChartsProps) {
  const barRef = useRef<HTMLCanvasElement | null>(null);
  const lineRef = useRef<HTMLCanvasElement | null>(null);
  const pieRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!barRef.current || !lineRef.current || !pieRef.current) return;

    const labels = ["Matches", "Innings", "Not Outs", "50s", "100s"];
    const dataStats = batsman.stats;

    const textColor = theme === "dark" ? "#ffffff" : "#000000";
    const gridColor = theme === "dark" ? "#555555" : "#dddddd";
    const tooltipBg = theme === "dark" ? "#333333" : "#f0f0f0";
    const tooltipColor = theme === "dark" ? "#ffffff" : "#000000";

    const commonOptions: ChartOptions<'bar' | 'line' | 'pie'> = {
      responsive: true,
      plugins: {
        legend: { labels: { color: textColor } },
        title: {
          display: true,
          text: batsman.name,
          color: textColor,
        },
        tooltip: {
          bodyColor: tooltipColor,
          backgroundColor: tooltipBg,
        },
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } },
      },
    };

    const barChart = new ChartJS(barRef.current.getContext("2d")!, {
      type: "bar",
      data: { labels, datasets: [{ label: "Stats", data: dataStats, backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"] }] },
      options: { ...commonOptions, plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins?.title, text: `${batsman.name} - Bar Chart` } } },
    });

    const lineChart = new ChartJS(lineRef.current.getContext("2d")!, {
      type: "line",
      data: { labels, datasets: [{ label: "Stats", data: dataStats, borderColor: "#ff6384", backgroundColor: "#ff6384", fill: false }] },
      options: { ...commonOptions, plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins?.title, text: `${batsman.name} - Line Chart` } } },
    });

    const pieChart = new ChartJS(pieRef.current.getContext("2d")!, {
      type: "pie",
      data: { labels, datasets: [{ label: "Stats", data: dataStats, backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"] }] },
      options: { ...commonOptions, plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins?.title, text: `${batsman.name} - Pie Chart` } }, scales: {} },
    });

    return () => {
      barChart.destroy();
      lineChart.destroy();
      pieChart.destroy();
    };
  }, [batsman, theme]);

  return (
    <div className="w-full h-full">
      <h1 className="font-serif font-bold text-xl text-center"> Stats</h1>
      <div style={{ marginBottom: "50px" }}>
        <canvas ref={barRef} width={100} height={50} className="mb-6" />
        <canvas ref={lineRef} className="mb-6" />
        <canvas ref={pieRef} width={100} height={50} className="mb-6" />
      </div>
    </div>
  );
}
