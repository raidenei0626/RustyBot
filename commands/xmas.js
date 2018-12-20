const Discord = require("discord.js");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const rusty = "https://api.zerobot.xyz/images/rustyname.png";
const rustybig = "https://api.zerobot.xyz/images/Rusty2.png";

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["x"],
    permLevel: "User"
};

exports.help = {
    name: "xmas",
    category: "Miscelaneous",
    description: "Display info about the bot and its contributors",
    usage: "about",
    icon: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-help-about-icon.png"
};

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
  
    // Declare a base size of the font
    let fontSize = 270;
  
    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);
  
    // Return the result to use in the actual canvas
    return ctx.font;
  };

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    console.log("TEST")
    let member;
    if (message.mentions.members.first() || message.guild.members.get(args[0])) {
       member = message.mentions.members.first()
    } else {
        member = message.guild.members.get(message.author.id)
    }

    
	const canvas = Canvas.createCanvas(1746, 1984);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(rusty);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#36ff00';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '278px "Merry Christmas Star"';
	ctx.fillStyle = '#ff1800';
	ctx.fillText('*Merry0Christmas+', canvas.width / 16.5, canvas.height / 1.235);

	// Add an exclamation point here and below
	ctx.font = '228px Arial"';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = "center"; 
	ctx.fillText(`${member.displayName}!`, canvas.width / 1.95, canvas.height / 1.04);
    


	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'http://en.es-static.us/upl/2018/12/Parker-Solar-Probe-sun-atmosphere-Dec-17-2018-800x851.jpg');

	message.channel.send( attachment);
   
};