import React, { Component } from 'react'
import Explorer from './components/Explorer'
import {NetworkProvider} from './NetworkProvider'

class App extends Component {
  render() {
    return (
      <div>
        <NetworkProvider>
          <Explorer></Explorer>
        </NetworkProvider>
      </div>
    )
  }
}

export default App
