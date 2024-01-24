const apiUrl =
  "http://api.weatherapi.com/v1/forecast.json?key=00f96067b7bf4b18ad444101242401&q=96746&days=7&aqi=no&alerts=no";

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the data here
    buildWeatherApp(data.forecast.forecastday);
  })
  .catch((error) => {
    // Handle errors here
    console.error("Fetch error:", error);
  });

function buildWeatherApp(someArrayOfData) {
  const DAYS_CONTAINER = document.querySelector("#days");
}
