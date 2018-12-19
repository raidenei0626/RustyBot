const Discord = require("discord.js");
const mPlay = require('./play.js');

exports.run = async (client, message, args) => {
    if(args === "pr") {
        client.isPaused = true;
        client.trigger = true;
        mPlay.run(client, message, args);
    }
    if(args === "skip") {
        console.log(typeof(mPlay.run));
        client.isSkipped = true;
        client.trigger = true;
        mPlay.run(client, message, args);
    }
    if(args === "vdecr") {
        client.trigger = true;
        client.volControl = false;
        mPlay.run(client, message, args);
    }
    if(args === "vincr") {
        client.trigger = true
        client.volControl = true;
        mPlay.run(client, message, args);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["music"],
    permLevel: "User"
};

exports.help = {
    name: "minfo",
    category: "Music",
    description: "Control music thngs",
    usage: "minfo"
};
