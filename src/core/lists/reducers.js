import { List, Record } from 'immutable'
import {
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  LOAD_LISTS_SUCCESS,
  UNLOAD_LISTS_SUCCESS
} from './action-types'


const ListsState = new Record({
  lists: new List()
})

export function listsReducer(state: State = new ListsState(), {type, payload}: {}): State {
  switch (type) {
    case CREATE_LIST_SUCCESS:
      return state.merge({
        lists: state.lists.unshift(payload)
      })

    case UPDATE_LIST_SUCCESS:
      return state.merge({
        lists: state.lists.map((itemList: ItemList): ItemList => {
          return itemList.id === payload.id ? payload : itemList
        })
      })

    case DELETE_LIST_SUCCESS:
      return state.merge({
        lists: state.lists.filter((itemList: ItemList): boolean => itemList.id !== payload.id)
      })

    case LOAD_LISTS_SUCCESS:
      return state.merge({
        lists: payload
      })

    case UNLOAD_LISTS_SUCCESS:
      return state.merge({
        lists: new List()
      })

    default:
      return state
  }
}
