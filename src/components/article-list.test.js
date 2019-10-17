import React from 'react';
import ArticleListWithAccordion, { ArticleList } from './article-list';
import articles from '../fixtures';
import Enzyme, {render, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })



describe('ArticleList', () => {

  it('should render Article list', () => {
    const container = render(<ArticleList articles={articles} />);

    expect( container.find('.test__articleList__item').length ).toEqual(articles.length)
  });

  it('should open an article on click', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />);

    container.find('.test__article__btn').at(0).simulate('click');

    expect( container.find('.test__article__body').length).toEqual(1);
  });


  jest.useFakeTimers();

  it('should close an article on click', () => {

    const container = mount(<ArticleListWithAccordion articles={articles} />);

    expect( container.find('.test__article__body').length).toEqual(0);

    container.find('.test__article__btn').at(0).simulate('click');
    jest.runTimersToTime(1000);
    container.simulate('transitionEnd');

    expect( container.find('.test__article__body').length).toEqual(1);

    container.find('.test__article__btn').at(0).simulate('click');
    jest.runTimersToTime(2000);
    container.simulate('transitionEnd');
    
    expect( container.find('.test__article__body').length).toEqual(0);
  });

  
  it('should trigger data fetching on mount', (done) => {
    mount(<ArticleListWithAccordion articles={[]} fetchData={done}/>)
  });
 
});