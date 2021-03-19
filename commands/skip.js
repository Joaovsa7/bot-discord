const { getQueue } = require("../helpers/queue")

module.exports = (message) => {
  const serverQueue = getQueue(message.guild.id)
  const voiceChannel = message.member.voice.channel

  if (!voiceChannel) {
    return message.channel.send(`${message.author.username}, você precisa estar em um canal de voz para pular uma música.`)
  }

  if (!serverQueue) {
    return message.channel.send(`${message.author.username}, não existe músicas disponíveis para pular na fila.`)
  }

  serverQueue.connection.dispatcher.end()
}