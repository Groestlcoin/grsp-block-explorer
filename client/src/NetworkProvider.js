
import React from 'react'
import networks from './networks'

const Context = React.createContext()

export class NetworkProvider extends React.Component {

  state = {
    network: networks[0],
    onNetworkChange: (network) => {
      this.setState({network: network })
    }
  };

  render() {
    const { state, props: { children } } = this
    return <Context.Provider value={ state }>{children}</Context.Provider>
  }
}
const NetworkConsumer = Context.Consumer
export default NetworkConsumer