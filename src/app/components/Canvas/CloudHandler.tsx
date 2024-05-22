import { useRef } from "react";

interface Cloud {
  x: number;
  y: number;
  speed: number;
  variant: number;
  scale: number;
}

export const useCloudHandler = () => {
  const cloudPositions = useRef<Cloud[]>([]);

  const initializeClouds = (
    count: number,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    cloudPositions.current = [];
    for (let i = 0; i < count; i++) {
      cloudPositions.current.push({
        x: Math.random() * canvasWidth - canvasWidth * 0.5,
        y: Math.random() * canvasHeight,
        speed: 0.5 + Math.random() * 0.5,
        variant: Math.floor(Math.random() * 5),
        scale: 0.5 + Math.random(),
      });
    }
  };

  const drawCloud = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    variant: number,
    scale: number
  ) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    switch (variant) {
      case 0:
        ctx.arc(0, 0, 40, 0, Math.PI * 2, true);
        ctx.arc(50, 0, 60, 0, Math.PI * 2, true);
        ctx.arc(100, 0, 40, 0, Math.PI * 2, true);
        ctx.arc(25, -30, 50, 0, Math.PI * 2, true);
        ctx.arc(75, -30, 50, 0, Math.PI * 2, true);
        break;
      case 1:
        ctx.arc(0, 0, 30, 0, Math.PI * 2, true);
        ctx.arc(40, 0, 50, 0, Math.PI * 2, true);
        ctx.arc(80, 0, 30, 0, Math.PI * 2, true);
        ctx.arc(20, -25, 40, 0, Math.PI * 2, true);
        ctx.arc(60, -25, 40, 0, Math.PI * 2, true);
        break;
      case 2:
        ctx.arc(0, 0, 50, 0, Math.PI * 2, true);
        ctx.arc(60, 0, 70, 0, Math.PI * 2, true);
        ctx.arc(120, 0, 50, 0, Math.PI * 2, true);
        ctx.arc(30, -40, 60, 0, Math.PI * 2, true);
        ctx.arc(90, -40, 60, 0, Math.PI * 2, true);
        break;
      case 3:
        ctx.arc(0, 0, 35, 0, Math.PI * 2, true);
        ctx.arc(45, 0, 45, 0, Math.PI * 2, true);
        ctx.arc(90, 0, 35, 0, Math.PI * 2, true);
        ctx.arc(20, -25, 40, 0, Math.PI * 2, true);
        ctx.arc(70, -25, 40, 0, Math.PI * 2, true);
        break;
      case 4:
        ctx.arc(0, 0, 40, 0, Math.PI * 2, true);
        ctx.arc(50, 0, 55, 0, Math.PI * 2, true);
        ctx.arc(100, 0, 40, 0, Math.PI * 2, true);
        ctx.arc(25, -30, 45, 0, Math.PI * 2, true);
        ctx.arc(75, -30, 45, 0, Math.PI * 2, true);
        break;
    }
    ctx.fill();
    ctx.restore();
  };

  const drawCloudySky = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    cloudPositions.current.forEach((pos) => {
      drawCloud(ctx, pos.x, pos.y, pos.variant, pos.scale);
      pos.x += pos.speed;
    });

    cloudPositions.current = cloudPositions.current.filter(
      (pos) => pos.x - 100 <= width
    );

    while (cloudPositions.current.length < 3) {
      cloudPositions.current.push({
        x: -100,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 0.5,
        variant: Math.floor(Math.random() * 5),
        scale: 0.5 + Math.random(),
      });
    }
  };

  return { initializeClouds, drawCloudySky, cloudPositions };
};
