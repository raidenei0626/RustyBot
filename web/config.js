const express = require('express')
const app = express()
const port = 8002;

module.exports = (client) => {
app.listen(port, function () {
    client.logger.loaded(`ZeroWeb is running on port: ${port}`);
})

app.get('/', function (req, res) {
    res.send('happy to be here');
})
}