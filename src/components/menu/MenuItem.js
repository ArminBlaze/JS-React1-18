import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
 
class MenuItem extends Component {
  render() { 
    const {path, children} = this.props;

    return (
      <NavLink to={path} activeStyle={{background: 'black', color: 'white'}} >
       {children}
      </NavLink>
    );
  }
}
 
export {MenuItem};