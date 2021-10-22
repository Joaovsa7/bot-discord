const weatherApi = require("../config/axios")
const { WEATHER_TOKEN } = require("../config/config")

const REMOVE_SPECIAL_CHARACTERS = /[\u0300-\u036f]/g

module.exports = async (message) => {
  const COMMAND = message.content.split(" ")[0]
  const weatherArgs = message.content.replace(COMMAND, '')

  if (!weatherArgs) {
    return message.channel.send('Oops! Você passou o comando de um modo inválido! tenta assim: -weather {cidade/bairro (sem caracteres especiais)}')
  }
  
  try {
    const { data } = await weatherApi(`weather?q=${weatherArgs.trim().normalize('NFD').replace(REMOVE_SPECIAL_CHARACTERS, '')}&units=metric&lang=pt_br&appid=${WEATHER_TOKEN}`)

    const temperature = data.main.temp
    const celsiusTemperature = `${Math.round(temperature)}°C`
    const feelsLike = data.main.feels_like
    const isHot = data.main.temp > 25
    const isCold = data.main.temp < 18
    const suggestion = isHot ? 'Se hidrate! Beba água!' : isCold ? 'Se aqueça! cházin ou um cafézin são bem-vindos' : 'A temperatura está agradável, beba água e aproveite!'
    const suggestionRain = 'Se for sair de casa, não esqueça o guarda-chuva ☔️☔️, Tire a roupa do varal, feche as janelas, olha a chuuva'
    const suggestionSnow = 'Está nevando! a Neve é linda porém perigosa, cuidado! Tira uma foto e me manda depois, eu amo neve!❄️❄️☃️☃️'
    const isRaining = data.weather[0].main === 'Rain'
    const isSnowing = data.weather[0].main === 'Snow'

    if (isSnowing) {
      return message.channel.send(`Agora em ${data.name}, ${suggestionSnow}`)
    }
  
    if (isRaining) {
      return message.channel.send(`Agora ${data.name} está chovendo ⛈⛈! ${suggestionRain}`)
    }

    message.channel.send(`${message.author}, Agora em ${weatherArgs} está ${celsiusTemperature} e com a sensação térmica de ${feelsLike}°C. ${isHot ? '🥵🥵' : isCold ? '🥶🥶' : 'Está agradável! 😁😁'}`)
    return message.channel.send(`Anota aí a minha dica! ${suggestion}`)
  } catch (error) {
    return message.channel.send('Oops! Não encontramos esta localização 😥 😥. Só consigo achar no planeta terra 🌎🌎 e olhe lá!')
  }
}
