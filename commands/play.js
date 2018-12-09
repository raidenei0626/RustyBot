const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require('fs');


let queue = []
let isPlaying = false;

let voiceChannel = null;

exports.run = (client, message, args) => {

	// let config = JSON.parse(fs.readFileSync('/tokens.json', 'utf-8'));

	let ytKey = "AIzaSyAuelBBetrVZIUgkwYxwutgYidhUmKTn1I";


	const addToQueue = (strID) => {
		queue.push(strID);
	}

	const playMusic = (id, message) => {
		voiceChannel = message.member.voiceChannel;

			voiceChannel.join().then(function (connection) {
				console.log("idddddddddd", id)
				console.log("idddddddddd typeeeeeee", typeof(id))
				console.log('video url', "https://www.youtube.com/watch?watch?v="+id);
				let completeUrl = "https://www.youtube.com/watch?v=" + id;
				stream = ytdl(completeUrl, {
					filter: "audioonly"
				});

				let dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => {
					voiceChannel.leave();
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
		request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + ytKey, function(error, response, body) {
			let json = JSON.parse(body);
			callback(json.items[0].id.videoId);
			console.log(json.items[0].id)
		})
	}


	console.log('hi')

    if (!args[0]) return;
    if (args[0] === "leave") {
		client.leaveVoiceChannel(message.member.voiceChannel);
		return message.reply("**DJ zeroBot** Signing Off");
	};
	if(!message.member.voiceChannel) return message.reply(":cry: :cry: no one's listening to my music. \n join the voice channel first");
	console.log('music');
    args = args.join(" ");
	message.reply(`:musical_note: :musical_note: ${args} :musical_note: :musical_note:`);
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
			message.reply("now playing: **"+id+"**");
		})
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
