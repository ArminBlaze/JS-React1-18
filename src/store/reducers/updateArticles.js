import { DELETE_ARTICLE } from 'constants/index.js'
import { SELECT_ARTICLE } from 'constants/index.js'
import { SELECT_DATE } from 'constants/index.js'
import defaultArticles from 'fixtures.js'

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return {
      data: defaultArticles,
      filters: {
        selected: '',
        dateRange: null,
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
      }
    }

    case SELECT_DATE: {
      const newFilters = generateFilters(oldFilters, undefined, payload)

      return {
        ...localState,
        filters: newFilters,
      }
    }
    
    default: 
      return oldData;
  }
}

function generateFilters(oldFilters, selectedId, range) {
  return {
    dateRange: (range !== undefined) ? transformDate(range) : oldFilters.dateRange,

    selected: (selectedId !== undefined) ? selectedId : oldFilters.selected
  }
}

//дата с библиотеки DayPicker приходит почему-то с временем 12дня. Установим время на 00.00, чтобы дальше время было легче обрабатывать.
function transformDate(range) {
  const from = range.from;
  const to = range.to;

  const newFrom = from && new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const newTo = to && new Date(to.getFullYear(), to.getMonth(), to.getDate())

  return {
    from: newFrom,
    to: newTo,
  }
}