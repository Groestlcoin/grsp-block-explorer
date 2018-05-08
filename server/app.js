const express = require('express')
const electrum = require('./electrum')
const bitcoind= require('./bitcoind')
const app = express()
const path = require('path')

console.log("NODE_ENV is ",process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  console.log('enabled CORS')
}

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/btct/*/*', function (req, res) {
  switch (req.params[0]) {
    case "blockchain.address.get_history":
      electrum.respond(res, req.params[0], [req.params[1]])
      break;
    case "getrawtransaction":
      let txId = "" + req.params[1]
      bitcoind.respond(res, req.params[0], [txId, 1])
      break;
    case "blockchain.address.get_balance":
      electrum.respond(res, req.params[0],[req.params[1]])
      break;
    default:
      res.sendStatus(400)
  }
})

// default to 400, bad request if not handled
//app.get('/*', function (req, res) {
//  res.sendStatus(400)
//});

app.listen(3000, function () {
  console.log('btcp-block-explorer, server listening on port 3000!')
})
