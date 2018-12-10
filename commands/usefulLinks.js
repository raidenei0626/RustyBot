const Discord = require("discord.js");

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars

    // Defines Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`Useful Links`)
        .setColor(`#e8c123`)
        .setDescription(
            "**Some handy links that you may find useful:**\n" +
            "[Website](http://zerotomastery.io)\n" +
            "[Github](https://github.com/zero-to-mastery)\n" +
            "[Group Projects](http://www.zerotomastery.io/status.html)\n" +
            "[Andrei's Blog](https://medium.com/@andreineagoie/latest)\n" +
            "[Andrei's Twitter](https://twitter.com/AndreiNeagoie)\n" +
            "[Resources](https://zero-to-mastery.github.io/resources/)"
        )

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
    name: "links",
    category: "Miscelaneous",
    description: "Display a list some handy links",
    usage: "links"
};
