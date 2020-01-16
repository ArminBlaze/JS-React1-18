import React, { Component } from 'react'
import Comment from 'components/Comment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFilterCommentsIdsByPage, createCommentsPageLoadingSelector, createCommentsPageLoadedSelector, totalComments, commentsPerPage } from 'selectors';
import { loadCommentsByPage } from 'store/actions/index.js';
import Loader from 'loaders/loader.js'
import { Route, NavLink } from 'react-router-dom';
import './CommentsPage.css';

export class CommentsPage extends Component {

  static propTypes = {
    ids: PropTypes.array,
    page: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    total: PropTypes.number,
  }

  render() {
    if(!this.props.total) return <Loader />

    return this.body
  }

  get body() {
    return (
      <div>
        {this.getComments(this.props.ids)}
        {this.getPaginator(this.props.total, this.props.commentsPerPage)}
      </div>
    )
  }

  getPaginator(total, commentsPerPage) {
    const pages = total/commentsPerPage;

    let links = [];

    for (let index = 0; index <= pages; index++) {
      links.push(
        <NavLink
          key={index+1} 
          className='paginator__link'
          to={`/comments/${index+1}`} 
          activeStyle={{background: 'black', color: 'white'}} >
          {index+1}
        </NavLink>
      )
    }

    return (<div className='paginator'>
      {links}
    </div>)
  }

  getComments(ids) {
    if(this.props.loading || !this.props.loaded) return <Loader />
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
    
    const { page, fetchData, ids } = this.props;
    let dataPage = page-1;
    if(dataPage < 0) dataPage = 0;
    !ids && fetchData && fetchData(dataPage)
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
    total: totalComments(state),
    commentsPerPage: commentsPerPage(state),
  };
}

const mapDispatchToProps = {
  fetchData: loadCommentsByPage,
}


export default connect(createMapStateToProps, mapDispatchToProps)(CommentsPage)
