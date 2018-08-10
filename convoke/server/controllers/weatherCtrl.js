const axios = require('axios');
const baseUrl = `api.openweathermap.org/data/2.5/forecast?lat=${32.735687}&lon=${-97.10806559999997}&appid=${
  process.env.WEATHER_API_KEY
}`;

const getWeather = (req, res) => {
  axios
    .get(`${baseUrl}`)
    .then(response => {
      res.status(200).send(response);
    })
    console.log(response)
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
