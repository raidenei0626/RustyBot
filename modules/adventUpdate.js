module.exports = (client) => {
    const Discord = require("discord.js");
    const fetch = require('node-fetch');
    const moment = require('moment');
    fs = require('fs');


    // Fetch stats and combine them into one file
    client.updateStats = async (r) => {

        // time convertion to EST
        var dt = new Date();
        var offset = -300; //Timezone offset for EST in minutes.
        var estDate = new Date(dt.getTime() + offset * 60 * 1000);

        const object = {}
        await fetch("https://cors.io/?http://91.121.210.171:42551/solutions/all")
            .then(res => res.json())
            .then(json => object["all"] = json.length)

        await fetch("https://cors.io/?http://91.121.210.171:42551/solutions/?day=" + estDate.getDate())
            .then(res => res.json())
            .then(json => object["day"] = json.length)

        await fetch("https://cors.io/?http://91.121.210.171:42551/user")
            .then(res => res.json())
            .then(json => object["user"] = json.length)

console.log(JSON.stringify(object))
        fs.writeFile("./web/advent/adventData.json", JSON.stringify(object), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The advent Stats file was updated");
        });
    }

    // Update the stats embed
    client.getStats = async (rSubs) => {
        const chan = client.channels.get("516297176335253519");
        let stats;
        
        

        await fetch('http://91.121.210.171:42551/data')
            .then(res => res.json())
            .then(json => stats = json);

         

        await chan.fetchMessages({ around: "516298881118633998", limit: 1 })
            .then(messages => {
                const fetchedMsg = messages.first(); // messages is a collection!)

                var dt = new Date();
                var offset = -300; //Timezone offset for EST in minutes.
                var estDate = new Date(dt.getTime() + offset * 60 * 1000);


                // do something with it
                const newEmbed = new Discord.RichEmbed()
                    .setTitle("Advent of Code Stats")
                    .setDescription(``)
                    .addField(`:arrows_counterclockwise: ${stats.all} Solutions`, "Total Solutions", true)
                    .addField(`🗓 ${stats.day} Today`, "Todays Total", true)
                    .addField(`:family_wwb:  ${stats.user} Paticipants`, "Total ZTM Paritcipants", true)
                    .addBlankField()
                    .addField("Recent Submissions", "-")
                    .setFooter(`❇ Last Updated: ${moment(estDate).format('MMM Do - h:mm a')} EST`)
                    
                    rSubs.forEach(rs => {
                        newEmbed.addField(rs[0], rs[1], true)
                    });

                fetchedMsg.edit(newEmbed);
                
                
            });
    }
    
        // Recent Submissions
        client.recentSubmissions = (newSub) => {
            var recentSub = JSON.parse(fs.readFileSync("./web/advent/recentSubmissions.json", {"encoding": "utf-8"}))
            console.log("RECENT: ", recentSub, recentSub.length)

            if(recentSub.length > 25) recentSub.pop()
            recentSub.push(newSub)

            fs.writeFile("./web/advent/recentSubmissions.json", JSON.stringify(recentSub), function (err) {
                if (err) {
                    return console.log(err);
                }
    
                console.log("The newSub file was updated");
                client.getStats(recentSub)
            });
        }
}