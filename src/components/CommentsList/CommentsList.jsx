import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import iPropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import CSSTransition from 'react-addons-css-transition-group';
import accordion from '../../decorators/accordion';
import './CommentsList.css';
import CommentForm from 'components/CommentForm/CommentForm'
import { connect } from 'react-redux'
import { loadCommentsById } from 'store/actions/index.js'
import { createCommentsLoadingSelector, createCommentsLoadedSelector } from 'selectors';
import Loader from 'loaders/loader.js'


export class CommentsList extends Component {

  static propTypes = {
    article: iPropTypes.recordOf({
      comments: PropTypes.arrayOf(PropTypes.string.isRequired),
      date: PropTypes.string.isRequired,
      error: PropTypes.object,
      id: PropTypes.string.isRequired,
      loaded: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      text: PropTypes.string,
      title: PropTypes.string.isRequired,
    }),

    comments: iPropTypes.recordOf({
      articleId: PropTypes.string.isRequired,
      error: PropTypes.object,
      loaded: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,

      data: iPropTypes.map,
    }),
      
    openItemId: PropTypes.string.isRequired,
    loadCommentsById: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
  }

  componentDidCatch(err) {
    console.log('CommentsList');
    console.log(err);
  }

  componentDidUpdate(oldProps) {
    const isOpen = this.props.openItemId;

    const { article, loadCommentsById, loading, loaded } = this.props;
    const articleId = article.id;
    
   
    if( isOpen && !loaded && !loading ) {
      loadCommentsById(articleId);
    }
	}

  render() {
    const isOpen = this.props.openItemId;
    const buttonText = isOpen ? 'Закрыть комментарии' : `Открыть комментарии`;

    return (
      <div>
        <button 
          onClick={this.handleBtnClick}
          className='test__commentsList__btn'
        >
          {buttonText}
        </button>
        <CSSTransition 
          transitionName='comments'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.body}
        </CSSTransition>
      </div>
    )
  }

  get body() {
    const isOpen = this.props.openItemId;
    const {article, loading, loaded} = this.props; 
    const ids = article.comments;

    const commentForm = <CommentForm articleId={article.id}/>;

    if(!isOpen) return null;
    if(loading || !loaded) return <Loader />

    return (
      <div>
        {
          this.getComments(ids, article)
        }
        {commentForm}
      </div>
    )
  }

  getComments(ids, article) {
    if(!ids.length) return 'Комментариев пока нет. Ваш комментарий будет первым.'

    return (
      <ul>
        {
          ids.map((id) => (
            <li key={id} className='test__commentsList__item'>
              <Comment id={id} article={article}
              />
            </li>
          ))
        }
      </ul>
    )
  }

  handleBtnClick = () => this.props.toggleOpenItem("opened")
}


const CommentsListWithAccordion = accordion(CommentsList);

const createMapStateToProps = () => (state, ownProps) => {
  const commentsLoadingSelector = createCommentsLoadingSelector();
  const commentsLoadedSelector = createCommentsLoadedSelector();

  return {
    loading: commentsLoadingSelector( state, ownProps ),
    loaded: commentsLoadedSelector( state, ownProps ),
  };
}

const mapDispatchToProps = {
  loadCommentsById,
}

export default connect(createMapStateToProps, mapDispatchToProps)(CommentsListWithAccordion);

