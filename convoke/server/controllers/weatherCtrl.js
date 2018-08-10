const axios = require('axios');
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${process.env.WEATHER_API_KEY}`

const getWeather = (req, res) => {
    axios.get(`${ baseUrl }`)
}