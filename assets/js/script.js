    const apiKey = "a39d12d193c78d9930f104a6c6fb6d98";
    const searchHistory = [];

    async function searchWeather() {
      const cityInput = document.getElementById('cityInput').value;
      const data = await fetchWeatherData(cityInput);
      displayCurrentWeather(data);
      addToSearchHistory(cityInput);
      const list = await fetchCoordData(data.coord);
      displayForecast(list);
      // console.log(list);
        // .then((data) => {
        //   // Displays current weather data
        //   displayCurrentWeather(data);
    
        //   // Displays 5-day forecast
        //   displayForecast(data);
    
        //   // Adds the city to search history
        //   addToSearchHistory(cityInput);
        // })
        // .catch((error) => {
        //   console.error('Error fetching weather data:', error);
       // });
    }
    
    async function fetchCoordData(coord) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`)
      const data = await response.json();
      return data.list;
    }

    async function fetchWeatherData(city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch weather data');
      }
    }
    
    function displayCurrentWeather(data) {
      // Extracts necessary data from the API response
      const city = data.name;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const icon = data.weather[0].icon;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
    
      // Displays current weather data in the HTML element
      const currentWeatherDiv = document.getElementById('currentWeather');
      currentWeatherDiv.innerHTML = `
        <h2>${city} - ${date}</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    }
    
    function displayForecast(list) {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = '';
      //console.log(list);
      for (let i = 0; i < 5; i++) {
        list.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
        <p>Date/Time: ${item.dt}</p>
        <p>Temperature: ${item.main.temp} °F</p>
        <p>Weather: ${item.weather[0].description}</p>
        <hr>
        `;
      })}
    }
  
    
    function addToSearchHistory(city) {
      if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    
        // Update the search history display
        const searchHistoryDiv = document.getElementById('searchHistory');
        searchHistoryDiv.innerHTML = searchHistory.map(city => `<p onclick="searchPreviousCity('${city}')">${city}</p>`).join('');
      }
    }
    
    function searchPreviousCity(city) {
      document.getElementById('cityInput').value = city;
      searchWeather();
    }

  
    document.getElementById('cityInput').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        searchWeather();
      }
    });

   


  //  var apiKey = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}&units=imperial";
  //  var latLonApi = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'