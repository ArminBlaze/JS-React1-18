import React from 'react';
import CommentsListWithAccordion, { CommentsList } from './CommentsList.jsx';
import articles from '../../fixtures';
import Enzyme, {render, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('CommentsList', () => {
  it('should render button in CommentsList', () => {
    const container = render(<CommentsList comments={articles[0].comments} />);

    expect( container.find('.test__commentsList__btn').length ).toEqual(1)
  });

  it('should render proper button text when comments length >0', () => {
    const container = render(<CommentsList comments={articles[0].comments} />);

    expect( container.find('.test__commentsList__btn').text() ).toEqual('Открыть комментарии')
  });

  it('should render proper button text when comments length 0', () => {
    const container = mount(<CommentsList comments={undefined} />);

    expect( container.find('.test__commentsList__btn').text() ).toEqual('Комментариев нет')
  });

  it('should open comments on click', () => {
    const container = mount(<CommentsListWithAccordion comments={articles[0].comments} />);

    container.find('.test__commentsList__btn').at(0).simulate('click');

    expect( container.find('.test__commentsList__item').length ).toEqual(articles[0].comments.length)
  });

  it('should render proper button text when comments is open', () => {
    const container = mount(<CommentsListWithAccordion comments={articles[0].comments} />);

    container.find('.test__commentsList__btn').at(0).simulate('click');

    expect( container.find('.test__commentsList__btn').text() ).toEqual('Закрыть комментарии')
  });

  
  // it('should trigger data fetching on mount', (done) => {
  //   mount(<ArticleListWithAccordion articles={[]} fetchData={done}/>)
  // });
 
});