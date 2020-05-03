import {Loading} from "./loading";
import {Weather} from "./weather";


const $addCity = document.querySelector("#add-city");
const $moduleFormClose = document.querySelector("#module-form-close");
const $moduleWeather = document.querySelector(".module__weather");
const $citySearchBtn = document.querySelector("#city-search");
const $searchError = document.querySelector(".search-error");


let loading = new Loading();


async function fetch_IP_location(){
  try {
    let result = await fetch(`http://ip-api.com/json/`);
    return (await result.json()).city;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function get_weather_current_location(){
  let city_name = await fetch_IP_location();
  if(city_name===false){
    loading.disable();
    return;
  }
  let $locationCityWeather = $moduleWeather.cloneNode(true);
  let cityWeather = new Weather(city_name);
  if (await cityWeather.fetch_weather() !== true){
    loading.disable();
    return;
  }

  await cityWeather.fill_weather_info($locationCityWeather);

  $locationCityWeather.querySelector('.btn--close').onclick = () => {
    $locationCityWeather.remove();
  };
  $locationCityWeather.removeAttribute("hidden");

  $moduleWeather.parentElement.appendChild($locationCityWeather);
  loading.disable();

}

$addCity.onclick = function(){
  let $moduleForm = document.querySelector(".module__form");
  $moduleForm.removeAttribute("hidden");
};

$moduleFormClose.onclick = function(){
  let $moduleForm = document.querySelector(".module__form");
  $moduleForm.setAttribute("hidden", null);
};

$citySearchBtn.onclick = async function(event){
  event.preventDefault();
  loading.enable();
  let cityName = document.querySelector("#search").value;
  let cityWeather = new Weather(cityName);
  $searchError.innerHTML = "";

  if (await cityWeather.fetch_weather() !== true){
    loading.disable();
    $searchError.innerHTML = "Błędne miasto";
    return;
  }

  let $new_city_weather = $moduleWeather.cloneNode(true);
  cityWeather.fill_weather_info($new_city_weather);

  $new_city_weather.querySelector('.btn--close').onclick = () => {
    $new_city_weather.remove();
  };
  $new_city_weather.removeAttribute("hidden");

  $moduleWeather.parentElement.appendChild($new_city_weather);
  let $module__form = document.querySelector(".module__form");
  document.querySelector("#search").value = "";
  $module__form.setAttribute("hidden", null);
  loading.disable();
};
(async() => {await get_weather_current_location();})();

