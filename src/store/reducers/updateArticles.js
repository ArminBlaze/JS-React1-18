import { DELETE_ARTICLE } from 'constants/index.js'
import { SELECT_ARTICLE } from 'constants/index.js'
import defaultArticles from 'fixtures.js'

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return {
      data: defaultArticles,
      filteredData: defaultArticles,
      filters: {
        selected: '',
        date: '',
      }
    }
  }

  const localState = state.articles;
  const oldData = localState.data;
  const oldFilters = localState.filters;
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE: {
      return {
        ...localState,
        data: oldData.filter((article) => article.id !== payload.id)
      }
    }

    case SELECT_ARTICLE: {
      const newFilters = generateFilters(oldFilters, payload.id)

      return {
        ...localState,
        filters: newFilters,
        filteredData: filterArticles(oldData, newFilters)
      }
    }
    
    default: 
      return oldData;
  }
}

function generateFilters(oldFilters, selectedId, date) {
  return {
    date: (date) ? date : oldFilters.date,
    selected: (selectedId) ? selectedId : oldFilters.selected
  }
}

// universalArticleUpdate(state, )
function filterArticles(data, filters) {
  const {selected} = filters;
  let newData = data.filter((article) => article.id === selected)

  return newData;
}