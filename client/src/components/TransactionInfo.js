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
import TimeAgo from 'react-timeago'
import { Jumbotron, Card, CardTitle, CardBody, Button } from 'reactstrap'
import TransactionInput from '../components/TransactionInput'
import TransactionOutput from '../components/TransactionOutput'
import withNetwork from '../withNetwork'

class TransactionInfo extends React.Component {

  render() {
    return (
      <div className="mb-5">
        <Jumbotron className="mb-0  no-border-bottom">

          <h4 className="display-7">
            <span className="text-info upper">{this.props.network.name} Transaction</span><br/>
            <span className="text-info oi oi-transfer mb-2 mr-sm-2 mb-sm-0" title="icon name" aria-hidden="true"></span>
            {this.props.tx.txid}
          </h4>
        </Jumbotron>

        <div className="container hide">
          <div className="row justify-content-center">
            <div className="col-1 mx-auto">
              <Button color="primary" type="submit">Details
              </Button>
            </div>
          </div>
        </div>

        <Card className="mt-0">
          <CardBody>
            <CardTitle>
            </CardTitle>
            <div className="row mb-5">
              <div className="col-sm text-center">
                <h5 className="upper">fees</h5>
                <span className="text-info">{this.props.tx.fees} {this.props.network.symbol} </span>
              </div>
              <div className="col-sm text-center">
                <h5 className="upper">confirmations</h5>
                <span className={ (this.props.tx.confirmations > 1 ? 'text-success' : '') }>{this.props.tx.confirmations}</span>
              </div>
              <div className="col-sm text-center">
                <h5 className="upper">blocktime</h5>
                <TimeAgo className="text-info" date={ new Date(this.props.tx.blocktime *1000) }/>
              </div>
            </div>


            <div className="row">
              <div className="col-md-5">
                {this.props.tx.vin && this.props.tx.vin.map(function(input, index) {
                  return <TransactionInput key={ index } input={ input }></TransactionInput>
                })}
              </div>
              <div className="col-md-2 text-center">
                <p className="display-4 text-warning">
                  <span className="oi oi-arrow-thick-right" title="icon name" aria-hidden="true"></span>
                </p>
              </div>
              <div className="col-md-5">
                {this.props.tx.vout && this.props.tx.vout.map(function(output, index) {
                  return <TransactionOutput key={ index } output={ output }></TransactionOutput>
                })}
              </div>
            </div>

          </CardBody>
        </Card>

      </div>
    )
  }
}

export default withNetwork(TransactionInfo)
