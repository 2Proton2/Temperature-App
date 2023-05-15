const fetch = require('node-fetch');

//conversion logics
function kelvinToCelsius(temp){
    let celsius = (temp-32)*5/9+273.15
    return  (temp-273.15).toFixed(2); 
}

function kelvinToFarenheit(temp){
    let farenheit = (temp - 273.15) * 9/5 + 32
    return farenheit.toFixed(2);
}

async function getLocationTemperature(city){
    //fetching the data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ec4fef9d8be71adf29cc184cf4a0ca4`)
    .then((rData) => {
        //converting to json format
        const data = rData.json();
        return data;
    })
    .catch((err) => console.log(err));

    //destructing the response object, as we only deal with main, cod and message properties from whole json response
    let { main, cod, message } = response;
    let userData;
    
    //for valid city name
    if(cod == '200'){
        let tempKelvin = {
            "temp": main.temp,
            "feelslike" : main.feels_like
        }
        let tempCelsius = {
            "temp": kelvinToCelsius(main.temp),
            "feelslike": kelvinToCelsius(main.feels_like)
        }
    
        let tempFahrenheit = {
            "temp" : kelvinToFarenheit(main.temp),
            "feelslike" : kelvinToFarenheit(main.feels_like)
        }
    
            userData = {
            "response": true,
            "city": city,
            "kelvin": tempKelvin,
            "celsius" : tempCelsius,
            "fahrenheit" : tempFahrenheit
        }
    }
    //for invalid city name
    else {
            userData = {
            "response": false,
            "message": response.message
        }
    }
    console.log('userData :: ', userData);
    return userData;
}

module.exports = getLocationTemperature;