module.exports = (client) => {
    const Discord = require("discord.js");

    client.sendembed = (argsObj) => {
        const {colour, title, url, author, thumb, desc, image, footer, fields} = argsObj
        let embed101 = new Discord.RichEmbed()
            
            .setColor(colour)
            .setTitle(title)
            .setURL(url)
            .setAuthor(author)
            .setThumbnail(thumb)
            .setDescription(desc)
            .setImage(image)
            .setFooter(footer)
            
            if(fields){
                fields.forEach((f, i) => {
                    embed101.addField(f[0], f[1], f[2])
                })   
            } 
            method.send({embed: embed101});
      }
}