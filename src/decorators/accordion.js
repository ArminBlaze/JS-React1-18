//decorator === HOC === Higher Order Component
import React from 'react'

export default (OriginalComponent) =>
  class DecoratedComponent extends React.Component {
    state = {
      openItemId: ''
    }

    
    componentDidCatch(err) {
      console.log('Accordeon');
      console.log(err);
    }

    toggleOpenItem = (openItemId) => {
      // if(openItemId === this.state.openItemId) {
      //   return this.setState({
      //     openItemId: null
      //   })
      // }

      // this.setState({ openItemId })
      
      //более короткий вариант
      const id = (openItemId === this.state.openItemId) ? '' : openItemId;
      // console.log(this.state);
      

      this.setState({
        openItemId:  id
      })
    } 

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpenItem={this.toggleOpenItem}
        />
      )
    }
  }
