import { DELETE_ARTICLE } from 'constants/index.js'
import { SELECT_ARTICLE } from 'constants/index.js'
import { SELECT_DATE } from 'constants/index.js'
import defaultArticles from 'fixtures.js'

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return {
      data: defaultArticles,
      filteredData: defaultArticles,
      filters: {
        selected: '',
        dateRange: '',
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
      const newFilters = generateFilters(oldFilters, payload)

      return {
        ...localState,
        filters: newFilters,
        filteredData: filterArticles(oldData, newFilters)
      }
    }

    case SELECT_DATE: {
      const newFilters = generateFilters(oldFilters, null, payload)

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

function generateFilters(oldFilters, selectedId, range) {
  return {
    dateRange: (range) ? range : oldFilters.dateRange,
    selected: (selectedId) ? selectedId : oldFilters.selected
  }
}

// universalArticleUpdate(state, )
function filterArticles(data, filters) {

  const {selected} = filters;

  if(!selected && !data) {
    return data;
  }

  let newData = data.filter((article) => article.id === selected)

  return newData;
}