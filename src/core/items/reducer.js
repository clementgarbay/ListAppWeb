// @flow

import type { Item } from '../models/item'
import type { Action } from '../../flowTypes'

import { List, Record } from 'immutable'
import {
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  LOAD_ITEMS_SUCCESS,
  UNLOAD_ITEMS_SUCCESS
} from './action-types'


export const ItemsState = Record({
  items: new List(),
  lastItemDeleted: null
})

export function itemsReducer(state: ItemsState = new ItemsState(), {type, payload}: Action): ItemsState {
  switch (type) {
    case CREATE_ITEM_SUCCESS:
      return state.merge({
        items: sortItems(state.items.unshift(payload)),
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
        items: sortItems(payload),
        lastItemDeleted: null
      })

    case UNLOAD_ITEMS_SUCCESS:
      return new ItemsState()

    default:
      return state
  }
}

function sortItems(items: Array<Item>): Array<Item> {
  return items.sort((i1: Item, i2: Item): number => new Date(i1.creationDate) - new Date(i2.creationDate))
}
