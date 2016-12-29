// @flow

import type { Action } from '../../flowTypes'

import { List, Record } from 'immutable'
import {
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  LOAD_ITEMS_SUCCESS,
  UNLOAD_ITEMS_SUCCESS
} from './action-types'


const ItemsState = Record({
  items: new List(),
  lastItemDeleted: null
})

export function itemsReducer(state: ItemsState = new ItemsState(), {type, payload}: Action): ItemsState {
  switch (type) {
    case CREATE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.unshift(payload),
        lastItemDeleted: null
      })

    case UPDATE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.map((item: Item): Item => {
          return item.id === payload.id ? payload : item
        }),
        lastItemDeleted: null
      })

    case DELETE_ITEM_SUCCESS:
      return state.merge({
        items: state.items.filter((item: Item): boolean => item.id !== payload.id),
        lastItemDeleted: state.items.find((item: Item): boolean => item.id === payload.id)
      })

    case LOAD_ITEMS_SUCCESS:
      return state.merge({
        items: payload,
        lastItemDeleted: null
      })

    case UNLOAD_ITEMS_SUCCESS:
      return state.merge({
        items: new List(),
        lastItemDeleted: null
      })

    default:
      return state
  }
}
