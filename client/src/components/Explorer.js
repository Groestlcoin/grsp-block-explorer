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
import { HashRouter, Switch, Route } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem} from 'reactstrap'
import logo from '../logo.png'
import withNetwork from '../withNetwork'
import NetworkDropdown from '../components/NetworkDropdown'
import SearchForm from '../components/SearchForm'
import TransactionContainer from '../components/TransactionContainer'
import Address from '../components/Address'
import Blocks from '../components/Blocks'
import RPCError from '../components/RPCError'

/* eslint-disable react/jsx-no-bind */
class Explorer extends React.Component {
  
  state = {
    type: null,
    value: null,
    history: [],
    error: null,

  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleSubmit(query) {
    if (!query.value) { return }
    this.setState({query: query.value})
    switch(query.type) {
    case 'address':
      window.location.href = '#/address/' + query.value
      break
    case 'transaction':
      window.location.href = '#/transaction/' + query.value
      break
    default:
      this.handleError('this is not a valid address or transaction')
    }
  }

  handleError(error) {
    this.setState({error: error.toString()})
  }

  onRPCError(error) {
    this.setState({error: error.toString()})
  }
  
  render() {
    return (
      <div>

        <Navbar color="light" light expand="md">
          <NavbarBrand className="text-danger" href="/">
            <img src={ logo } alt="" />
            block explorer</NavbarBrand>
          <NavbarToggler onClick={ this.toggle } />
          <Collapse isOpen={ this.state.isOpen } navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <SearchForm query={ this.state.query } onSubmit={ this.handleSubmit }/>
              </NavItem>
              <NetworkDropdown/>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="ml-4 mr-4">
          <RPCError error={ this.state.error }/>
          {(!this.state.error &&
        <HashRouter><Switch>

          <Route exact path='/' component={ Blocks }/>
          <Route exact path='/transaction/:tx_hash' 
            render= { ({match}) => {
              return ( <TransactionContainer  onRPCError={ this.onRPCError.bind(this) } tx_hash={ match.params.tx_hash }></TransactionContainer>)}
            }
          /> 
          <Route exact path='/address/:address' 
            render= { ({match}) => {
              return ( <Address onRPCError={ this.onRPCError.bind(this) } address={ match.params.address }></Address>)}
            }
          />

        </Switch></HashRouter>
          )}
        </div>
      </div>
    )
  }
}

export default withNetwork(Explorer)
