import React from 'react';
import Select from 'react-select'
import DatePicker from './DatePicker';
import { connect } from 'react-redux'
import { selectArticle } from 'store/actions/index.js'
import PropTypes from 'prop-types';
import './Select.css';

class Filters extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    selectArticle: PropTypes.func.isRequired,
  }

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
    this.setState({ openItem })
  }

  handleReset = () => {
    this.handleSelect({value: ""});
  }

  
  render() {

    return (
      <div>
        <div>
          <Select
            className='Filters__select'
            options={this.options}
            value={this.state.openItem}
            onChange={this.handleSelect}
          />
          <button className="link" onClick={this.handleReset}>
              Сброс
          </button>
        </div>
        <DatePicker />
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
    articles: state.articles,
    filters: state.filters,
  }
};


//записываем в стор выбранный пункт в селекте
//загружаем из стора выбранный пункт и передаём в селект
//нужен actionCreator для записи в стор. Его передаём в селект
export default connect(mapStateToProps, {selectArticle})(Filters);