const Discord = require("discord.js");

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["s"],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscelaneous",
    description: "Member Stats",
    usage: "stats [username]"
};


exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    let userArray = [message.author.id, message.author.username, message.author.avatarURL];

    if (message.mentions.members.first() || message.guild.members.get(args[0])) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0])
        userArray = [member.user.id, member.user.username, member.user.avatarURL]
    } else if (args[0].length > 3) {
        let usr = client.users.find(user => user.username.toLowerCase() === args[0].toLowerCase())
        if (usr === null) {
            message.reply("A user with that name could not be found! Here are your stats instead...")
        } else {
            userArray = [usr.id, usr.username, usr.avatarURL]
        }
    }

    client.userDB.findOne({
        name: userArray[1]
    }, (err, userr) => {
        if (err) console.log(err);
        if (!userr) {
            message.reply("We have not data for this user")
        } else {
            fields = [["Joined ZTM", userr.joined, true], ["Joined Discord", userr.created, true], ["Messages Sent", userr.stats.mCount, true], ["Commands Issues", userr.stats.cmd, true]]
            client.sendembed(message.channel, `User stats for ${userArray[1]}`, userArray[2], "Description here", fields, "#000", boolean = true)
        }
    })

}