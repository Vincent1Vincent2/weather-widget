import { getWeatherIconUrl } from "../utils/weatherUtil";
import { formatHour } from "./FormatHour";
import { formatTemperature } from "./FormatTemp";

const HourlyForecast = ({ hour }: { hour: any }) => {
  return (
    <div className="hourly-item">
      <div>{formatHour(hour.dt)}</div>
      <img
        className="hourly-item"
        src={getWeatherIconUrl(hour.weather[0].icon)}
        alt={hour.weather[0].description}
      />
      <div>{formatTemperature(hour.temp)}°</div>
    </div>
  );
};

export default HourlyForecast;
