import Filters from 'components/filters';
import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom'
import ArticlesPage from './components/routes/ArticlesPage';
// import ArticlesChart from './components/articles-chart'
import UserForm from './components/user-form';
import Counter from 'components/counter';
import { Route, NavLink } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        <div>
          <NavLink to="/counter" activeStyle={{background: 'black', color: 'white'}} >
            Counter
          </NavLink>
          <NavLink to="/filters" activeStyle={{background: 'black', color: 'white'}} >
            Filters
          </NavLink>
          <NavLink to="/articles" activeStyle={{background: 'black', color: 'white'}} >
            Articles
          </NavLink>
        </div>
        <UserForm />
        <Route path="/counter" component={Counter} />
        <Route path="/filters" component={Filters} />
        <Route path="/articles" component={ArticlesPage} />
        {/* <ArticlesChart articles={articles} /> */}
      </div>
    )
  }

//   setArticleListRef = (ref) => {
//     // console.log('---', ref, findDOMNode(ref))
//     /*
//         setTimeout(() => {
//             ref.toggleOpenItem(articles[0].id)
//             ref.forceUpdate()
//         }, 1000)
// */
//   }
}

export default App
