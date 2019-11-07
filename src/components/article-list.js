import React, { Component } from 'react'
import Article from './article/article'
import accordion from '../decorators/accordion'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterArticles } from 'selectors';

export class ArticleList extends Component {

  static propTypes = {
    openItemId: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
  }

  render() {
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


// function parseDate(date) {
//   const result = date.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)

//   return new Date(+result[1], +result[2]-1, +result[3]);
// }


const ArticleListWithAccordion = accordion(ArticleList)

export default connect((state) => ({
  articles: filterArticles(state),
}))(ArticleListWithAccordion)
