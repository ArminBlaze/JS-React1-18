import React, { Component } from 'react'
// import { findDOMNode } from 'react-dom'
import ArticleList from './components/article-list'
import ArticlesChart from './components/articles-chart'
import articles from './fixtures'
import UserForm from './components/user-form'
import Filters from 'components/Filters';


class App extends Component {

  render() {
    return (
      <div>
        <UserForm />
        <Filters articles={articles} />
        <ArticleList articles={articles} ref={this.setArticleListRef} />
        <ArticlesChart articles={articles} />
      </div>
    )
  }

  setArticleListRef = (ref) => {
    // console.log('---', ref, findDOMNode(ref))
    /*
        setTimeout(() => {
            ref.toggleOpenItem(articles[0].id)
            ref.forceUpdate()
        }, 1000)
*/
  }
}

export default App
