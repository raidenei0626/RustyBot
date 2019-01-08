exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'report',
  category: 'Miscelaneous',
  description: 'Report an issue to Admin team',
  usage: 'report [MESSAGE]'
}

exports.run = (client, message, args) => {
  if(client.channels.has(client.settings.issueTracker)) {
    client.channels.get(client.settings.issueTracker).send(message.author + ' reported an issue: ' + args.join(' '))
    message.reply('Your issue has been successfully reported!')
    message.delete()
  }
}