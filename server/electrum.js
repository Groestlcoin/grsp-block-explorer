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