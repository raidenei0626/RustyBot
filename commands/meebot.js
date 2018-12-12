const fetch = require('node-fetch');
fs = require('fs');

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mee"],
    permLevel: "User"
};

exports.help = {
    name: "meebot",
    category: "Miscelaneous",
    description: "Meebot Fetch API",
    usage: ""
};


exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    let page = 0
    let data = []

    while (page < 11) {

        await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/423464391791476747?page=${page}&limit=999`)
            .then(res => res.json())
            .then(json =>
                json.players.forEach(element => {
                    data.push(element)
                })
            );
        // console.log(data)
        console.log(page)
        page++
    }
    let obj
    fs.writeFile("./web/mee/data.json", JSON.stringify(data), function (err) {
        if (err) {
            return console.log("AdventUpdate Module - 1", err);
        }
    })
    
}