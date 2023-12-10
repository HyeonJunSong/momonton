const API_KEY = "68ab3764f5c848666c9704866ef9bcbc";

function setWeather(name, icon, temp) {
  const weatherImg = document.querySelector("#weatherContainer img");
  const weatherText = document.querySelector("#weatherContainer .text");

  weatherImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherText.innerText = `${name}, ${temp}℃`;
}

function getWeather(lat, lon) {
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const name = data.name;
      const icon = data.weather[0].icon;
      const temp = Math.round(data.main.temp);

      setWeather(name, icon, temp);
    });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeather(lat, lon);
    },
    () => {
      alert("Please enable location services to use this app.");
    }
  );
}

getLocation();
