const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require('fs');
const path = require("path");
const ytSearch = require( 'yt-search' )
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../tokens.json"), 'utf-8'));


let queue = []
let isPlaying = false;

let voiceChannel = null;
let dispatcher = null;
let isPausedLocal = false;

exports.run = (client, message, args) => {

	client.logger = require("../modules/Logger");

	const addToQueue = (strID) => {
		queueDispUpdate()
		queue.push(strID);
	}

	const playMusic = (id, message) => {
		// voiceChannel = message.member.voiceChannel;
		voiceChannel = client.channels.get('521433206306766848');
		queueDispUpdate();

		console.log("vc type", typeof(voiceChannel));

		// voiceChannel.setBitrate(24)
		//   .then(vc => {


		try {
			voiceChannel.join().then(async function(connection) {
				console.log("idddddddddd", id)
				client.logger.debug("id type" +  typeof(id))
				console.log('video url', "https://www.youtube.com/watch?v="+id);

				let completeUrl = "https://www.youtube.com/watch?v=" + id;

				dispatcher = await connection.playStream(ytdl(completeUrl, { filter: 'audioonly'}));
				dispatcher.setVolume(client.volume/10);

				dispatcher.on('progress', (d, total, length) => {
		          console.log('progress', total / length);
		        });

				dispatcher.on('end', () => {
					// console.log("queue", queue);
					queue.shift();
					// console.log("queue after", queue);
					queueDispUpdate()
					if (queue.length === 0) {
						queue = [];
						isPlaying = false;
						console.log('buh bye');
						voiceChannel.leave();
					} else {
						console.log(queue);
						console.log('else of disp.end');
						playMusic(queue[0], message)
					}
				});
			});

		} catch (e) {
			console.log("sstupid errorrrrrrrr", e);
		}

		// console.log(`Set bitrate to ${vc.bitrate}kbps for ${vc.name}`)
		// })
		// .catch(console.error);

		/////////////////////
	}

	const getId = (str, cb) => {
		searchVideo(str, function(id) {
			cb(id);
		});
	}

	//youtube-api
	const searchVideo = (query, callback) => {
		// request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.yKey.toString(), function(error, response, body) {
		// 	let json = JSON.parse(body);
		// 	console.log(json.items[0].id)
		// 	callback(json.items[0].id.videoId);
		// })



		ytSearch( query, function ( err, r ) {
		  if ( err ) throw err

		  const videos = r.videos
		  const playlists = r.playlists
		  const accounts = r.accounts

		  const firstResult = videos[ 0 ]
		  	console.log(videos[0].videoId)
  			callback(videos[0].videoId);

		  // console.log( firstResult )
		} )
	}

	// Update the stats embed
    const queueDispUpdate = async () => {
        const chan = client.channels.get("523106109297524738");
        let stats;

        await chan.fetchMessages({ around: "523106290944311297", limit: 1 })
            .then(messages => {
                const fetchedMsg = messages.first(); // messages is a collection!)

                // do something with it
                const newEmbed = new Discord.RichEmbed()
                    .setTitle("zeroBot Controller")
                    .setDescription(``)
					.addField(`:loudspeaker: Current Volume:`, `${(client.volume/12)*100}%`, true)
                    .addField(" :musical_note: Songs Queue :musical_note: ", "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")

                queue.forEach(rs => {

                    newEmbed.addField(rs, `[${rs}](https://www.youtube.com/watch?v=${rs})`, true)
                });

                fetchedMsg.edit(newEmbed);


            });
    }

/////////////////////////////////////////////////controls//////////////////////////////////////////////////////////
	if (client.isSkipped) {
		client.isSkipped = false;
		dispatcher.end();
		if (queue.length > 0) {
			console.log('hola');
		} else {
			queue = [];
		}
		return
	}

	if (client.trigger && isPlaying) {
		// ALWAYS PUT VOLUME CONTROLS AT THE BOTTOM OF ELSE-IF
		if (isPausedLocal && client.isPaused) {
			isPausedLocal = false;
			dispatcher.resume();
		} else if (!isPausedLocal && client.isPaused) {
			isPausedLocal = true;
			dispatcher.pause();
		} else if (client.volControl && client.volume<12) {
			client.volume+=2;
			console.log(client.volume);
		} else if (!client.volControl && client.volume>0) {
			client.volume-=2;
			console.log(client.volume);
		}
		queueDispUpdate();
		dispatcher.setVolume(client.volume/10);
		client.trigger = false;
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	console.log('hi')

	if (!args[0]) {
		sendMenu(client, message)
		return
	}
    if (args[0] === "leave") {
		if (isPlaying) {
			isPlaying = false;
			queue = [];
			message.channel.send("**DJ {zeroBot}** Signing Off :microphone:");
			queueDispUpdate()
			message.member.voiceChannel.leave();
		}else {
			message.channel.send(":thinking: i'm not in the voice Channel");
		}
		return
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
				queue.push(id);
				playMusic(id, message);
				message.reply(`:musical_note: :musical_note: <${args}> :musical_note: :musical_note:`);
				message.reply("now playing: **"+id+"**");
			})
		}
	} else if (args[0] === "play") {
		console.log('playing -> I ♥ RADIO');
		isPlaying = true;
		voiceChannel = message.member.voiceChannel;

			voiceChannel.join().then(function (connection) {

				stream = "http://stream01.iloveradio.de/iloveradio1.mp3"

				let dispatcher = connection.playStream(stream);

			});
	}

	if (args[0] === "radio") {
	    console.log('playing -> I ♥ MASHUP');
	    isPlaying = true;
	    voiceChannel = message.member.voiceChannel;

	        voiceChannel.join().then(function (connection) {

	            stream = "http://stream01.iloveradio.de/iloveradio5.mp3"

	            let dispatcher = connection.playStream(stream);

	        });
	}

};

const sendMenu = (client, message) => {
    let adventMenu = new Discord.RichEmbed()
        // changing setAuthor to setTitle below
        .setTitle("zeroBot Display")
        .setThumbnail("http://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/256/christmas-tree-icon.png")
        .setColor("B3000C")
        .setDescription("Settings and queue display")
        .addField(":loudspeaker: Current Volume: ", `${(client.volume/12)*100}%`, true)
        .addBlankField()
    message.channel.send({ embed: adventMenu });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'play'
};
