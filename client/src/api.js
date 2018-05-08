import axios from 'axios'

class Api {

  static fetchRawTransaction(network, tx_hash) {
    return axios.get(network.apiRoot + '/getrawtransaction/' + tx_hash)
  }

  static getAddressHistory(network, address) {
    return axios.get(network.apiRoot + '/blockchain.address.get_history/' + address)
  }

  static addressBalance(network, address) {
    return axios.get(network.apiRoot + '/blockchain.address.get_balance/' + address)
  }

}

export default Api