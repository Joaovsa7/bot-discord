const hello = require('./hello')
const play = require('./play')
const queue = require('./queue')
const skip = require('./skip')
const hug = require('./hug')

module.exports = {
  '-hello': hello,
  '-play': play,
  '-skip': skip,
  '-queue': queue,
  '-hug': hug
}
