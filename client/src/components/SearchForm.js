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
import { Button, Form, FormGroup } from 'reactstrap'

class SearchForm extends React.Component {
  
  state = {
    valid: false,
    value: null,
    type: null
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({valid: this.isValid(event.target.value)})
    this.setState({value: event.target.value})
  }

  isValid(value) {
    if(value.length >= 25 && value.length <= 36) {
      // todo check with bitcoinjs ...
      this.setState({type: 'address'})
      return true
    }
    if (value.length === 64) {
      this.setState({type: 'transaction'})
      return true
    }
    this.setState({type: null})
    return false
  }

  handleSubmit(event) {    
    event.preventDefault()
    this.props.onSubmit({ type: this.state.type, value: this.state.value })
  }

  render() {
    return (
      <Form inline  onSubmit={ this.handleSubmit }>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <input type="text" placeholder="Enter address, transaction" value={ this.props.value } onChange={ this.handleChange }/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Button color="primary" type="submit">
            <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>
          </Button>

        </FormGroup>
      </Form>
    )
  }
}

export default SearchForm