import {createSelector} from 'reselect';


export const filtersSelector = state => state.filters;
export const dateRangeSelector = state => state.filters.dateRange;
export const selectedSelector = state => state.filters.selected;
export const articlesSelector = state => state.articles;
export const counterSelector = state => state.counter;


export const filterArticles = createSelector(
  dateRangeSelector,
  selectedSelector,
  articlesSelector,
  (dateRange, selected, articles) => {

    console.log(selected, dateRange);

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
        let date2 = parseDate(article.date); //Объект даты
        console.log(date);
        console.log(date2);
        

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


function parseDate(date) {
  const result = date.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)

  return new Date(+result[1], +result[2]-1, +result[3]);
}