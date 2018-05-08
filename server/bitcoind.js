/*
  Copyright (C) 2018  Emmanuel Florent

  This file is part of btpc-block-explorer.
  https://github.com/emmanuel-florent/btcp-block-explorer

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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