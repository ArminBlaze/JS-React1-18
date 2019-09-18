import React, { PureComponent } from 'react'
import CommentsList from 'components/CommentsList'

class Article extends PureComponent {
  render() {
    console.log('---', 'rendering')
    const { article, isOpen } = this.props;
    const articleBody = (
      <section>
        {article.text}
        <CommentsList comments={article.comments} />
      </section>
    )

    return (
      <div>
        <div>
          <h3 ref={this.setTitleRef}>{article.title}</h3>
          <button onClick={this.handleBtnClick}>
            {isOpen ? 'close' : 'open'}
          </button>
        </div>
        {isOpen && articleBody}
      </div>
    )
  }

  setTitleRef = (titleRef) => console.log(titleRef)

  handleBtnClick = () => this.props.toggleOpen(this.props.article.id)
}

export default Article
