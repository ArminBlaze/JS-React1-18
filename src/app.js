import Filters from 'components/filters';
import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom'
import ArticlesPage from './components/routes/ArticlesPage';
import CommentsRoutes from './components/routes/CommentsRoutes';
// import ArticlesChart from './components/articles-chart'
import UserForm from './components/user-form';
import LangMenu from './components/LangMenu';
import Counter from 'components/counter';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import {Menu, MenuItem} from 'components/menu/index'
import {Provider as UserProvider} from 'context/user';
import {Provider as LangProvider} from 'context/lang';
import {lex} from 'lang/index.js';


class App extends Component {
  state = {
    username: '',
    lang: '',
  }

  handleUserChange = (username) => {
    this.setState({username})
  }

  handleLangChange = (langOption) => {
    this.setState({
      langOption,
      lang: langOption.value
    })
  }

  getLangText = (selector) => {
    return lex[selector][this.state.lang] || selector;
  }

  render() {
    const getText = this.getLangText;

    return (
      <div>
        <LangProvider value={this.getLangText} >
          <UserForm username={this.state.username} onChange={this.handleUserChange} />
          <LangMenu langOption={this.state.langOption} onChange={this.handleLangChange} />

          <UserProvider value={this.state.username} >
            <Menu>
              <MenuItem path="/filters">{getText('filters')}</MenuItem>
              <MenuItem path="/articles">{getText('articles')}</MenuItem>
              <MenuItem path="/comments/1">{getText('comments')}</MenuItem>
            </Menu>

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

              <Route path="/error" render={() => <h1>Error Page</h1>} />
              <Route path="*" render={() => <h1>Not Found Page</h1>} />
            </Switch>
          </UserProvider>
        </LangProvider>
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
