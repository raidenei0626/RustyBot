const express = require('express')
const app = express()
const port = 8002;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient


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
                        if(u.name.includes("#")) return //Incase names still have the discriminator
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
}