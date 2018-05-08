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