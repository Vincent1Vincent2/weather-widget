const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const extendedURL = process.env.NEXT_PUBLIC_EXTENDED_URL;

if (!apiKey || !baseURL) {
  throw new Error("Environment variables API_KEY and BASE_URL must be set");
}
export const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `${extendedURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const getBaseWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
