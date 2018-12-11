const express = require('express')
const app = express()
const port = 8002;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient


module.exports = (client) => {




    app.get('/solutions', function (req, res) {
        console.log(req.query.day);

        MongoClient.connect(client.settings.mlabs, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("zeroBot");
            dbo.collection("users").find({ dayNumber: req.query.day }).toArray(function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
        });
    });








    app.listen(port, function () {
        client.logger.loaded(`ZeroWeb is running on port: ${port}`);
    })

    // Default View
    app.get('/', function (req, res) {
        res.send('API ZeroBot V3');
    })

    // Test View
    app.get('/test', function (req, res) {
        res.send('TEST VIEW');
        console.log(Object.keys(client.userDB))
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
                    res.json(user);
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
                    res.json(name);
                }
            });
    });
}