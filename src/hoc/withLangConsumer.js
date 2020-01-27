import React from 'react';
import {Consumer as LangConsumer} from 'context/lang'
 
const withLangConsumer = (Component) => {
  return (props) => {
    return (
      <LangConsumer>{(getText) => (
        <Component {...props} getText={getText}/>
        )
      }</LangConsumer>
    )
  }
}
 
export default withLangConsumer;