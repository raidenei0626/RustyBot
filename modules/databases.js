const token = require("../tokens.json");
const mongoose = require('mongoose');
console.log("loaded")
mongoose.connect(`${token.mlabs}`, { useNewUrlParser: true });


module.exports = (client) => {
    // Buddy Schema
    client.buddy = mongoose.model('users', new mongoose.Schema({
        name: String,
        timezone: String,
        avail: Boolean,
        buddy: String
    }));

    // User Schmea
    client.user = mongoose.model('users', new mongoose.Schema({
        name: String,
        rank: String,
        stats: Object,
    }));
}