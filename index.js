require('dotenv').config()
const Discord = require('discord.js');
const { token, prefix } = require('./config/config');
const commands = require('./commands/index')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  const [message] = msg.content.split(' ')
  if (message.startsWith(prefix)) {
    const command = commands[message] || null
    
    if (!command) {
      return msg.channel.send(`Meu caro amigo ${msg.author.username}, não tenho este comando disponível!`)
    }
    
    return command(msg)
  }
  return false;
});

client.login(token);