import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSTransition from 'react-addons-css-transition-group';
import accordion from '../../decorators/accordion';
import './CommentsList.css';
import CommentForm from 'components/CommentForm/CommentForm'
import { connect } from 'react-redux'
import { loadCommentsById } from 'store/actions/index.js'
import { createCommentByIdSelector } from 'selectors';
import Loader from 'loaders/loader.js'


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

  componentDidUpdate(oldProps) {
    const isOpen = this.props.openItemId;
    
    const { article, comments, loadCommentsById } = this.props;
    const articleId = article.id;
    console.log(article);
    console.log(comments);
    
    //это нужно брать из комментов
    //при открытии смотрим загружены ли комменты в state.comments.articleId
    

    //брать из state.comments.articleId
    //там ничего нет, поэтому нужно загружать
    // const {loaded, loading} = comments;
		
		// if( !oldProps.isOpen && isOpen && !loaded && !loading ) {
    //   loadArticleById(article.id);
    // } 

    if(isOpen && !comments && articleId) {
      loadCommentsById(articleId);
    }
	}

  render() {
    const isOpen = this.props.openItemId;

    const comments = this.props.comments;
    
    const {article} = this.props;
    
    const ids = article.comments;

    const commentForm = <CommentForm articleId={article.id}/>;

    if(!ids.length) return (
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
            {isOpen && comments && this.body}
          </CSSTransition>
        </ul>
      </div>
    )
  }

  get body() {

    const {loading, loaded, data} = this.props.comments; 

    if(loading) return <Loader />
    
    const { article } = this.props;
    console.log(article);
    
    const ids = article.comments;

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

// const mapStateToProps = (state) => ({
//   //передаём articleId в селектор и смотрим есть ли там комменты
//   comments: filterArticles(state),
//   loading: articlesLoadingSelector(state),
// });

const createMapStateToProps = () => (state, ownProps) => {
  const commentsSelector = createCommentByIdSelector();

  return {
    comments: commentsSelector( state, ownProps )
  };
}


const mapDispatchToProps = {
  loadCommentsById,
}

// export default CommentsListWithAccordion;
export default connect(createMapStateToProps, mapDispatchToProps)(CommentsListWithAccordion);

