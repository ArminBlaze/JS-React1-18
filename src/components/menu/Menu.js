import React, { Component } from 'react';
import {MenuItem} from './MenuItem';
 
class Menu extends Component {
  render() { 
    return (
      <div>
        <h3>Menu</h3>
        {this.props.children}
      </div>
    );
  }
}
 
export  {Menu};
export  {MenuItem};