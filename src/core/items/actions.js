// @flow

import type { Action } from '../../flowTypes'

import { Item } from '../models/item'
import {
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  LOAD_ITEMS_SUCCESS,
  UNLOAD_ITEMS_SUCCESS
} from './action-types'


export function createItemSuccess(item: Item): Action {
  return {
    type: CREATE_ITEM_SUCCESS,
    payload: item
  }
}

export function createItemError(error: *): Action {
  return {
    type: CREATE_ITEM_ERROR,
    payload: error
  }
}

export function updateItemSuccess(item: Item): Action {
  return {
    type: UPDATE_ITEM_SUCCESS,
    payload: item
  }
}

export function updateItemError(error: *): Action {
  return {
    type: UPDATE_ITEM_ERROR,
    payload: error
  }
}

export function deleteItemSuccess(item: Item): Action {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload: item
  }
}

export function deleteItemError(error: *): Action {
  return {
    type: DELETE_ITEM_ERROR,
    payload: error
  }
}

export function loadItemsSuccess(items: List<Item>): Action {
  return {
    type: LOAD_ITEMS_SUCCESS,
    payload: items
  }
}

export function unloadItemsSuccess(): Action {
  return {
    type: UNLOAD_ITEMS_SUCCESS
  }
}
