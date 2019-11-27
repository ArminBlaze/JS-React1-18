import {createSelector} from 'reselect';


export const filtersSelector = state => state.filters;
export const dateRangeSelector = state => state.filters.dateRange;
export const selectedSelector = state => state.filters.selected;
export const articlesStateSelector = state => state.articles;
export const articlesMapSelector = state => state.articles.data;
export const counterSelector = state => state.counter;
export const commentsSelector = state => state.comments;
export const idSelector = (_, props) => props.id;
export const articlesLoadingSelector = state => state.articles.loading;

export const idsSelector = (_, props) => {
  console.log(props);
  
  return props.comments;
}


export const arrayOfArticles = createSelector(
  articlesMapSelector,
  (articlesObj) => {
    // return articlesArr = Object.values(articlesObj);
    return articlesObj.valueSeq().toArray();
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

//на входе 1 id > получаем один комментарий
export const createCommentSelector = () =>
  createSelector(commentsSelector, idSelector, (comments, id) => {
    console.log('---', 'comment selector', id)
    return comments.get(id);
  })

//на входе массив id > получаем массив комментариев по этим id
// export const createCommentsSelector = () =>
//   createSelector(commentsSelector, idsSelector, (comments, ids) => {
//     console.log('---', 'comment selector', ids)

//     return ids.map((id) => {
//       return comments[id]
//     })
//   })