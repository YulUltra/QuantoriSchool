import { useEffect, useMemo, useState } from 'react';
import WeatherAPI from '../../api/WeatherAPI';

const weatherAPI = new WeatherAPI({
  apiURL: "http://api.weatherapi.com",
  city: "Tbilisi",
  apiKey: "8ac348df814f431c83b110953231804",
});

const useWeather = () => {
  const [weatherState, setWeatherState] = useState<{ temperature: string; icon: string }>({
    temperature: "",
    icon: "",
  });

  useEffect(() => {
    weatherAPI.getWeatherState().then((state) => setWeatherState(state));
  }, []);

  return weatherState;
}
