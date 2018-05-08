import React from 'react'

class AddressLink extends React.Component {

  render() {
    return (
      <span>
        <a href={ '#/address/' + this.props.address }>
          <span className="text--red oi oi-grid-four-up mb-2 mr-sm-2 mb-sm-0" title="icon name" aria-hidden="true"></span>{this.props.address}</a>
      </span>
    )
  }

}

export default AddressLink