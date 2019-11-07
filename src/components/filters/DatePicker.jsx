import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';
import { connect } from 'react-redux'
import { selectDate } from 'store/actions/index.js'
import { dateRangeSelector } from 'selectors';

class DatePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  getDefaultDate() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.props.range);
    this.props.selectDate(range);
  }

  handleResetClick() {
    this.props.selectDate(this.getDefaultDate());
  }

  render() {
    const { from, to } = this.props.range;
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

const mapStateToProps = (state) => {

  return {
    range: dateRangeSelector(state),
  }
};

export default connect(mapStateToProps, {selectDate})(DatePicker);