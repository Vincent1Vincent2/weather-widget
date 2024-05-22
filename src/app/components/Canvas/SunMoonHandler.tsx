export const drawSun = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentHour: number
) => {
  const sunX = (width / 24) * currentHour;
  const sunY =
    height / 2 - (Math.cos((Math.PI * currentHour) / 12) * height) / 3;
  const radius = 50;

  let gradient = ctx.createRadialGradient(
    sunX,
    sunY,
    radius * 0.8,
    sunX,
    sunY,
    radius * 2
  );
  gradient.addColorStop(0, "rgba(255, 249, 21, 0.5)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(173, 216, 230, 0)");

  ctx.beginPath();
  ctx.arc(sunX, sunY, radius * 2, 0, Math.PI * 2, true);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.shadowBlur = 50;
  ctx.shadowColor = "rgba(255, 249, 21, 0.4)";
  ctx.beginPath();
  ctx.arc(sunX, sunY, radius, 0, Math.PI * 2, true);
  ctx.fillStyle = "rgba(255, 249, 21, 0.5)";
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
};

export const drawMoon = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentHour: number
) => {
  const moonX = (width / 24) * currentHour;
  const moonY =
    height / 2 - (Math.cos((Math.PI * currentHour) / 12) * height) / 3;
  const radius = 40;

  ctx.fillStyle = "lightgray";
  ctx.beginPath();
  ctx.arc(moonX, moonY, radius, 0, Math.PI * 2, true);
  ctx.fill();
};
