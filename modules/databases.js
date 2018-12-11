const token = require("../tokens.json");
const mongoose = require('mongoose');
mongoose.connect(`${token.mlabs}`, { useNewUrlParser: true });


module.exports = (client) => {
    // Buddy Schema
    client.buddyDB = mongoose.model('buddy', new mongoose.Schema({
        name: String,
        timezone: String,
        avail: Boolean,
        buddy: String
    }));

    // User Schmea
    client.userDB = mongoose.model('user', new mongoose.Schema({
        name: String,
        rank: String,
    }));
}