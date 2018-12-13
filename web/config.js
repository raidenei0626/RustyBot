const express = require('express')
const app = express()
const port = 8002;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');


module.exports = (client) => {
    app.listen(port, function () {
        client.logger.loaded(`ZeroWeb is running on port: ${port}`);
    })

    // Default View
    app.get('/', function (req, res) {
        res.send('API ZeroBot V3');
    })

    // Buddy View
    app.get('/buddy', function (req, res) {
        client.buddyDB.find({})
            .exec(function (err, buddy) {
                if (err) {
                    res.send('error occured')
                } else {
                    console.log("BUDDY LOADING")
                    res.json(buddy);
                }
            });
    });

    //   User View
    app.get('/users', function (req, res) {
        client.userDB.find({})
            .exec(function (err, user) {
                if (err) {
                    res.send('error occured')
                } else {
                    let data = []
                    user.forEach(u => {
                        let user = client.users.find(user => user.username.toLowerCase() == u.name.toLowerCase());
                        if (u.name.includes("#")) return //Incase names still have the discriminator
                        u.avatar = client.users.get(user.id).avatarURL
                        data.push(u)
                    });
                    res.json(data);
                }
            });
    });

    app.get('/users/:name', function (req, res) {
        client.userDB.find({
            name: req.params.name
        })
            .exec(function (err, name) {
                if (err) {
                    res.send('error occured')
                } else {
                    let user = client.users.find(user => user.username.toLowerCase() == req.params.name.toLowerCase());

                    if (user !== null) name[0].avatar = client.users.get(user.id).avatarURL
                    res.json(name[0]);
                }
            });
    });

    app.get('/avatar/:user', function (req, res) {

        let user = client.users.find(user => user.username.toLowerCase() == req.params.user.toLowerCase());

        console.log(req.params.user, user)
        res.send(client.users.get(user.id).avatarURL)
    });
    
    app.get('/meebot', async function (req, res) {
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
            page++
        }
        
        let total = 0
        let totUsers;
        let range = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        data.forEach((d, i) => {
            msgCount = d.xp / 20
            total = total + msgCount
            totUsers = i
            if (msgCount <= 1) range[0]++
            if (msgCount > 1 && msgCount <= 2) range[1]++
            if (msgCount > 2 && msgCount < 3) range[2]++
            if (msgCount > 10 && msgCount < 100) range[3]++
            if (msgCount > 100 && msgCount < 1000) range[4]++
            if (msgCount > 1000 && msgCount < 2000) range[5]++
            if (msgCount > 2000 && msgCount < 3000) range[6]++
            if (msgCount > 3000 && msgCount < 4000) range[7]++
        });

        res.send({
            totalMessages: total,
            totalUsers: totUsers,
            oneMsg: range[0],
            twoMsg: range[1],
            threMsg: range[2],
            msg10to100: range[3],
            msg100to1000: range[4],
            msg1000to2000: range[5],
            msg2000to3000: range[6],
            msg3000to4000: range[7],
            members: data
        });
    })
}