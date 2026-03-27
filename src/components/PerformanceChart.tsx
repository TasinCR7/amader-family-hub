"use client";

import { useEffect, useRef } from "react";

export default function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const successData = [75, 82, 78, 85, 92, 88, 95];
  const failureData = [25, 18, 22, 15, 8, 12, 5];
  const labels = ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুলা"];

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
    const padding = 30;
    const chartW = w - padding * 2;
    const chartH = h - padding * 2;
    const step = chartW / (successData.length - 1);

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartW, y);
      ctx.stroke();
    }

    const drawLine = (data, color, label) => {
      // Area gradient
      const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartH);
      gradient.addColorStop(0, color + "30");
      gradient.addColorStop(1, color + "00");

      ctx.beginPath();
      ctx.moveTo(padding, padding + chartH);
      
      data.forEach((d, i) => {
        const x = padding + i * step;
        const y = padding + chartH - (d / 100) * chartH;
        if (i === 0) ctx.lineTo(x, y);
        else {
          const prevX = padding + (i - 1) * step;
          const prevY = padding + chartH - (data[i - 1] / 100) * chartH;
          const cp1x = prevX + step * 0.5;
          const cp2x = x - step * 0.5;
          ctx.bezierCurveTo(cp1x, prevY, cp2x, y, x, y);
        }
      });
      ctx.lineTo(padding + chartW, padding + chartH);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = padding + i * step;
        const y = padding + chartH - (d / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevX = padding + (i - 1) * step;
          const prevY = padding + chartH - (data[i - 1] / 100) * chartH;
          const cp1x = prevX + step * 0.5;
          const cp2x = x - step * 0.5;
          ctx.bezierCurveTo(cp1x, prevY, cp2x, y, x, y);
        }
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Points
      data.forEach((d, i) => {
        const x = padding + i * step;
        const y = padding + chartH - (d / 100) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "var(--background)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    drawLine(successData, "#10b981", "Success");
    drawLine(failureData, "#f43f5e", "Failure");

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    labels.forEach((l, i) => {
      ctx.fillText(l, padding + i * step, padding + chartH + 15);
    });

  }, []);

  return (
    <div className="relative w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-0 right-0 flex gap-4 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-muted-foreground">সাফল্য</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-danger" />
          <span className="text-muted-foreground">ব্যর্থতা</span>
        </div>
      </div>
    </div>
  );
}
