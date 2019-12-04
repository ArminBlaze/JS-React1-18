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

// export const idsSelector = (_, props) => {
//   console.log(props);
  
//   return props.comments;
// }

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

//Для каждой статьи по айди получает Record с комментариями и доп флагами.
// В самом Record хранятся loading, loaded, error.
// А комменты будут храниться в Record.data
export const createCommentByIdSelector = () =>
  createSelector(commentsMapSelector, articleIdSelector, (comments, articleId) => {
    console.log('---', 'commentsById selector', articleId)
    return comments.get(articleId);
  })

// export const createCommentsLoadingSelector = () =>
//   createSelector(commentsSelector, articleIdSelector, (comments, articleId) => {
//     console.log('---', 'commentsById selector', articleId)
//     return comments.getIn(articleId).loading;
//   })

//на входе 1 id > получаем один комментарий
export const createCommentSelector = () =>
  createSelector(commentsMapSelector, idSelector, articleIdSelector, (comments, id, articleId) => {
    console.log('---', 'comment selector', id, articleId)
    return comments.getIn([articleId, 'data', id]);
  })

//на входе массив id > получаем массив комментариев по этим id
// export const createCommentsSelector = () =>
//   createSelector(commentsSelector, articleIdSelector, (comments, articleId) => {
//     console.log('---', 'comment selector', articleId)

//     return comments.get([articleId, 'data'])
    
//   })