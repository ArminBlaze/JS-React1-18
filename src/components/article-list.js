import React, { Component } from 'react'
import Article from './article/article'
import accordion from '../decorators/accordion'

export class ArticleList extends Component {

  render() {
    return <ul>{this.body}</ul>
  }

  get body() {
    const { toggleOpenItem, openItemId, articles } = this.props
    return articles.map((article) => (
      
      
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

export default ArticleListWithAccordion
