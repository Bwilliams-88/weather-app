    var apiKey = "a39d12d193c78d9930f104a6c6fb6d98";
    var weatherInfo = document.getElementById('weatherInfo');
    var searchHistory = document.getElementById('searchHistory');
  
    function getWeather(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          const cityName = data.name;
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const weatherData = `${cityName}: ${temperature}°C, ${description}`;
          weatherInfo.innerText = weatherData;
    
          // Add city to the search history
          const historyItem = document.createElement('p');
          historyItem.innerText = cityName;
          searchHistory.appendChild(historyItem);
        })
        
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerText = 'City not found or error fetching data';
      });
  }
  
  function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value;
    getWeather(city);
    cityInput.value = '';
  }
  
  document.getElementById('cityInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      searchWeather();
    }
  });

   


  //  var apiKey = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a39d12d193c78d9930f104a6c6fb6d98}";