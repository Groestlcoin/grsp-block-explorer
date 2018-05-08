import React from 'react'

class RPCError extends React.Component {

  render() {
    return (this.props.error && <div>
      <div className="alert alert-warning mt-5" role="alert">
        {this.props.error}.
      </div>
      </div>)
  }
}

export default RPCError