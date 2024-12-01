const apiKey ="8247b8010be24b06a81140823240112";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=8247b8010be24b06a81140823240112&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")



async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 400){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
  }
  else{

    var data = await response.json();

    console.log(data);
    
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
    
    if(data.current.condition.code == "1000")
      weatherIcon.src = "images/clear.png";
    else if(data.current.condition.code == "1003" || "1006")
      weatherIcon.src = "images/clouds.png";
    else if(data.current.condition.code == "1009" || "1183" || "1186" || "1189")
      weatherIcon.src = "images/rain.png";
    else if(data.current.condition.text == "Light snow" || "Moderate snow")
      weatherIcon.src = "images/snow.png";
    else if(data.current.condition.text == "Mist")
      weatherIcon.src = "images/mist.png";
    else if(data.current.condition.text == "Light Drizzle" || "Freezing Drizzle")
      weatherIcon.src = "images/drizzle.png";
  
  
    document.querySelector(".weather").style.display = "block";

    document.querySelector(".error").style.display="none";

  
  }

}


searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})
