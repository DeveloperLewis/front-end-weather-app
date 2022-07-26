function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function getJson(url) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            temperature = Math.round(kelvinToCelsius(arr['main']['temp']));
            humidity = arr['main']['humidity'];
            description = arr['weather'][0]['main'];
            city = arr['name'];
            imgid = arr['weather'][0]['icon'];

            document.getElementById('temperature').textContent = temperature + "°C";
            document.getElementById('location').textContent = city;
            document.getElementById('description').textContent = description;
            document.getElementById('humidity').textContent = "Humidity: " + humidity + "%";
            document.getElementById('weather-img').src = "https://openweathermap.org/img/wn/" + imgid +"@2x.png";
        }
        else {
            document.getElementById('location').textContent = "Not Found";
            document.getElementById('temperature').textContent = "";
            document.getElementById('weather-img').src = "";
            document.getElementById('description').src = "";
            document.getElementById('humidity').src = "";
        }
    };
    req.open("GET", url, true);
    req.send();
}


document.getElementById('weather-button').onclick = function() {
    var city = document.getElementById('weather-input').value;
    if (document.getElementById('init-message')) {
        document.getElementById('init-message').remove();
    }
    //For a sensitive key the api request would be done through backend but since the project is a front end api demonstration and the key is not sensitive to me, I have not. :)
    getJson("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=")
}