const getSongInfo = require("../helpers/getSongInfo")
const { setSong, deleteSong, getQueue } = require("../helpers/queue")
const ytdl = require('ytdl-core-discord')

const playMusic = async (message, song) => {
  const guildId = message.guild.id
  const serverQueue = getQueue(guildId)

  if (!song.url) {
    serverQueue.voiceChannel.leave()
    deleteSong(guildId)
    return message.channel.send(`${message.author.username}, música inválida.`)
  }

  const streamDispatcher = serverQueue.connection
    .play(await ytdl(song.url), { type: "opus" })
    .on('finish', () => {
      serverQueue.songs.shift()
      playMusic(message, serverQueue.songs[0])
    })

  streamDispatcher.setVolume(serverQueue.volume)
  return message.channel.send(`Tocando: ${song.title}`)
}

module.exports = async (message) => {
  const serverQueue = getQueue(message.guild.id)
  const voiceChannel = message.member.voice.channel

  if (!voiceChannel) {
    return message.channel.send(`${message.author.username}, você precisa estar em um canal de voz para executar este comando.`)
  }

  const permissions = voiceChannel.permissionsFor(message.client.user)
  const hasNotPermissions = !permissions.has('CONNECT') || !permissions.has('SPEAK')

  if (hasNotPermissions) {
    return message.channel.send(`${message.author.username}, você precisa me dar permissão para entar no canal de voz.`)
  }

  const songName = message.content.replace(/-play\s/, '')
  const songInfo = await getSongInfo(songName)

  if (serverQueue) {
    serverQueue.songs.push(songInfo)
    return message.channel.send(`${songInfo.title} foi adicionada a sua lista! para ver a lista, use o comando -queue`)
  }

  const queueContract = {
    textChannel: message.channel,
    voiceChannel,
    connection: await voiceChannel.join(),
    songs: [],
    volume: 5,
    playing: true
  }

  setSong(message.guild.id, queueContract)
  queueContract.songs.push(songInfo)

  try { 
    return await playMusic(message, songInfo)
  } catch (err) {
    console.log({ err })
  }

  return message.channel.send('Ainda não tá pronto')
}