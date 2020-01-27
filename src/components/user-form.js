import React, { Component } from 'react'
// import {Consumer as LangConsumer} from 'context/lang'
import withLangConsumer from 'hoc/withLangConsumer'

class UserForm extends Component {

  render() {
    const {getText} = this.props;

    return (
      <div>
        {getText('username') + ': '}
        <input value={this.props.username} onChange={this.handleUserChange} />
      </div>
    )
  }

  handleUserChange = (ev) => {
    // if (ev.target.value.length > 10) return this.setState({ username: '' })

    this.props.onChange( ev.target.value )
  }
}

export default withLangConsumer(UserForm)
