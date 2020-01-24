import React, { Component } from 'react'
import {Consumer as LangConsumer} from 'context/lang'

class UserForm extends Component {

  render() {
    return (
      <LangConsumer>{(getText) => (
        <div>
          {getText('username') + ': '}
          <input value={this.props.username} onChange={this.handleUserChange} />
        </div>
      )}</LangConsumer>
    )
  }

  handleUserChange = (ev) => {
    // if (ev.target.value.length > 10) return this.setState({ username: '' })

    this.props.onChange( ev.target.value )
  }
}

export default UserForm
