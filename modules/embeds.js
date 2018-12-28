module.exports = (client) => {
    const Discord = require("discord.js");

    client.sendembed = (argsObj) => {
        console.log("RUNNINGS")
        const {color, title, url, author, thumb, desc, image, footer, fields, method} = argsObj
        let embed101 = new Discord.RichEmbed()
            
            .setColor(color)
            if(title !== undefined) embed101.setTitle(title)
            .setURL(url)
            if(author !== undefined) embed101.setAuthor(author)
            .setThumbnail(thumb)
            if(desc !== undefined) embed101.setDescription(desc)
            .setImage(image)
            if(footer !== undefined) embed101.setFooter(footer)
            
            if(fields){
                fields.forEach((f, i) => {
                    embed101.addField(f[0], f[1], f[2])
                })   
            } 
            method.send({embed: embed101});
      }
}