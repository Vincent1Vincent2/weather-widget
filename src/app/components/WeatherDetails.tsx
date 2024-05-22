import { getWeatherIconUrl } from "../utils/weatherUtil";
import FormattedHour from "./FormatHour";
import FormattedTemp from "./FormatTemp";

export function WeatherDetails({ weather }: any) {
  return (
    <main>
      <div>{weather.name}</div>
      <FormattedTemp temp={weather.main.temp} />
      <p>{weather.weather[0].main}</p>
      <img
        src={getWeatherIconUrl(weather.weather[0].icon)}
        alt={weather.weather[0].main}
      />
      <span className="flex gap-1">
        Sun set -<FormattedHour hour={weather.sys.sunset} />
      </span>
    </main>
  );
}
