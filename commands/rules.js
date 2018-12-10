const Discord = require("discord.js");

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars

    // Defines Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`Community Rules`)
        .setColor(`#f45c41`)
        .setDescription("A few simple common sense rules to keep the community a friendly enviornment, a good rule of thumb would be to conduct yourself as you would at work.\n\n")
        .addField(`Keeping on topic`, `Keep discussion in relevant channels`)
        .addField(`Pinging`, `Do not ping server members or groups unnecessarily`)
        .addField(`Work safe`, `No spam, NSFW, or otherwise offensive content`)
        .addField(`Friendly`, `Be nice to everyone, and try to keep this a friendly environment`)
        .addField(`Have Fun!`, `Have fun and keep coding :D`)

        message.channel.send({
            embed: embed
        })   

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "rules",
    category: "Miscelaneous",
    description: "Display a list of the community rules",
    usage: "ping"
};
