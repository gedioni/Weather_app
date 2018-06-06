//Declare variables and select Elements
var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY = '6162d5f3c1139dbcb4697fc34f94416a'

      /*(Now select element from html--- the cityTitle, zip input bar, weather div, 
          img with class icon, span class temp, span with the class humid, select the span with class deg)*/

var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector(".humid")
var deg = document.querySelector('.deg')
var convert = document.querySelector('.convert')
var fc

var icons = {
    "Clouds": "img/cloudy.png",
    "Clear": "img/sun.png",
    "Rain": "img/rain.png",
    "Snow": "img/snow.png",
    "Sun": "img/sun.png",
    "Thunderstorm": "img/thunderstorm.png",
    "Partly-Coudy": "img/partly-cloudy.png",
}



//define functions
function iconSelector(weather){
    return icons[weather]
}
function celsToFaren(cels){
    return Math.round((cels * 9/5 + 32))   
}
function farenToCelsius(far){
    return Math.round((far - 32) * (5/9))    
}
function kelvinToFaren(kelvin){
    return Math.round(kelvin * 9/5 - 459.67)
}
function getWeather(zipCode){
    $.ajax({
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
        datatype: 'json',
        success: function(data){
            console.log(data)
            title.textContent = data.name
            weather.textContent = data.weather[0].main
            icon.src = iconSelector(data.weather[0].main)
            temp.textContent = kelvinToFaren(data.main.temp)
            humid.textContent = data.main.humidity
            fc = "f"

        },
        error: function(error){
            console.log("There was an error")

        }
    })
}

getWeather('33172')



//Call functions and/or add Event Listeners
zip.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        getWeather(zip.value)
    }
})

convert.addEventListener('click', function(e){
    if(fc === "f"){
        temp.textContent = farenToCelsius(temp.textContent)
        deg.innerHTML = " &deg; C "
        convert.textContent = "Convert to F"
        fc = "c"
    } else {
        temp.textContent = celsToFaren(temp.textContent)
        deg.innerHTML = " &deg; F "
        convert.textContent = "Convert to C"
        fc = "f"
    }
})