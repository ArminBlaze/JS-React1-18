import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createCommentSelector } from 'selectors';


class Comment extends PureComponent {

  static propTypes = {
    comment: PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    }).isRequired
  }


  render() {
    const { text, user } = this.props.comment;

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

const createMapStateToProps = () => (state, ownProps) => {
  const commentSelector = createCommentSelector();
  
  return {
    comment: commentSelector( state, ownProps )
  };
}

export default connect(createMapStateToProps)(Comment)
