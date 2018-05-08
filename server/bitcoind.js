const config = require('./config')
var request = require('request')

const bitcoind = {
  respond(expressRes, method, params) {
    let  postData = {
      'jsonrpc' : '1.0',
      'id': Date.now(),
      'method': method,
      'params' : params
    };
    request( {
      method: 'POST',
        url: config.bitcoindUrl,
        body: postData,
        json: true
      },

      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          expressRes.send(body)
        } else {
          if (error) {
            expressRes.send(error.toString())
          } else {
            expressRes.send(body)
          }
        }
      }
    );
  }
}

module.exports = bitcoind