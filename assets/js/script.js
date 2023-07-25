    var apiKey = "a39d12d193c78d9930f104a6c6fb6d98";
    var weatherInfo = document.getElementById('weatherInfo');
    var searchHistory = document.getElementById('searchHistory');
  
    function getWeather(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
          const cityName = data.name;
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const weatherData = `${cityName}: ${temperature}°F, ${description}`;
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

  function futureWeather(apiUrl) {
    // extracts future forecast data
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q={cityname},{statecode},{countrycode}&limit={limit}&appid={APIkey}`)
    .then(response => response.json())
    .then(data => {
      const futureForecast = data.list.filter(item => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate > new Date();
      });
      
    });

    // displays future forecast info
    const forecastContainer = document.getElementById('forecast-container');
    futureForecast.forEach(item => {
      const forecastDate = new Date(item => {
        const forecastDate = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const description = item.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.innerHTML = `
        <h3>${forecastDate.toLocaleString()}</h3>
        <p>Temperature: ${temperature} &#176;F</p>
        <p>Description: ${description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
      })
    })
    .catch(error => console.log('Error fetching forecast:', error));
  }
  
  document.getElementById('cityInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      searchWeather();
    }
  });
  

   


  //  var apiKey = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}&units=imperial";