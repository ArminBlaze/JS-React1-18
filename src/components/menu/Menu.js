import React, { Component } from 'react';
import {MenuItem} from './MenuItem';
import withLangConsumer from 'hoc/withLangConsumer'
 
class Menu extends Component {
  render() { 
    const {getText} = this.props;

    return (
      <div>
        <h3>{getText('menu')}</h3>
        {this.props.children}
      </div>
    );
  }
}

const MenuWithLangConsumer = withLangConsumer(Menu);
 
export  {MenuWithLangConsumer as Menu};
export  {MenuItem};