import React, { Component } from 'react'
import Select from 'react-select'

class LangMenu extends Component {
  options = [
    {label: "Русский", value: "ru"},
    {label: "English", value: "en"},
  ];

  render() {
    return (
      <Select
        className='Lang__select'
        options={this.options}
        value={this.selected}
        onChange={this.handleSelect}
      />
    )
  }

  componentDidMount() {
    if(!this.props.langOption) {
      this.handleSelect(this.options[0])
    } 
  }

  get selected() {
    return this.props.langOption
  }

  handleSelect = (openItem) => {
    console.log(openItem);
    
    const { onChange } = this.props;
    onChange(openItem);
  }
}

export default LangMenu
