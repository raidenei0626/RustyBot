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
        client.buddy.find({})
            .exec(function (err, buddy) {
                if (err) {
                    res.send('error occured')
                } else {
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

    app.get('/user/:name', function(req, res) {
        client.userDB.find({
          name: req.params.name
          })
          .exec(function(err, name) {
            if(err) {
              res.send('error occured')
            } else {
              res.json(name);
            }
          });
      });

      
}



  