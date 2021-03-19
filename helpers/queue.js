const queue = new Map()
const setSong = (id, contruct) => queue.set(id, contruct)
const deleteSong = (id) => queue.delete(id)
const getQueue = (id) => queue.get(id)


// {
//   textChannel: message.channel,
//   voiceChannel,
//   connection: await voiceChannel.join(),
//   songs: [],
//   volume: 8,
//   playing: true
// }

module.exports = {
  queue,
  setSong,
  deleteSong,
  getQueue
}