import React from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
import networks from '../networks'
import withNetwork from '../withNetwork'

class NetworkDropdown extends React.Component {

  render() {
    var options = networks.map((option) => {
      return (
        /* eslint-disable react/jsx-no-bind */
        <DropdownItem key={ option.ticker } className="upper"
                      onClick={ () => {   this.props.onNetworkChange(option)} }>
          {option.name}
        </DropdownItem>
      )
    })

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="upper">
          {this.props.network.name}
        </DropdownToggle>
        <DropdownMenu right>
          {options}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}


export default withNetwork(NetworkDropdown)