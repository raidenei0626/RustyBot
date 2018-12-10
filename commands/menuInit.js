const Discord = require("discord.js");

// The AboutBot command is used to display information about the bot and it contributos
// Along with the repo and test server

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "initmenu",
    category: "Miscelaneous",
    description: "initiates menus",
    usage: "initmenu <menu-name>"
};

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    if(args[0] === "welcome") menu.embed("welcome", message.channel)
    if(args[0] === "discord") menu.embed("usingDiscord", message.channel)
};