import { SELECT_ARTICLE } from 'constants/index.js'
import { SELECT_DATE } from 'constants/index.js'
import { DELETE_ARTICLE } from 'constants/index.js'

export default (state, action) => {
  if (state === undefined) {
    // return defaultArticles;
    return {
      selected: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
    }
  }

  const oldFiltersState = state;
  const oldFilters = oldFiltersState;
  const { type, payload } = action;

  switch (type) {

    case SELECT_ARTICLE: {
      const newSelected = generateSelected(oldFilters, payload)

      return {
        ...oldFiltersState,
        selected: newSelected,
      }
    }

    case SELECT_DATE: {
      const newDateRange = generateDate(oldFilters, payload)

      return {
        ...oldFiltersState,
        dateRange: newDateRange,
      }
    }

    case DELETE_ARTICLE: {
      return {
        ...oldFiltersState,
        selected: (oldFilters.selected && payload.id === oldFilters.selected.value) ? null : oldFilters.selected,
      }
    }
    
    default: 
      return oldFiltersState;
  }
}

function generateSelected(oldFilters, selected) {
  return (selected !== undefined) ? selected : oldFilters.selected
}

function generateDate(oldFilters, range) {
  return (range !== undefined) ? transformDate(range) : oldFilters.dateRange
}

//дата с библиотеки DayPicker приходит почему-то с временем 12дня.
//Установим время from на 00.00, чтобы дальше время было легче обрабатывать.
//А время to на 23.59.59.
function transformDate(range) {
  const from = range.from;
  const to = range.to;

  const newFrom = from && new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const newTo = to && new Date(to.getFullYear(), to.getMonth(), to.getDate()+1)
  if(newTo) newTo.setSeconds(-1)
 

  return {
    from: newFrom,
    to: newTo,
  }
}