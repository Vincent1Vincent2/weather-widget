"use client";
import { useEffect, useState } from "react";
import useLocation from "./components/Location";
import { WeatherDetails } from "./components/WeatherDetails";
import { getWeather } from "./utils/weatherUtil";

const Home = () => {
  const { location, error } = useLocation();
  const [weather, setWeather] = useState<any>(null);
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
    }
  }, [location]);

  console.log(weather);

  if (error) return <p>{error}</p>;

  if (loading) return <p>Loading...</p>;

  return <main>{weather && <WeatherDetails weather={weather} />}</main>;
};

export default Home;
