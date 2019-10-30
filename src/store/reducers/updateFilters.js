import { SELECT_ARTICLE } from 'constants/index.js'
import { SELECT_DATE } from 'constants/index.js'
import { DELETE_ARTICLE } from 'constants/index.js'

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return {
      selected: null,
      dateRange: {
        from: undefined,
        to: undefined,
      },
    }
  }

  const oldFilters = state.filters;
  const { type, payload } = action;

  switch (type) {

    case SELECT_ARTICLE: {
      const newSelected = generateSelected(oldFilters, payload)

      return {
        ...oldFilters,
        selected: newSelected,
      }
    }

    case SELECT_DATE: {
      const newDateRange = generateDate(oldFilters, payload)

      return {
        ...oldFilters,
        dateRange: newDateRange,
      }
    }

    case DELETE_ARTICLE: {
      return {
        ...oldFilters,
        selected: (payload.id === oldFilters.selected.value) ? null : oldFilters.selected,
      }
    }
    
    default: 
      return oldFilters;
  }
}

function generateSelected(oldFilters, selected) {
  return (selected !== undefined) ? selected : oldFilters.selected
}

function generateDate(oldFilters, range) {
  return (range !== undefined) ? transformDate(range) : oldFilters.dateRange
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