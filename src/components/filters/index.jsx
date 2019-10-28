import React from 'react';
import Select from 'react-select'
import DatePicker from './DatePicker';
import { connect } from 'react-redux'
import { selectArticle } from 'store/actions/index.js'

class Filters extends React.Component {

  state = {
    openItem: null
  }

  get options() {
    let options = [{label: "All", value: ""}];

    this.props.articles.forEach((article) => {
      options.push({label: article.title, value: article.id})
    });

    return options;
  }

  handleSelect = (openItem) => {
    console.log(openItem);
    
    const { selectArticle } = this.props;
    selectArticle(openItem.value);
  }

  
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


const mapStateToProps = (state) => {

  return {
    articles: state.articles.data,
  }
};


//записываем в стор выбранный пункт в селекте
//загружаем из стора выбранный пункт и передаём в селект
//нужен actionCreator для записи в стор. Его передаём в селект
export default connect(mapStateToProps, {selectArticle})(Filters);