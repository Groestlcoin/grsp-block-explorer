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