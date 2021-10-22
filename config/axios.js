const axios = require('axios')

const weatherApi = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/'
})

module.exports = weatherApi
