const weatherData = [
  { city: "New York", temperature: 16, humidity: 70, windSpeed: 7 },
  { city: "London", temperature: 12, humidity: 80, windSpeed: 5 },
  { city: "Tokyo", temperature: 22, humidity: 60, windSpeed: 4 },
  { city: "Sydney", temperature: 25, humidity: 50, windSpeed: 6 },
  { city: "Paris", temperature: 15, humidity: 65, windSpeed: 5 },
  { city: "Berlin", temperature: 14, humidity: 60, windSpeed: 6 },
  { city: "Moscow", temperature: 5, humidity: 75, windSpeed: 10 },
  { city: "Toronto", temperature: 17, humidity: 55, windSpeed: 8 },
  { city: "Rio de Janeiro", temperature: 26, humidity: 85, windSpeed: 7 },
  { city: "Beijing", temperature: 20, humidity: 40, windSpeed: 3 },
  { city: "Mumbai", temperature: 30, humidity: 70, windSpeed: 5 },
  { city: "Los Angeles", temperature: 19, humidity: 65, windSpeed: 4 },
  { city: "Cape Town", temperature: 18, humidity: 60, windSpeed: 6 },
  { city: "Rome", temperature: 21, humidity: 55, windSpeed: 3 },
  { city: "Bangkok", temperature: 33, humidity: 75, windSpeed: 2 },
  { city: "Istanbul", temperature: 20, humidity: 60, windSpeed: 4 },
  { city: "Lagos", temperature: 29, humidity: 80, windSpeed: 3 },
  { city: "Buenos Aires", temperature: 23, humidity: 70, windSpeed: 5 },
  { city: "Chicago", temperature: 10, humidity: 65, windSpeed: 7 },
  { city: "Shanghai", temperature: 19, humidity: 80, windSpeed: 6 },
];

const weatherDisplay = document.getElementById("weatherDisplay");
let fiveDays = [];

//These function takes the input value as a parameter to filter it with our data array.
function fetchWeather(city) {
  const inputLc = city;
  const filterByCity = weatherData.find(
    (data) => data.city.toLowerCase() === inputLc
  );
  return filterByCity;
}

//This function takes the fetched walues as a parameter to display them in Html 
// by checking if input values correspond with our data.
function displayCurrentWeather(weather) {
  if (weather) {
    weatherDisplay.innerHTML = `<div>
    <h2>Current Weather for ${weather.city}</h2>
  <p>Temperature: ${weather.temperature}°C</p>
  <p>Humidity: ${weather.humidity}%</p>
  <p>Wind Speed: ${weather.windSpeed}m/s</p>
  </div>`;
  } else {
    alert("City not found");
  }
}


// In this function the required data are taken as parameter,and after the the function
// iterate to update the days and the temp in an incremented way.
// After that the day and the temperature is pushed as object to fiveDays array.
// From the array we use the properties to appear the data in html.
function fetchForecast(weather) {
  const cityName = weather.city;

  fiveDays = [];

  for (let i = 0; i < 5; i++) {
    const temperature = weather.temperature + (i + 1) + "°C";
    const addDays = { day: `Day ${i + 1}`, temperature };

    fiveDays.push(addDays);
  }

  const forecastDiv = document.createElement("div");

  forecastDiv.innerHTML = `<h2>5-Days Forecast for ${cityName}</h2>
  <p>${fiveDays[0].day}:Temperature: ${fiveDays[0].temperature}</p>
  <p>${fiveDays[1].day}:Temperature: ${fiveDays[1].temperature}</p>
  <p>${fiveDays[2].day}:Temperature: ${fiveDays[2].temperature}</p>
  <p>${fiveDays[3].day}:Temperature: ${fiveDays[3].temperature}</p>
  <p>${fiveDays[4].day}:Temperature: ${fiveDays[4].temperature}</p>
`;
  weatherDisplay.appendChild(forecastDiv);
}

// searchWeather is an onclick function it takes the input value and it pass it when needed
// the function call the needed function to execute whet the button is clicked.
// Also it passes as parameter values of fetchWeather to other functions.
function searchWeather() {
  const cityName = document.getElementById("cityName").value.toLowerCase();

  const weather = fetchWeather(cityName);

  displayCurrentWeather(weather);
  fetchForecast(weather);
  saveRecentSearch(cityName);
  displayRecentSearches();
}



// Exercise 03: Save recent searches to local storage
const recentSearches = [];

// This function checks if the inputed city is at the array recentSearches and if not it pushes 
// the name of the city to the array if its a city we have data for.
function saveRecentSearch(city) {
  localStorage.setItem("searched-city", JSON.stringify(recentSearches));

  if (!recentSearches.includes(city)) {
    recentSearches.push(city);
  }
}


// This function for each city that is added to recentSearches array it creates an li element
// and displaays in it the name of the searched city, after that is added the the event listener function
// to make the recent searched city clickable and when we click on the name it re-run the search. 
function displayRecentSearches() {
  const recentDiv = document.getElementById("recentSearches");
  // const searchedCity = localStorage.getItem('searched-city');
  // For better user experience I have accesed the recent searches from the array directly.

  recentDiv.innerHTML = ``;
  const ul = document.createElement('ul');
    ul.setAttribute('class', 'list-group');
  recentSearches.forEach((city) => {
    
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item list-group-item-action');
    li.textContent = city;
    li.addEventListener('click', function () {
      const currentCity = fetchWeather(li.innerHTML);
      displayCurrentWeather(currentCity);
      fetchForecast(currentCity);
    });

    ul.appendChild(li);
    
  });
  recentDiv.appendChild(ul);
}


