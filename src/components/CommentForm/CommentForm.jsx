import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CommentForm.css';
import { connect } from 'react-redux'
import { addComment } from 'store/actions/index.js'


//добавить форму
//сделать сбор данных и посылку их в стор. Посмотреть как в article кнопка удалить
class CommentForm extends Component {

  static propTypes = {
    articleId: PropTypes.string.isRequired,
    // toggleOpenItem: PropTypes.func.isRequired,
    
  }

  state = {
    name: '',
    text: ''
  }


  onNameChange = (e) => {
		this.setState({
      name: e.target.value
		})
  }
  
  onTextChange = (e) => {
		this.setState({
      text: e.target.value
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
    return (
      <div className="CommentForm__wrapper">
        <form className="CommentForm" onSubmit={ this.onFormSubmit }>
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input type="name" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Введите ваше имя" 
            required
            value={ this.state.name }
            onChange={ this.onNameChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Комментарий</label>
            <textarea name="text" id="text" cols="30" rows="10"
              placeholder="Ваш комментарий к статье" 
              required
              value={ this.state.text } 
              onChange={ this.onTextChange }
              ></textarea>
          </div>
          <button type="submit"
            className="LoginPage__btn btn btn-primary">
              Отправить комментарий
          </button>
        </form>
      </div>
    )
  }
}



export default connect(null, {addComment})(CommentForm)