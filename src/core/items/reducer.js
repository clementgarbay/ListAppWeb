import { List, Record } from 'immutable'
import {
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS
} from './action-types'


export const ItemsState = new Record({
  items: new List()
});

export function itemsReducer(state = new ItemsState(), {type, payload}) {
  switch (type) {
    case CREATE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.unshift(payload)
      })

    case UPDATE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.map(item => {
          return item.id === payload.id ? payload : item
        })
      })

    case DELETE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.filter(item => item.id !== payload.id)
      })

    default:
      return state
  }
}
