const apiUrl =
  "http://api.weatherapi.com/v1/forecast.json?key=00f96067b7bf4b18ad444101242401&q=96746&days=7&aqi=no&alerts=no";
const cityForm = document.querySelector("#city-form");

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userZip = document.querySelector("#user-zipcode").value.trim();

  let newUrl = `http://api.weatherapi.com/v1/forecast.json?key=00f96067b7bf4b18ad444101242401&q=${userZip}&days=7&aqi=no&alerts=no`;

  fetch(newUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data here
      const myDays = data.forecast.forecastday;
      renderAll(myDays);
    })
    .catch((error) => {
      // Handle errors here
    });

  function renderForcastDay(
    date,
    mintemp_f,
    mintemp_c,
    maxtemp_f,
    maxtemp_c,
    condition,
    // icon,
    moon_phase
  ) {
    let dayContainer = document.createElement("div");
    let divContainer = document.createElement("div");
    let dates = document.createElement("p");
    let minTempF = document.createElement("p");
    let minTempC = document.createElement("p");
    let maxTempF = document.createElement("p");
    let maxTempC = document.createElement("p");
    let conditions = document.createElement("p");
    // let icons = document.createElement("img");
    let moonPhase = document.createElement("div");
    // icons.src = icon;

    let CONTENT_DAY = document.querySelector(".weather-container");

    dayContainer.classList.add("day-cont");
    divContainer.classList.add("div-cont");
    dates.classList.add("date");
    minTempF.classList.add("min-temp-f");
    minTempC.classList.add("min-temp-c");
    maxTempF.classList.add("max-temp-f");
    maxTempC.classList.add("max-temp-c");
    conditions.classList.add("conditions");
    // icons.classList.add("icon");
    moonPhase.classList.add("moon-phase");

    dates.innerText = date + ":";
    minTempF.innerText = "Min Temp F: " + mintemp_f;
    minTempC.innerText = "Min Temp C: " + mintemp_c;
    maxTempF.innerText = "Max Temp F: " + maxtemp_f;
    maxTempC.innerText = "Max Temp C: " + maxtemp_c;
    conditions.innerText = "Conditions: " + condition;
    moonPhase.innerHTML = "Moon Phase: " + moon_phase;

    CONTENT_DAY.append(dayContainer);
    dayContainer.append(dates, divContainer);
    divContainer.append(
      minTempF,
      minTempC,
      maxTempF,
      maxTempC,
      conditions,
      moonPhase
    );
    // icons.append(icon);
  }

  function renderAll(forecasts) {
    const CONTENT = document.querySelector(".weather-container");
    CONTENT.innerHTML = "";
    forecasts.forEach((element) => {
      let dates = new Date(element.date);
      let newDates = dates.toDateString().substring(0, 15);

      renderForcastDay(
        newDates,
        element.day.mintemp_f,
        element.day.mintemp_c,
        element.day.maxtemp_f,
        element.day.maxtemp_c,
        element.day.condition.text,
        // element.day.condition.icon,
        element.astro.moon_phase
      );
    });
  }
});

// Data to include: date, condition, moon phase, mintemp/maxtemp_f (toggle for C as bonus);
// TODO: Have only min/max F visible initially
// TODO: Add button/function to toggle temp between F and C
