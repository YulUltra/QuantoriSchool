export default class WeatherAPI {
    apiURL: string;
    city: string;
    apiKey: string;

    constructor({ apiURL, city, apiKey }: { apiURL: string; city: string; apiKey: string }) {
        this.apiURL = apiURL;
        this.city = city;
        this.apiKey = apiKey;
    }

    async getWeatherState() {
        const weatherStateURL = `${this.apiURL}/v1/current.json?key=${this.apiKey}&q=${this.city}`;
        const weatherStateResponse = await fetch(weatherStateURL);
        const weatherState = await weatherStateResponse.json();
        const temperature = weatherState.current.temp_c;
        const iconURL = `https:${weatherState.current.condition.icon}`;
        const iconResponse = await fetch(iconURL);
        const icon = URL.createObjectURL(await iconResponse.blob());
        return { temperature, icon };
    }
}
