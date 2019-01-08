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
  let author = message.author
  let issue = args.join(' ');
  if(client.channels.has(client.settings.issueTracker)) client.channels.get(client.settings.issueTracker).send(author + ' reported an issue: ' + issue)
  
}