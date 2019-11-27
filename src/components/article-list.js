import React, { Component } from 'react'
import Article from './article/article'
import accordion from '../decorators/accordion'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterArticles, articlesLoadingSelector } from 'selectors';
import { loadAllArticles } from 'store/actions/index.js';
import Loader from 'loaders/loader.js'

export class ArticleList extends Component {

  static propTypes = {
    openItemId: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
  }

  render() {
    if(this.props.loading) return <Loader />

    return <ul>{this.body}</ul>
  }

  get body() {
    const { toggleOpenItem, openItemId } = this.props
    return this.props.articles.map((article) => (
      <li key={article.id} className='test__articleList__item'>
        <Article
          article={article}
          isOpen={openItemId === article.id}
          toggleOpen={toggleOpenItem}
        />
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData && fetchData()
  }

}


const ArticleListWithAccordion = accordion(ArticleList)

const mapStateToProps = (state) => ({
  articles: filterArticles(state),
  loading: articlesLoadingSelector(state),
});

const mapDispatchToProps = {
  fetchData: loadAllArticles,
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleListWithAccordion)
