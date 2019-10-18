import React, { Component } from 'react'
import Comment from 'components/Comment'
import accordion from '../../decorators/accordion'
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import './CommentsList.css';

export class CommentsList extends Component {

  static propTypes = {
    openItemId: PropTypes.string.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
    
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }))
  }

  componentDidCatch(err) {
    console.log('CommentsList');
    console.log(err);
  }

  render() {
    const isOpen = this.props.openItemId;
    
    const comments = this.props.comments;

    if(!comments) return (
      <div>
        <button className='test__commentsList__btn' disabled>Комментариев нет</button>
      </div>
      )

    return (
      <div>
        <button 
          onClick={this.handleBtnClick}
          className='test__commentsList__btn'
        >
          {isOpen ? 'Закрыть комментарии' : `Открыть комментарии`}
        </button>
        <ul>
          <CSSTransition 
            transitionName='comments'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {isOpen && this.body}
          </CSSTransition>
        </ul>
      </div>
    )
  }

  get body() {
    const { comments } = this.props;

    return (
      <ul>
        {
          comments.map((comment) => (
            
            <li key={comment.id} className='test__commentsList__item'>
              <Comment
                text={comment.text}
                user={comment.user}
              />
            </li>
          ))
        }
      </ul>
    )
  }

  handleBtnClick = () => this.props.toggleOpenItem("opened")
}

const CommentsListWithAccordion = accordion(CommentsList)

export default CommentsListWithAccordion
