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
import React from 'react'
import { Spinner, spinnerService } from '@chevtek/react-spinners'
import TransactionInfo from '../components/TransactionInfo'
import Api from '../api'
import withNetwork from '../withNetwork'

class TransactionContainer extends React.Component {
  
  state = {
    rawTx: null,
    tx: {}
  }

  handleError(error) {
    this.props.onRPCError(error.message)
    spinnerService.hide('mySpinner')
  }

  componentDidMount() {
    spinnerService.show('mySpinner')
    this.fetchRawTransaction(this.props.tx_hash)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tx_hash !== nextProps.tx_hash) {
      spinnerService.show('mySpinner')
      this.fetchRawTransaction(nextProps.tx_hash)
    }
  }

  fetchRawTransaction (tx_hash) {
    Api.fetchRawTransaction(this.props.network, tx_hash)
      .then((response) => this.enhanceRawTransaction(response.data.result))
      .catch((error) => this.handleError('1' + error))
  }

  enhanceRawTransaction(tx) {
    let promises = []
    for (let i = 0; i < tx.vin.length; i++) {
      let inputTx = tx.vin[i].txid
      promises.push(Api.fetchRawTransaction(this.props.network, inputTx))
    }
    Promise.all(promises).then((arr) => this.improveInputs(tx, arr))
      .catch((error) => this.handleError('2 ' + error))
  }

  improveInputs(tx, arr) {
    let sumInput = 0
    for (let i = 0; i < arr.length; i++) {
      let input = arr[i].data.result
      sumInput += this.improveInput(tx, input, i, tx.vin[i].vout)
    }
    tx.inputsValue = sumInput
    let sumOutput = 0
    for (let i = 0; i < tx.vout.length; i++) {
      sumOutput += tx.vout[i].value
    }
    tx.outputsValue = sumOutput
    tx.fees = (tx.inputsValue - tx.outputsValue).toFixed(5)
    this.setState({tx: tx, error: null})
    spinnerService.hide('mySpinner')
  }

  improveInput(tx, input, m, n) {
    tx.vin[m].addresses = input.vout[n].scriptPubKey.addresses
    tx.vin[m].value = input.vout[n].value
    return tx.vin[m].value
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    } else {
      return (
        <div>
          <Spinner  name="mySpinner">
            <div className="center-spin">
              <div className="spinner"></div>
            </div>
          </Spinner>
          <TransactionInfo tx={ this.state.tx }></TransactionInfo>
        </div>
      )
    }
  }
}

export default withNetwork(TransactionContainer)
