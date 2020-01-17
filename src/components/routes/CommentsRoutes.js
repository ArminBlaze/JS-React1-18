import React, { Component } from 'react';
import CommentsPage from 'components/CommentsPage';
import { Route, Redirect } from 'react-router-dom';
// import Article from 'components/article/article'

class CommentsRoutes extends Component {
  static propTypes = {
    
  }
  
  render() {
    console.log('CommentsRoutes Component match', this.props.match );
    
    return this.props.match.isExact 
      ? <Redirect to="/comments/1" />
      : <Route path="/comments/:page" render={this.getPage} />
      
  }

  getPage = ({ match }) => {
    console.log('CommentsRoutes Match', match);

    const page = +match.params.page;

    return isNaN(page)
    ? <Redirect to="/comments/1" />
    : <CommentsPage page={page} key={page}/>
	}
}

export default CommentsRoutes;