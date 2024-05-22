const formatTemperature = (temp: number) => {
  return Math.floor(temp);
};

const FormattedTemp = ({ temp }: { temp: number }) => {
  return <div>{formatTemperature(temp)}°C</div>;
};

export default FormattedTemp;
