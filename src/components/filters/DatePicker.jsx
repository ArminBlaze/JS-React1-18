import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';
import { connect } from 'react-redux'
import { selectDate } from 'store/actions/index.js'

class DatePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {
      this.props.selectDate(this.state);
    }
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    console.dir(range);
    
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <p>
          {!from && !to && 'Пожалуйста выберите первый день.'}
          {from && !to && 'Пожалуйста выберите последний день.'}
          {from &&
            to &&
            `Выбрано с ${from.toLocaleDateString()} по
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Сброс
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          month={new Date(2016, 5)}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {

//   return {
//     articles: state.articles.data,
//   }
// };

export default connect(null, {selectDate})(DatePicker);