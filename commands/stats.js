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
    let name;
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!member) name = message.author.username + "#" + message.author.discriminator
    else name = member.user.username + "#" + member.user.discriminator;

    client.userDB.findOne({
        name: name
    }, (err, userr) => {
        if (err) console.log(err);
        if (!userr) {
            message.reply("We have not data for this user")
        } else {
            fields = [["Joined ZTM", userr.joined, true], ["Joined Discord", userr.created, true], ["Messages Sent", userr.stats.mCount, true], ["Commands Issues", userr.stats.cmd, true]]
            thumb = client.users.get(message.author.id).avatarURL
            client.sendembed(message.channel, "User stats", thumb, "Description here", fields, "#000", boolean = true)
        }
    })

}