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
