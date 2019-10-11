import React from 'react';
import Select from 'react-select'
import DatePicker from 'components/DatePicker';

class Filters extends React.Component {

  state = {
    openItem: null
  }

  get options() {
    return this.props.articles.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  handleSelect = (openItem) => this.setState({ openItem })

  
  render() {
    return (
      <div>
        <Select
          options={this.options}
          value={this.state.openItem}
          onChange={this.handleSelect}
        />
        <DatePicker />
      </div>
    )
  }
}



export default Filters;