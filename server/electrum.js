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
const ElectrumCli = require('electrum-client')

const electrum = {
  respond(expressRes, method, params) {
    const electrum = new ElectrumCli(config.electrumPort, config.electrumAddress, config.electrumProtocol) // tcp or tls
    electrum.connect().then( conn => {
      electrum.request(method, params).then(response => {
        expressRes.send(response)
      }).catch(function (error) {
        expressRes.send(error)
        async () => {
          await electrum.close()
        }
      })  
    }).catch(function (error) {
      // console.error(error)
      expressRes.send(error)
      async () => {
        await electrum.close()
      }
    })
  }
}

module.exports = electrum