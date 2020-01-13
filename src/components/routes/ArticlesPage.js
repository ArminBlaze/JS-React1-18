import React, { Component } from 'react';
import ArticleList from 'components/article-list';
import { Route } from 'react-router-dom';
import Article from 'components/article/article'

class ArticlesPage extends Component {
  static propTypes = {
    
  }
  
  render() {
    return (
      <div>
        <ArticleList />
        <Route path="/articles/:id" children={this.getArticle} />
      </div>
      )
  }

  getArticle = ({ match }) => {
    console.log('Article Match', match);
    if(!match) return <h1>Пожалуйста, выберите статью</h1>
    return <Article id={match.params.id} key={match.params.id}/>
	}
}

export default ArticlesPage;