import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class Comment extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }


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
