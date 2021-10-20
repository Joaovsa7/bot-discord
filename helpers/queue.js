const queue = new Map()
const setSong = (id, contruct) => queue.set(id, contruct)
const deleteSong = (id) => queue.delete(id)
const getQueue = (id) => queue.get(id)

module.exports = {
  queue,
  setSong,
  deleteSong,
  getQueue
}