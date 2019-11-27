import React, { PureComponent } from 'react'
import CommentsList from 'components/CommentsList/CommentsList'
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { deleteArticle, loadArticleById } from 'store/actions/index.js'

import './article.css';

class Article extends PureComponent {
 
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    
    article: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      comments: PropTypes.array,
    }),
  }

  componentDidCatch(err) {
    console.log('Article');
    console.log(err);
  }

  componentDidUpdate(oldProps) {
    const { isOpen, article, loadArticleById } = this.props;
    const {loaded, loading} = article;
		
		if( !oldProps.isOpen && isOpen && !loaded && !loading ) {
      loadArticleById(article.id);
    } 
	}


  render() {
    // console.log('---', 'rendering')
    const { article, isOpen } = this.props;
    
    const articleBody = (
      <section className='test__article__body'>
        {article.text}
        <CommentsList article={article}/>
      </section>
    )

    return (
      <div>
        <div>
          <h3 ref={this.setTitleRef}>{article.title}</h3>
          <button 
            className='test__article__btn'
            onClick={this.handleBtnClick}
            >
            {isOpen ? 'close' : 'open'}
          </button>
          <button onClick={this.handleDelete}>
            Delete Article
          </button>
        </div>
        <CSSTransition 
          transitionName='article'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {isOpen && articleBody}
        </CSSTransition>
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

const mapDispatchToProps = {
  deleteArticle,
  loadArticleById
}

export default connect(null, mapDispatchToProps)(Article)
