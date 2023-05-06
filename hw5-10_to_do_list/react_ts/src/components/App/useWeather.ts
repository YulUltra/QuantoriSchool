import { useEffect, useMemo, useState } from "react";
import { WeatherAPI } from "../../api/WeatherAPI";

const weatherAPI = new WeatherAPI({
    apiURL: "http://api.weatherapi.com",
    apiKey: "8ac348df814f431c83b110953231804",
});

export const useWeather = (city: string) => {
    const [weatherState, setWeatherState] = useState<{ temperature: string; icon: string }>({
        temperature: "",
        icon: "",
    });

    useEffect(() => {
        weatherAPI.getWeatherState(city).then((state) => setWeatherState(state));
    }, []);

    return weatherState;
};
