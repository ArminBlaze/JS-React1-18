import {Map} from 'immutable';

//Преобразуем массив статей в Map
//А каждую статью либо в Record, либо оставляем без изменений JS-объектом
export function arrToMap(arr, dataModel) {
  return arr.reduce(
    (acc, item) => {
      return acc.set(
        item.id,
        dataModel ? new dataModel(item) : item
      )
    },
    new Map({})
  )
}
