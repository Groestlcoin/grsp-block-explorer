import React from 'react'
import TransactionInfo from '../components/TransactionInfo'

class TransactionHistory extends React.Component {
  
  render() {
    return (
      <div>{ this.props.history.length } transactions
        {this.props.history.map(function(transaction, index) {
          return <TransactionInfo key={ index } height={ transaction.height } tx_hash={ transaction.tx_hash }></TransactionInfo>
        })}
      </div>
    )
  }

}

export default TransactionHistory