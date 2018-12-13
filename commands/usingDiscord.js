const Discord = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    if(args === "basics") message.channel.send("Discords Basics Place Holder!!!!")
    if(args === "markdown") message.channel.send("Discords **Markdown** Place Holder")
    if(args === "voicechat") message.channel.send("Discords :microphone: **Voice Chat** Place Holder")

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["using"],
    permLevel: "User"
};

exports.help = {
    name: "usingdiscord",
    category: "Miscelaneous",
    description: "How to use Discord",
    usage: "usingdiscord"
};
