import Filters from 'components/filters';
import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom'
import ArticlesPage from './components/routes/ArticlesPage';
import CommentsRoutes from './components/routes/CommentsRoutes';
// import ArticlesChart from './components/articles-chart'
import UserForm from './components/user-form';
import Counter from 'components/counter';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        <div>
          {/* <NavLink to="/counter" activeStyle={{background: 'black', color: 'white'}} >
            Counter
          </NavLink> */}
          <NavLink to="/filters" activeStyle={{background: 'black', color: 'white'}} >
            Filters
          </NavLink>
          <NavLink to="/articles" activeStyle={{background: 'black', color: 'white'}} >
            Articles
          </NavLink>
          <NavLink to="/comments/1" activeStyle={{background: 'black', color: 'white'}} >
            Comments
          </NavLink>
        </div>
        <UserForm />
        <Counter />
        {/* <ArticlesChart articles={articles} /> */}
        <Switch>
          <Redirect from="/" to="/articles" exact />
          <Route path="/counter" component={Counter} exact />
          <Route path="/filters" component={Filters} />
          <Route
            path="/articles/new"
            render={() => <h1>New Article Page</h1>}
          />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/comments" component={CommentsRoutes} />
          <Route path="*" render={() => <h1>Not Found Page</h1>} />
        </Switch>
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
