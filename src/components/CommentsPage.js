import React, { Component } from 'react'
import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFilterCommentsIdsByPage, createCommentsPageLoadingSelector, createCommentsPageLoadedSelector } from 'selectors';
import { loadCommentsByPage } from 'store/actions/index.js';
import Loader from 'loaders/loader.js'
import { Route, NavLink } from 'react-router-dom';

export class CommentsPage extends Component {

  static propTypes = {
    ids: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  }

  render() {
    if(this.props.loading || !this.props.loaded) return <Loader />

    return <ul>{this.body}</ul>
  }

  get body() {
    
    
    return this.getComments(this.props.ids);
  }

  getComments(ids) {
    if(!ids.length) return 'На этой странице комментариев нет'

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

  componentDidMount() {
    const { page, fetchData } = this.props;
    fetchData && page && fetchData(page)
  }

}


// const ArticleListWithAccordion = accordion(ArticleList)

// const mapStateToProps = (state) => ({
//   comments: filterCommentsByPage(state),
//   loading: commentsPageLoadingSelector(state),
// });

const createMapStateToProps = () => (state, props) => {
  const idsByPageSelector = createFilterCommentsIdsByPage()
  const commentsLoadingSelector = createCommentsPageLoadingSelector();
  const commentsLoadedSelector = createCommentsPageLoadedSelector();

  return {
    ids: idsByPageSelector(state, props),
    loading: commentsLoadingSelector( state, props),
    loaded: commentsLoadedSelector( state, props),
  };
}

const mapDispatchToProps = {
  fetchData: loadCommentsByPage,
}


export default connect(createMapStateToProps, mapDispatchToProps)(CommentsPage)
