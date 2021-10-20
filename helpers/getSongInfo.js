const ytsr = require('ytsr')

module.exports = async (songName) => {
  if (!songName) {
    return {}
  } 
  
  try {
    const results = await ytsr(songName)
    const bestMatch = results.items.filter((item) => item?.url)[0]

    if (!bestMatch.title) {
      return {}
    }
  
    return {
      title: bestMatch.title,
      url: bestMatch.url
    }
  } catch (error) {
    return error
  }
}