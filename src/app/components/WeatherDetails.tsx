import { useState } from "react";
import "../styles/styles.css";
import { getWeatherIconUrl } from "../utils/weatherUtil";

import { formatHour } from "./FormatHour";
import { formatTemperature } from "./FormatTemp";
import HourlyForecast from "./HourlyForecast";

interface PageProps {
  weather: any;
  baseWeather: any;
}

export function WeatherDetails({ weather, baseWeather }: PageProps) {
  const { current, daily, hourly } = weather;

  const [showHourly, setShowHourly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);

  if (!current || !daily || !hourly) {
    return null;
  }

  const getDayOfWeek = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const toggleHourly = () => {
    setShowHourly(!showHourly);
    setShowDaily(false);
  };

  const toggleDaily = () => {
    setShowDaily(!showDaily);
    setShowHourly(false);
  };

  return (
    <div className="weather-details">
      <button
        className="toggle-button"
        style={{ top: "155px", left: "2%" }}
        onClick={toggleHourly}
      >
        <span>Hourly</span> {showHourly ? "▲" : "▼"}
      </button>
      {showHourly && (
        <div className="forecast-container">
          <div className="hourly-forecast">
            {hourly.slice(0, 24).map((hour: any, index: number) => (
              <HourlyForecast key={index} hour={hour} />
            ))}
          </div>
        </div>
      )}

      <button
        className="toggle-button"
        style={{ top: "200px", left: "2%" }}
        onClick={toggleDaily}
      >
        <span>Advance</span> {showDaily ? "▲" : "▼"}
      </button>
      {showDaily && (
        <section className="forecast-container">
          <div className="daily-forecast">
            {daily.slice(0, 7).map((day: any, index: number) => (
              <div key={index} className="daily-item">
                <div>{getDayOfWeek(day.dt)}</div>
                <img
                  src={getWeatherIconUrl(day.weather[0].icon)}
                  alt={day.weather[0].description}
                />
                <div className="minMax">
                  <div>{formatTemperature(day.temp.min)}°</div>
                  <span className="temp"></span>
                  <div>{formatTemperature(day.temp.max)}°</div>
                </div>
              </div>
            ))}
          </div>

          <section className="advanceInfo">
            <div className="uv">
              <span>
                <h5>UV-INDEX</h5>
                <p>{daily[0].uvi}</p>
              </span>
              <p>{daily[0].summary}</p>
            </div>
            <div className="sunSet">
              <span>
                <h4>Sunset</h4>
                <p>{formatHour(daily[0].sunset)}</p>
              </span>
            </div>
            <div className="feelsLike">
              <span>
                <h5>Feels like</h5>
                <p>{formatTemperature(daily[0].feels_like.day)}°</p>
              </span>
            </div>
            <div className="wind">
              <span>
                <h5>Wind</h5>
                <p>{daily[0].wind_speed} m/s</p>
              </span>
            </div>
          </section>
        </section>
      )}
    </div>
  );
}
