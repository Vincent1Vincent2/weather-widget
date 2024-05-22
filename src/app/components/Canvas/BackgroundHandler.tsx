export const setCanvasBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  weather: any
) => {
  const mainWeather = weather.current.weather[0].main;
  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 6 && currentHour < 18;
  let gradient = ctx.createLinearGradient(0, 0, 0, height);

  switch (mainWeather) {
    case "Clear":
      gradient.addColorStop(
        0,
        isDayTime ? "rgba(176, 224, 255, 0.4)" : "rgba(122, 154, 190, 0.4)"
      );
      gradient.addColorStop(
        1,
        isDayTime ? "rgba(135, 206, 250, 0.4)" : "rgba(70, 130, 180, 0.4)"
      );
      break;
    case "Rain":
      gradient.addColorStop(0, "rgba(211, 211, 211, 0.4)");
      gradient.addColorStop(1, "rgba(128, 128, 128, 0.4)");
      break;
    case "Clouds":
      gradient.addColorStop(
        0,
        isDayTime ? "rgba(208, 232, 242, 0.4)" : "rgba(122, 154, 190, 0.4)"
      );
      gradient.addColorStop(
        1,
        isDayTime ? "rgba(176, 224, 230, 0.4)" : "rgba(70, 130, 180, 0.4)"
      );
      break;
    default:
      gradient.addColorStop(0, "rgba(176, 224, 255, 0.4)");
      gradient.addColorStop(1, "rgba(135, 206, 250, 0.4)");
      break;
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};
