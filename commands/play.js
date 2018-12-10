const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require('fs');
const path = require("path");
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../tokens.json"), 'utf-8'));


let queue = []
let isPlaying = false;

let voiceChannel = null;

exports.run = (client, message, args) => {

	client.logger = require("../modules/Logger");

	const addToQueue = (strID) => {
		queue.push(strID);
	}

	const playMusic = (id, message) => {
		voiceChannel = message.member.voiceChannel;

			voiceChannel.join().then(function (connection) {
				console.log("idddddddddd", id)
				client.logger.debug("id type" +  typeof(id))
				console.log('video url', "https://www.youtube.com/watch?v="+id);

				let completeUrl = "https://www.youtube.com/watch?v=" + id;
				stream = ytdl(completeUrl, {
					filter: "audioonly"
					// quality: 92
				});

				let dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => {
					console.log("queue", queue);
					queue.shift();
					console.log("queue after", queue);
					if (queue.length>0 && isPlaying == true) {
						// playMusic(queue[0], message);
						console.log("play the queue")
						playMusic(queue[0], message)
					} else {
						client.logger.debug("buh bye");
						isPlaying = false;
						voiceChannel.leave();
					}
				});
			});
	}

	const getId = (str, cb) => {
		searchVideo(str, function(id) {
			cb(id);
		});
	}

	//youtube-api
	const searchVideo = (query, callback) => {
		request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.yKey.toString(), function(error, response, body) {
			let json = JSON.parse(body);
			console.log(json.items[0].id)
			callback(json.items[0].id.videoId);
		})
	}


	console.log('hi')

    if (!args[0]) return;
    if (args[0] === "leave") {
		if (isPlaying) {
			isPlaying = false;
			message.channel.send("**DJ {zeroBot}** Signing Off :microphone:");
			message.member.voiceChannel.leave();
		}else {
			message.channel.send(":thinking: i'm not in the voice Channel");
		}
		return
	}
	if (args[0] === "skip") {
		if (queue.length>0 && isPlaying) {
			// queue.shift();
			// playMusic(queue[0], message);
			// message.channel.send("skipping current song");
		} else {
			// message.channel.send("**:**/ no songs in queue");
		}
		message.channel.send("yet to be implemented")
	}
	if (args[0] === "play" && args.length>1) {
		if(!message.member.voiceChannel) return message.reply(":cry: :cry: no one's listening to my music. \n join the voice channel first");
		console.log('music');
		args.shift();
	    args = args.join(" ");
		if (queue.length>0 || isPlaying) {
			getId(args, function(id) {
				addToQueue(id);
				message.reply("added to queue: **"+id+"**");
			});
		} else {
			isPlaying = true;
			getId(args, function(id) {
				queue.push("placeholder");
				playMusic(id, message);
				message.reply(`:musical_note: :musical_note: <${args}> :musical_note: :musical_note:`);
				message.reply("now playing: **"+id+"**");
			})
		}
	} else {
		isPlaying = true;
		voiceChannel = message.member.voiceChannel;

			voiceChannel.join().then(function (connection) {

				stream = "http://stream01.iloveradio.de/iloveradio1.mp3"

				let dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => {
						client.logger.debug("buh bye");
						voiceChannel.leave();
				});
			});
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'play'
};
