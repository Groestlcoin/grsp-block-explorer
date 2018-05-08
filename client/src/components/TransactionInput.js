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
import AddressLink from './AddressLink'
import withNetwork from '../withNetwork'

class TransactionInput extends React.Component {

  render() {
    return (
      <div>
        {this.props.input.value} {this.props.network.symbol}  from <br/>
        <AddressLink address={ this.props.input.addresses }/>
        &nbsp;(<a href={ '#/transaction/' + this.props.input.txid }>output</a>)
        <hr/>
      </div>
    )
  }

}

export default withNetwork(TransactionInput)