export default class Forecast {
  constructor(data) {
    this.weather_data = data;
  }

  currentLocation() {
    return this.weather_data.data.id;
  }

  currentForecast() {
    return this.weather_data.data.attributes.current_forecast;
  }

  hourlyForecast() {
    return this.weather_data.data.attributes.hourly_forecast.slice(0, 12);
  }

  dailyForecast() {
    return this.weather_data.data.attributes.daily_forecast;
  }
};