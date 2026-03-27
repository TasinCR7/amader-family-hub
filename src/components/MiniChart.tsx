"use client";

import { useEffect, useRef } from "react";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export default function MiniChart({ data, color = "#10b981", height = 120 }: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const max = Math.max(...data) * 1.1;
    const min = Math.min(...data) * 0.9;
    const range = max - min || 1;
    const step = w / (data.length - 1);

    // Draw gradient area
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, color + "30");
    gradient.addColorStop(1, color + "00");

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((d, i) => {
      const x = i * step;
      const y = h - ((d - min) / range) * h * 0.8 - h * 0.1;
      if (i === 0) ctx.lineTo(x, y);
      else {
        const prevX = (i - 1) * step;
        const prevY = h - ((data[i - 1] - min) / range) * h * 0.8 - h * 0.1;
        const cpx1 = prevX + step * 0.4;
        const cpx2 = x - step * 0.4;
        ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = i * step;
      const y = h - ((d - min) / range) * h * 0.8 - h * 0.1;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = (i - 1) * step;
        const prevY = h - ((data[i - 1] - min) / range) * h * 0.8 - h * 0.1;
        const cpx1 = prevX + step * 0.4;
        const cpx2 = x - step * 0.4;
        ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // End dot
    const lastX = (data.length - 1) * step;
    const lastY = h - ((data[data.length - 1] - min) / range) * h * 0.8 - h * 0.1;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
    ctx.fillStyle = color + "30";
    ctx.fill();
  }, [data, color, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height }}
    />
  );
}
