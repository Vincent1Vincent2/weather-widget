export const formatHour = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const currentHour = new Date().getHours();

  return hour === currentHour ? "Now" : hour.toString().padStart(2, "0");
};
