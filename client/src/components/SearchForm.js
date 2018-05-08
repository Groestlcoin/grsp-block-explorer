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