import { useEffect, useRef } from "react";
import { formatTemperature } from "../FormatTemp";

interface WeatherCanvasProps {
  weather: any;
  baseWeather: any;
}

const WeatherCanvas: React.FC<WeatherCanvasProps> = ({
  weather,
  baseWeather,
}) => {
  const { name } = baseWeather;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const temp = formatTemperature(weather.current.temp);
  const maxTemp = formatTemperature(weather.daily[0].temp.max);
  const minTemp = formatTemperature(weather.daily[0].temp.min);
  const icon = weather.current.weather[0].icon;
  const description = weather.current.weather[0].description;

  const drawWeatherInfo = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";

    ctx.fillText(name, width / 2, height / 4);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(description, width / 2, height / 4 + 40);
    ctx.fillText(temp + "°", width / 2, height / 4 + 80);

    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    ctx.fillText("Max " + maxTemp.toString() + " °", width / 1 - 15, 15);
    ctx.fillText("Min " + minTemp.toString() + " °", width / 1 - 15, 40);

    const img = new Image();
    img.src = getWeatherIconUrl(icon);
    img.onload = () => {
      ctx.drawImage(img, width / 2 - 50, height / 4 + 100, 100, 100);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleResize = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = 250;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [weather]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let animationFrameId: number;

        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawWeatherInfo(ctx, canvas.width, canvas.height);

          animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }
    }
  }, [weather]);

  return <canvas ref={canvasRef} />;
};

export default WeatherCanvas;

const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
