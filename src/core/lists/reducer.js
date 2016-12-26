// @flow

import type { Action } from '../../flowTypes'

import { List, Record } from 'immutable'
import {
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  LOAD_LISTS_SUCCESS,
  UNLOAD_LISTS_SUCCESS,
  SELECT_LIST_SUCCESS,
  UNSELECT_LIST_SUCCESS
} from './action-types'


const ListsState = Record({
  lists: new List(),
  selectedList: null
})

export function listsReducer(state: ListsState = new ListsState(), {type, payload}: Action): ListsState {
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

    case SELECT_LIST_SUCCESS:
      return state.merge({
        selectedList: state.lists.find((itemList: ItemList): boolean => itemList.id === payload)
      })

    case UNSELECT_LIST_SUCCESS:
      return state.merge({
        selectedList: null
      })

    default:
      return state
  }
}
