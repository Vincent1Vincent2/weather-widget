import { useRef } from "react";

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
}

export const useRainHandler = () => {
  const raindropPositions = useRef<Raindrop[]>([]);

  const initializeRaindrops = (
    count: number,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    raindropPositions.current = [];
    for (let i = 0; i < count; i++) {
      raindropPositions.current.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        speed: 2 + Math.random() * 3,
        length: 10 + Math.random() * 10,
      });
    }
  };

  const drawRain = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = "rgba(100,136,234, 0.3)";
    ctx.lineWidth = 2;

    raindropPositions.current.forEach((raindrop) => {
      ctx.beginPath();
      ctx.moveTo(raindrop.x, raindrop.y);
      ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
      ctx.stroke();

      raindrop.y += raindrop.speed;
      if (raindrop.y > height) {
        raindrop.y = -raindrop.length;
        raindrop.x = Math.random() * width;
      }
    });
  };

  return { initializeRaindrops, drawRain, raindropPositions };
};
