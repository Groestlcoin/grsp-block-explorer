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
import { Jumbotron } from 'reactstrap'
import { Spinner, spinnerService } from '@chevtek/react-spinners'
import Api from '../api'
import TransactionContainer from '../components/TransactionContainer'
import withNetwork from '../withNetwork'

class Explorer extends React.Component {
  
  state = {
    error: null,
    history: []
  }

  componentDidMount() {
    this.fetchAddress(this.props.address)
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.fetchAddress(nextProps.address)
      window.scrollTo(0, 0)
    }
  }

  onRPCError(error) {
    this.props.onRPCError(error)
    spinnerService.hide('mySpinner')
  }

  fetchAddress(address) {
    spinnerService.show('mySpinner')
    // TODO make a Promise.all
    Api.addressBalance(this.props.network, address)
      .then(res => {
        let confirmed = res.data.confirmed
        let unconfirmed = res.data.unconfirmed
        Api.getAddressHistory(this.props.network, address)
          .then(res => {
            if (Array.isArray(res.data)) {
              this.setState({
                confirmed: confirmed / 1e8,
                unconfirmed: unconfirmed / 1e8,
                history: res.data
              })
              spinnerService.hide('mySpinner')
            } else {
              this.onRPCError(res.data.message)
              spinnerService.hide('mySpinner')
            }
          })
          .catch(error =>{
            this.onRPCError(error)
          })

      }).catch(error =>{
        this.onRPCError(error)
      })
  }

  render() {
    return (
      <div>

        <Spinner  name="mySpinner">
          <div className="center-spin">
            <div className="spinner"></div>
          </div>
        </Spinner>

        <Jumbotron className="pb-4">

          <div className="row">
            <div className="col-md-7">
              <h4 className="display-7">
                <span className="text-info upper">{this.props.network.name} Address</span><br/>
                <span className="text-info oi oi-grid-four-up mb-2 mr-sm-2 mb-sm-0" title="icon name" aria-hidden="true"></span>
                {this.props.address}
              </h4>

            </div>
            <div className="col-md-5">
              <h4 className="display-7 upper">Balance</h4>
              <p> { this.state.confirmed } {this.props.network.symbol} </p>
              <h6 className="display-7 upper">Unconfirmed</h6>
              <p>{ this.state.confirmed } {this.props.network.symbol} </p>
            </div>
          </div>

        </Jumbotron>

        <h4>{ this.state.history.length } transactions</h4>
        {/* TODO implement scrolling */}
        {/* eslint-disable array-callback-return */}
        {this.state.history.map(function(transaction, index) {
          if (index < 10) {
            return <TransactionContainer key={ index } onRPCError={ this && this.onRPCError.bind(this) } tx_hash={ transaction.tx_hash }></TransactionContainer>
          }
        })}
      </div>
    )
  }
}

export default withNetwork(Explorer)
