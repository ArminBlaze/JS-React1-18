import React, { PureComponent } from 'react'
import CommentsList from 'components/CommentsList/CommentsList'
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { deleteArticle, loadArticleById } from 'store/actions/index.js'
import { Map } from 'immutable';
import { createArticleSelector, articlesLoadedSelector } from 'selectors';
import Loader from 'loaders/loader.js'

import './article.css';

class Article extends PureComponent {
 
  static propTypes = {
    id: PropTypes.string.isRequired,

    article: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      comments: PropTypes.array,
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool,
      error: PropTypes.bool,
    }),
  }

  componentDidCatch(err) {
    console.log('Article');
    console.log(err);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    this.getData();
	}

  getData() {
    const { article, id, loadArticleById } = this.props;

    if( !article || (!article.text && !article.loading) ) {
      console.log('Запускаю loadArticleById в componentDidUpdate');
      loadArticleById(id);
    } 
  }

  render() {
    // console.log('---', 'rendering')
    const { article } = this.props;

    if(!article) return null;
    if(article.loading) return <Loader />
    
    const articleBody = (
      <section className='test__article__body'>
        {article.text}
        <CommentsList article={article} test={new Map(
          {
            0: {peka: "lol", text: 'sam takoi'},
            1: {rr: "3434", text: 'sam tako!i'},
          }
          )}
        />
      </section>
    )

    return (
      <div>
        <div>
          <h3 ref={this.setTitleRef}>{article.title}</h3>
          <button onClick={this.handleDelete}>
            Delete Article
          </button>
        </div>
        {articleBody}
      </div>
    )
  }

  // setTitleRef = (titleRef) => console.log(titleRef)

  handleBtnClick = () => this.props.toggleOpen(this.props.article.id)

  handleDelete = () => {
    const { article, deleteArticle } = this.props;
    deleteArticle(article.id);
  }
}

const createMapStateToProps = () => (state, ownProps) => {
  const articleSelector = createArticleSelector();

  return {
    article: articleSelector( state, ownProps ),
    AllArticlesLoaded: articlesLoadedSelector(state),
  };
}

const mapDispatchToProps = {
  deleteArticle,
  loadArticleById
}

export default connect(
  createMapStateToProps,
  mapDispatchToProps)(Article)
