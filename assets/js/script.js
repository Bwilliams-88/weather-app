    const apiKey = "a39d12d193c78d9930f104a6c6fb6d98";
    const searchHistory = [];

    function searchWeather() {
      const cityInput = document.getElementById('cityInput').value;
      fetchWeatherData(cityInput)
        .then((data) => {
          // Display current weather data
          displayCurrentWeather(data);
    
          // Display 5-day forecast
          displayForecast(data);
    
          // Add the city to search history
          addToSearchHistory(cityInput);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
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
      // Extract necessary data from the API response
      const city = data.name;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const icon = data.weather[0].icon;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
    
      // Display current weather data in the HTML element
      const currentWeatherDiv = document.getElementById('currentWeather');
      currentWeatherDiv.innerHTML = `
        <h2>${city} - ${date}</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    }
    
    function displayForecast(data) {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = '';

      data.list.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
        <p>Date/Time: ${item.dt_txt}</p>
        <p>Temperature: ${item.main.temp} °F</p>
        <p>Weather: ${item.weather[0].description}</p>
        <hr>
        `;
      })
      // Fetch 5-day forecast data using another API endpoint (not shown here)
      // You can use the OpenWeatherMap API again to fetch the forecast data
    
      // Once you have the forecast data, loop through it and display each day's forecast
      // in the "forecast" div using a similar approach as displayCurrentWeather()
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