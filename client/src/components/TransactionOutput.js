import React from 'react'
import AddressLink from './AddressLink'
import withNetwork from '../withNetwork'

class TransactionOutput extends React.Component {

  render() {
    return (
      <div>
        <AddressLink address={ this.props.output.scriptPubKey.addresses }/>
        <h2>{this.props.output.value} {this.props.network.symbol} </h2>
        <hr/>
      </div>
    )
  }

}

export default withNetwork(TransactionOutput)
