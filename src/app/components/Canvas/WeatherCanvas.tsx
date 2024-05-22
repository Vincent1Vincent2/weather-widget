import { useEffect, useRef } from "react";
import { setCanvasBackground } from "./BackgroundHandler";
import { useCloudHandler } from "./CloudHandler";
import { useRainHandler } from "./RainHandler";
import { drawMoon, drawSun } from "./SunMoonHandler";

interface WeatherCanvasProps {
  weather: any;
  baseWeather: any;
}

const WeatherCanvas: React.FC<WeatherCanvasProps> = ({
  weather,
  baseWeather,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initializeClouds, drawCloudySky, cloudPositions } = useCloudHandler();
  const { initializeRaindrops, drawRain, raindropPositions } = useRainHandler();
  const { name } = baseWeather;
  let weatherControl: string = "";

  const formatTemperature = (temp: number) => Math.floor(temp);

  const currentTemp = formatTemperature(weather.current.temp);
  const maxTemp = formatTemperature(weather.daily[0].temp.max);
  const minTemp = formatTemperature(weather.daily[0].temp.min);

  const drawWeatherInfo = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    weather: any
  ) => {
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";

    ctx.fillText(name, width / 2, height / 4);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      weather.current.weather[0].description,
      width / 2,
      height / 4 + 40
    );
    ctx.fillText(currentTemp + " °C", width / 2, height / 4 + 80);

    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    ctx.fillText("Max " + maxTemp.toString() + " °C", width / 1 - 15, 15);
    ctx.fillText("Min " + minTemp.toString() + " °C", width / 1 - 15, 40);

    const img = new Image();
    img.src = getWeatherIconUrl(weather.current.weather[0].icon);
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

          cloudPositions.current = [];
          raindropPositions.current = [];

          if (weather.current.weather[0].main === "Clouds") {
            initializeClouds(3, canvas.width, canvas.height);
          } else if (weather.current.weather[0].main === "Rain") {
            initializeRaindrops(100, canvas.width, canvas.height);
          }
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

          const currentHour = new Date().getHours();
          const isDayTime = currentHour >= 6 && currentHour < 18;

          setCanvasBackground(ctx, canvas.width, canvas.height, weather);

          if (isDayTime) {
            drawSun(ctx, canvas.width, canvas.height, currentHour);
          } else {
            drawMoon(ctx, canvas.width, canvas.height, currentHour);
          }

          switch (weather.current.weather[0].main) {
            case "Clear":
              break;
            case "Rain":
              drawRain(ctx, canvas.width, canvas.height);
              break;
            case "Clouds":
              drawCloudySky(ctx, canvas.width, canvas.height);
              break;
            default:
              break;
          }

          drawWeatherInfo(ctx, canvas.width, canvas.height, weather);

          animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }
    }
  }, [weather, drawCloudySky, drawWeatherInfo, drawRain]);

  return <canvas ref={canvasRef} />;
};

export default WeatherCanvas;

const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
