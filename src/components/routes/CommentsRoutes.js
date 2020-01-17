import React, { Component } from 'react';
import CommentsPage from 'components/CommentsPage';
import { Route } from 'react-router-dom';
// import Article from 'components/article/article'

class CommentsRoutes extends Component {
  static propTypes = {
    
  }
  
  render() {
    return (
      <div>
        <Route path="/comments/:page" render={this.getPage} />
      </div>
      )
  }

  getPage = ({ match }) => {
    console.log('CommentsRoutes Match', match);
    return <CommentsPage page={+match.params.page} key={+match.params.page}/>
	}
}

export default CommentsRoutes;