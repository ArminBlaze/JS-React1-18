import React, { Component } from 'react'
import Article from './article/article'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterArticles, articlesLoadingSelector } from 'selectors';
import { loadAllArticles } from 'store/actions/index.js';
import Loader from 'loaders/loader.js'
import { Route, NavLink } from 'react-router-dom';

export class ArticleList extends Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  }

  render() {
    if(this.props.loading) return <Loader />

    return <ul>{this.body}</ul>
  }

  get body() {
    return this.props.articles.map((article) => (
      <li key={article.id} className='test__articleList__item'>
        <NavLink 
          to={`/articles/${article.id}`} 
					activeStyle={{background: 'black', color: 'white'}} >
						 {article.title}
	    	</NavLink>
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData && fetchData()
  }

}


// const ArticleListWithAccordion = accordion(ArticleList)

const mapStateToProps = (state) => ({
  articles: filterArticles(state),
  loading: articlesLoadingSelector(state),
});

const mapDispatchToProps = {
  fetchData: loadAllArticles,
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
