import React from 'react';
import Select from 'react-select'
import DatePicker from './DatePicker';
import { connect } from 'react-redux'
import { selectArticle } from 'store/actions/index.js'
import PropTypes from 'prop-types';
import './Select.css';
import { articlesSelector, selectedSelector } from 'selectors';

class Filters extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
    selected: PropTypes.object,
    selectArticle: PropTypes.func.isRequired,
  }

  get options() {
    let options = [{label: "All", value: ""}];

    this.props.articles.forEach((article) => {
      options.push({label: article.title, value: article.id})
    });

    return options;
  }

  handleSelect = (openItem) => {
    const { selectArticle } = this.props;
    selectArticle(openItem);
  }

  handleReset = () => {
    this.handleSelect(null);
  }

  
  render() {

    return (
      <div>
        <div>
          <Select
            className='Filters__select'
            options={this.options}
            value={this.props.selected}
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
    articles: articlesSelector(state),
    selected: selectedSelector(state),
  }
};


//записываем в стор выбранный пункт в селекте
//загружаем из стора выбранный пункт и передаём в селект
//нужен actionCreator для записи в стор. Его передаём в селект
export default connect(mapStateToProps, {selectArticle})(Filters);