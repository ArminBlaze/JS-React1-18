import React, { PureComponent } from 'react'
import CommentsList from 'components/CommentsList/CommentsList'
import CSSTransition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

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


  render() {
    // console.log('---', 'rendering')
    const { article, isOpen } = this.props;
    
    const articleBody = (
      <section className='test__article__body'>
        {article.text}
        <CommentsList comments={article.comments} />
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
}

export default Article
