import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSTransition from 'react-addons-css-transition-group';
import accordion from '../../decorators/accordion';
import './CommentsList.css';
import CommentForm from 'components/CommentForm/CommentForm'


export class CommentsList extends Component {

  static propTypes = {
    openItemId: PropTypes.string.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
    
    comments: PropTypes.arrayOf(PropTypes.string)
  }

  componentDidCatch(err) {
    console.log('CommentsList');
    console.log(err);
  }

  render() {
    const isOpen = this.props.openItemId;
    
    const {article} = this.props;
    
    const {comments} = article;

    const commentForm = <CommentForm articleId={article.id}/>;

    if(!comments) return (
      <div>
        {commentForm}
        <button className='test__commentsList__btn' disabled>Комментариев нет</button>
      </div>
      )

    return (
      <div>
        {commentForm}
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
    
    const { article } = this.props;
    console.log(article);
    
    const ids = article.comments;

    return (
      <ul>
        {
          ids.map((id) => (
            
            <li key={id} className='test__commentsList__item'>
              <Comment id={id}
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

export default CommentsListWithAccordion;

