export {Weather};


class Weather {
  constructor(city) {
    this.api_key = '00f3c5df6e420ccced7fddec1a62f7fd';
    this.city = city;
    this.date = new Date();
  }

  async fetch_weather() {
    try {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.api_key}&units=metric`);
      if (result.status === 404) {
        throw("City not found");
      }
      let current_weather_js = await result.json();
      this.lat = current_weather_js.coord.lat;
      this.lon = current_weather_js.coord.lon;
      this.temp = current_weather_js.main.temp;
      this.icon = current_weather_js.weather[0].icon;
      this.pressure = current_weather_js.main.pressure;
      this.humidity = current_weather_js.main.humidity;
      this.wind = current_weather_js.wind.speed;
      return true
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  translate_icon(icon){
    let icon_translation = {
      "01d": 'clear-day.svg',
      "02d": 'partly-cloudy-day.svg',
      "03d": 'cloudy.svg',
      "04d": 'cloudy.svg',
      "09d": 'rain.svg',
      "10d": 'rain.svg',
      "11d": 'thunderstorm.svg',
      "13d": 'snow.svg',
      "50d": 'fog.svg',
      "01n": 'clear-day.svg',
      "02n": 'partly-cloudy-night.svg',
      "03n": 'cloudy.svg',
      "04n": 'cloudy.svg',
      "09n": 'rain.svg',
      "10n": 'rain.svg',
      "11n": 'thunderstorm.svg',
      "13n": 'snow.svg',
      "50n": 'fog.svg',
    };
    return icon_translation[icon];
  }

  async getFutureWeather(){
    try {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&appid=00f3c5df6e420ccced7fddec1a62f7fd&units=metric`);
      let futureWeather = await result.json();
      let res = [];
      for (let day = 1; day <= 5; day++){
        res.push([futureWeather.daily[day].temp.day, futureWeather.daily[day].weather[0].icon]);
      }
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  get_day_name(dayFuture){
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    return days[(this.date.getDay() + dayFuture)%7];
  }
  async fill_weather_info($city){
    $city.querySelector(".temperature__value").innerHTML = Math.round(this.temp);
    $city.querySelector(".city__name").innerHTML = this.city;
    $city.querySelector(".pressure__value").innerHTML = this.pressure + "hPa";
    $city.querySelector(".humidity__value").innerHTML = this.humidity + "%";
    $city.querySelector(".wind-speed__value").innerHTML = this.wind +"m/s";
    $city.querySelector("img").src = `images/icons/${this.translate_icon(this.icon)}`;
    let futureWeather = await this.getFutureWeather();
    for (let day=1; day<=5; ++day) {
      let $dayLi = $city.querySelector(`#day_${day}`);
      $dayLi.querySelector(".temperature__value").innerHTML = Math.round(futureWeather[day - 1][0]);
      $dayLi.querySelector("img").src = `images/icons/${this.translate_icon(futureWeather[day - 1][1])}`;
      $dayLi.querySelector(".day").innerHTML = this.get_day_name(day);
    }
  }
}