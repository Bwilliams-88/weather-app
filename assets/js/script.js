document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const fetchButton = document.getElementById("fetchButton");
    const locationInput = document.getElementById("locationInput");
    const weatherInfo = document.getElementById("weatherInfo");
  
    fetchButton.addEventListener("click", () => {
      const location = locationInput.value.trim();
      if (location === "") {
        alert("Please enter a location.");
        return;
      }
  
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${apiKey}&units=metric`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const { name, main, weather } = data;
          const temperature = main.temp;
          const description = weather[0].description;
          weatherInfo.innerHTML = `<p>Location: ${name}</p>
                                   <p>Temperature: ${temperature}°C</p>
                                   <p>Weather: ${description}</p>`;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          weatherInfo.innerHTML = "<p>Failed to fetch weather data.</p>";
        });
    });
  });
  