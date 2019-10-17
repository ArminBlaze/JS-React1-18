import React, { PureComponent } from 'react'

class Comment extends PureComponent {
  render() {
    const { text, user } = this.props;

    return (
      <div>
        <div>
          <h3>{user}</h3>
        </div>
        <p>
          {text}
        </p>
      </div>
    )
  }

}

export default Comment
