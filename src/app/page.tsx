"use client";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import WeatherCanvas from "./components/Canvas/WeatherCanvas";
import useLocation from "./components/Location";
import { WeatherDetails } from "./components/WeatherDetails";
import {
  getBaseWeather,
  getWeather,
  getWeatherIconUrl,
} from "./utils/weatherUtil";

const Home = () => {
  const { location, error } = useLocation();
  const [weather, setWeather] = useState<any>(null);
  const [baseWeather, setBaseWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      getWeather(location.lat, location.lon)
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      getBaseWeather(location.lat, location.lon)
        .then((data) => {
          setBaseWeather(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [location]);

  useEffect(() => {
    if (weather) {
      const weatherIconUrl = getWeatherIconUrl(weather.current.weather[0].icon);
      const link = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement;
      if (link) {
        link.href = weatherIconUrl;
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = weatherIconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [weather]);

  if (error) return <p>{error}</p>;

  if (loading)
    return (
      <main className="loader">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#3279a8"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </main>
    );

  return (
    <main>
      {weather && <WeatherCanvas weather={weather} baseWeather={baseWeather} />}

      {weather && <WeatherDetails weather={weather} baseWeather={weather} />}
    </main>
  );
};

export default Home;
