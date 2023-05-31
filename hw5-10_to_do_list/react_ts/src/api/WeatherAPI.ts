export class WeatherAPI {
    apiURL: string;
    apiKey: string;

    constructor({ apiURL, apiKey }: { apiURL: string; apiKey: string }) {
        this.apiURL = apiURL;
        this.apiKey = apiKey;
    }

    async getWeatherState(city: string) {
        const weatherStateURL = `${this.apiURL}/v1/current.json?key=${this.apiKey}&q=${city}`;
        const weatherStateResponse = await fetch(weatherStateURL);
        const weatherState = await weatherStateResponse.json();
        const temperature = weatherState.current.temp_c;
        const iconURL = `https:${weatherState.current.condition.icon}`;
        const iconResponse = await fetch(iconURL);
        const icon = URL.createObjectURL(await iconResponse.blob());
        return { temperature, icon };
    }
}
