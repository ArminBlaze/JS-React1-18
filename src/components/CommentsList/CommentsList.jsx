import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSTransition from 'react-addons-css-transition-group';
import accordion from '../../decorators/accordion';
import './CommentsList.css';


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
    
    const comments = this.props.ids;

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
    
    const { ids } = this.props;

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

// const createMapStateToProps = () => (state, ownProps) => {
//   const commentsSelector = createCommentsSelector();
  
//   return {
//     comments: commentsSelector( state, ownProps )
//   };
// }

export default CommentsListWithAccordion;

