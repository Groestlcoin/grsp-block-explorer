import React from 'react'
import NetworkConsumer from './NetworkProvider'

export default function withNetwork(Component) {

  return function NetworkComponent(props) {
    return (
      <NetworkConsumer>
        {({network,onNetworkChange}) => <Component { ...props } network={ network } onNetworkChange={ onNetworkChange } />}
      </NetworkConsumer>
    )
  }
}