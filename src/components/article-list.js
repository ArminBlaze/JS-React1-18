import React, { Component } from 'react'
import Article from './article/article'
import accordion from '../decorators/accordion'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ArticleList extends Component {

  static propTypes = {
    openItemId: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
  }

  render() {
    return <ul>{this.body}</ul>
  }

  get body() {
    const { toggleOpenItem, openItemId } = this.props
    return this.filteredArticles.map((article) => (
      
      
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


  get filteredArticles() {
    const {articles, filters} = this.props;
    const {selected, dateRange} = filters;

    console.log(filters);
    

    if(!selected && !dateRange) {
      return articles;
    }

    let newArticles;

    if(selected) {
      newArticles = articles.filter((article) => {
        return article.id === selected
      })
    } else {
      newArticles = articles.slice();
    }
    
    if(dateRange) {
      newArticles = newArticles.filter((article) => {
        //тут нужно вычленить дату у каждой статьи
        let date = parseDate(article.date); //Объект даты
        let date2 = Date.parse(article.date);
        console.log(+date);
        console.log(date2);
        

        //а потом по ней сравнить попадает ли она в диапазон
        if(dateRange.from && +date < +dateRange.from) {
          return false;
        }

        if(dateRange.to && +date > +dateRange.to) {
          return false;
        }

        return true;
      })
    }
  

    return newArticles;
  }

}


function parseDate(date) {
  const result = date.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)

  return new Date(+result[1], +result[2]-1, +result[3]);
}


const ArticleListWithAccordion = accordion(ArticleList)

export default connect((state) => ({
  articles: state.articles,
  filters: state.filters
}))(ArticleListWithAccordion)
