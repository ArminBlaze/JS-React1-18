import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CommentForm.css';
import { connect } from 'react-redux'
import { addComment } from 'store/actions/index.js'


const limits = {
  name: {
    min: 3,
    max: 15
  },
  text: {
    min: 10,
    max: 500
  }
}


class CommentForm extends Component {

  static propTypes = {
    articleId: PropTypes.string.isRequired,
    // toggleOpenItem: PropTypes.func.isRequired,
    
  }

  state = {
    name: '',
    text: '',
    fieldErrors: {
      nameError: false,
      textError: false,
    },
  }

  getClassName = (type) => {
    console.log(this.state.fieldErrors[type + 'Error']);
    
    return (this.state.fieldErrors[type + 'Error'] ? 'form-input__error' : '')
  }

  isInvalidField = (type, value) => {
    if (value.length < limits[type].min) {
      return true
    }
    else {
      return false
    }
  }

  isValidForm = () => Object.values(this.state.fieldErrors).every(item => !item)

  onChange = (type) => (e) => {
    const value = e.target.value;

    if (value.length > limits[type].max) return;
    
    this.setState((state) => {
      let newState = {
        ...state,
        [type]: value
      };

      newState.fieldErrors = {
        ...newState.fieldErrors,
        [type + 'Error']: this.isInvalidField(type, value),
      };

      return newState;
    })
  }
  
  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.addComment({
      articleId: this.props.articleId,
      user: this.state.name,
      text: this.state.text,
    });
		
		//Очищаем форму не через reset(), т.к. reset не сбросит state
		//При изменении state - запустится render и у input будет очищено значение
		//Интересный факт. Событие onchange input'а не вызывается ни при form.reset(), ни при изменении input.value
		this.setState({
      text: ''
		})
  }

  render() {
    console.log('CommentForm RENDER');

    return (
      <div className="CommentForm__wrapper">
        <form className="CommentForm" onSubmit={ this.onFormSubmit }>
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input type="name" id="name" aria-describedby="nameHelp"
            placeholder="Введите ваше имя" 
            required
            value={ this.state.name }
            className={ this.getClassName('name') } 
            onChange={ this.onChange('name') }
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Комментарий</label>
            <textarea name="text" id="text" cols="30" rows="10"
              placeholder="Ваш комментарий к статье" 
              required
              value={ this.state.text } 
              className={ this.getClassName('text') }
              onChange={ this.onChange('text') }
              ></textarea>
          </div>
          <button type="submit"
            className="LoginPage__btn btn btn-primary"
            disabled={!this.isValidForm()}
            >
              Отправить комментарий
          </button>
        </form>
      </div>
    )
  }
}



export default connect(null, {addComment})(CommentForm)