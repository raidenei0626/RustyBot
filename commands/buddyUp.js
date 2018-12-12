const Discord = require("discord.js");
const token = require("../tokens.json")

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["b"],
    permLevel: "User"
};

exports.help = {
    name: "buddy",
    category: "Miscelaneous",
    description: "Buddy Pairing system",
    usage: "initmenu <menu-name>"
};


exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    console.log(args, args[0])
    if (args[0] === "req") {
        let name = message.author.username
        let timezone = (args[1] ? args[1] : "Not Specified")

        client.buddyDB.create({ name, timezone, avail: true }, function (err, newData) {
            if (err) {
                console.log(err);
            } else {
                client.logger.debug("ADDED TO DB")
            }
        });
    }else{

        
    }
}