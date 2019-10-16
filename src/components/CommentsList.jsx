import React, { Component } from 'react'
import Comment from 'components/Comment'
import accordion from '../decorators/accordion'

// isOpen={openItemId === article.id};
//

class CommentsList extends Component {

  componentDidCatch(err) {
    console.log('CommentsList');
    console.log(err);
  }

  render() {
    const isOpen = this.props.openItemId;
    const comments = this.props.comments;

    if(!comments) return <div><button disabled>Комментариев нет</button></div>

    return (
      <div>
        <button onClick={this.handleBtnClick}>
          {isOpen ? 'Закрыть комментарии' : `Открыть комментарии`}
        </button>
        <ul>{isOpen && this.body}</ul>
      </div>
    )
  }

  get body() {
    const { comments } = this.props;

    return comments.map((comment) => (
      
      <li key={comment.id}>
        <Comment
          text={comment.text}
          user={comment.user}
        />
      </li>
    ))
  }

  handleBtnClick = () => this.props.toggleOpenItem(1)
}

const CommentsListWithAccordion = accordion(CommentsList)

export default CommentsListWithAccordion
