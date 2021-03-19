const ytsr = require('ytsr')

module.exports = async (songName) => {
  if (!songName) {
    return {}
  } 
  
  const results = await ytsr(songName)
  const bestMatch = results.items[0] || {}

  if (!bestMatch.title) {
    return {}
  }

  return {
    title: bestMatch.title,
    url: bestMatch.url
  }
}