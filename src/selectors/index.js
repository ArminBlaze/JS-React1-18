import {createSelector} from 'reselect';


export const filtersSelector = state => state.filters;
export const dateRangeSelector = state => state.filters.dateRange;
export const selectedSelector = state => state.filters.selected;
export const articlesMapSelector = state => state.articles.data;
export const counterSelector = state => state.counter;
export const commentsMapSelector = state => state.comments;
export const idSelector = (_, props) => props.id;
export const articleIdSelector = (_, props) => props.article.id;
export const articlesLoadingSelector = state => state.articles.loading;


export const arrayOfArticles = createSelector(
  articlesMapSelector,
  (articlesMap) => {
    // return articlesArr = Object.values(articlesMap);
    return articlesMap.valueSeq().toArray();
  });

export const filterArticles = createSelector(
  dateRangeSelector,
  selectedSelector,
  arrayOfArticles,
  (dateRange, selected, articles) => {

    if(!selected && !dateRange) {
      return articles;
    }

    let newArticles;

    if(selected && selected.value) {
      newArticles = articles.filter((article) => {
        return article.id === selected.value
      })
    } else {
      newArticles = articles.slice();
    }
    
    if(dateRange) {
      newArticles = newArticles.filter((article) => {
        //тут нужно вычленить дату у каждой статьи
        let date = Date.parse(article.date);

        //а потом по ней сравнить попадает ли она в диапазон
        if(dateRange.from && +date < +dateRange.from) {
          return false;
        }

        if(dateRange.to && +date > +dateRange.to) {
          return false;
        }

        return true;
      })
    }


    return newArticles;

})


export const createCommentsLoadingSelector = () =>
  createSelector(articlesMapSelector, articleIdSelector, (articles, articleId) => {
    return articles.getIn([articleId, "commentsLoading"]);
  })
  
export const createCommentsLoadedSelector = () =>
  createSelector(articlesMapSelector, articleIdSelector, (articles, articleId) => {
    return articles.getIn([articleId, "commentsLoaded"]);
  })

export const createCommentSelector = () =>
  createSelector(commentsMapSelector, idSelector, (comments, id) => {
    console.log('---', 'comment selector', id)
    return comments.getIn([id]);
  })

export const createArticleSelector = () =>
  createSelector(articlesMapSelector, idSelector, (articles, id) => {
    console.log('---', 'comment selector', id)
    return articles.getIn([id]);
  })