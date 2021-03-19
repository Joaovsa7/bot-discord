const { getQueue } = require("../helpers/queue")

module.exports = (message) => {
  const serverQueue = getQueue(message.guild.id) 

  if (!serverQueue) {
    return message.channel.send('Adicione uma música.')
  }
  if (!serverQueue.songs.length > 0) {
    return message.channel.send(`${message.author.username}, a fila está vazia. Para adicionar novas músicas, experimente o comando -play`)
  }

  return message.channel.send(`**Tá na mão!**:\n${serverQueue.songs.map((song) => song.title).join('\n')}`)
}